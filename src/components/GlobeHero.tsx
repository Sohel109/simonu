import React, { useEffect, useState, useRef, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { useResizeDetector } from 'react-resize-detector';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { COUNTRY_TRANSLATIONS_FR } from '../data/countryTranslations';

interface City {
    name: string;
    lat: number;
    lng: number;
}

// --- CONSTANTS ---
const MARSEILLE: City = { name: "Marseille", lat: 43.2965, lng: 5.3698 };

const CAPITALS: City[] = [
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "New York", lat: 40.7128, lng: -74.0060 },
    { name: "Washington", lat: 38.9072, lng: -77.0369 },
    { name: "Geneva", lat: 46.2044, lng: 6.1432 },
    { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
    { name: "Beijing", lat: 39.9042, lng: 116.4074 },
    { name: "Brasilia", lat: -15.8267, lng: -47.9218 },
    { name: "Canberra", lat: -35.2809, lng: 149.1300 },
    { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
];

const GlobeHero: React.FC = () => {
    const { i18n } = useTranslation();
    const { width, height, ref } = useResizeDetector();
    const globeEl = useRef<any>(null);
    const [countries, setCountries] = useState({ features: [] });
    const [arcs, setArcs] = useState<any[]>([]);
    const [hoveredCountry, setHoveredCountry] = useState<any>(null);

    // Mobile: whether the globe is in interactive mode
    const isMobile = !!(width && width < 768);
    const [globeInteractive, setGlobeInteractive] = useState(false);

    // 1. Fetch Country Polygons (GeoJSON)
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => {
                setCountries(data);
            });
    }, []);

    // 2. Prepare Arcs (Marseille <-> Capitals)
    useEffect(() => {
        const newArcs = CAPITALS.flatMap(cap => [
            {
                startLat: MARSEILLE.lat,
                startLng: MARSEILLE.lng,
                endLat: cap.lat,
                endLng: cap.lng,
                name: `${MARSEILLE.name} -> ${cap.name}`,
                color: '#D4AF37'
            }
        ]);
        setArcs(newArcs);
    }, []);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;

            // Enable zoom with reasonable limits
            globeEl.current.controls().enableZoom = true;
            globeEl.current.controls().minDistance = 200;  // max zoom-in
            globeEl.current.controls().maxDistance = 600;  // max zoom-out

            // Initial view: slightly more zoomed out
            globeEl.current.pointOfView({ lat: 30, lng: -10, altitude: 2.8 });
        }
    }, [globeEl.current]);

    // When mobile interactive mode changes, pause/resume auto-rotate
    useEffect(() => {
        if (!globeEl.current) return;
        if (isMobile && !globeInteractive) {
            globeEl.current.controls().autoRotate = true;
        }
    }, [globeInteractive, isMobile]);

    const handlePolygonClick = useCallback((polygon: any) => {
        if (!polygon || !polygon.properties) return;
        const props = polygon.properties;
        const name = props.NAME || props.NAME_LONG || props.ADMIN || '';
        const iso2 = (props.ISO_A2 || props.ISO_A2_EH || '').toUpperCase();
        const iso3 = (props.ISO_A3 || props.ADM0_A3 || '').toUpperCase();
        const nameLower = name.toLowerCase();

        const lang = i18n.language === 'en' ? 'en' : 'fr';

        // Intercepter Israël / Palestine / West Bank / Gaza → conflit israélo-palestinien
        if (
            nameLower.includes('israel') ||
            nameLower.includes('palestin') ||
            nameLower.includes('west bank') ||
            nameLower.includes('gaza') ||
            iso2 === 'IL' || iso2 === 'PS' ||
            iso3 === 'ISR' || iso3 === 'PSE' || iso3 === 'WBG'
        ) {
            const wikiSlug = lang === 'fr'
                ? 'Conflit_israélo-palestinien'
                : 'Israeli-Palestinian_conflict';
            window.open(`https://${lang}.wikipedia.org/wiki/${encodeURIComponent(wikiSlug)}`, '_blank');
            return;
        }

        if (name) {
            let targetName = name;
            if (lang === 'fr' && COUNTRY_TRANSLATIONS_FR[name]) {
                targetName = COUNTRY_TRANSLATIONS_FR[name];
            }
            const encoded = encodeURIComponent(targetName.trim().replace(/\s+/g, '_'));
            window.open(`https://${lang}.wikipedia.org/wiki/${encoded}`, '_blank');
        }
    }, [i18n.language]);

    // Effective pointer events: on mobile, only enable when globe mode is active
    const containerPointerEvents = isMobile ? (globeInteractive ? 'auto' : 'none') : 'auto';

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100dvh' } as React.CSSProperties}>
            {/* Globe container */}
            <div
                ref={ref}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#F8F9FA',
                    pointerEvents: containerPointerEvents,
                }}
            >
                {width && height && (
                    <Globe
                        ref={globeEl}
                        width={width}
                        height={height}
                        backgroundColor="#F8F9FA"

                        // Globe Appearance
                        showGlobe={true}
                        globeImageUrl={null}
                        globeMaterial={new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 0 })}
                        showAtmosphere={false}

                        // Polygons (Countries)
                        polygonsData={countries.features}
                        polygonCapColor={(d: any) => d === hoveredCountry ? 'rgba(212, 175, 55, 0.15)' : '#FFFFFF'}
                        polygonSideColor={() => 'transparent'}
                        polygonStrokeColor={() => '#D4AF37'}
                        polygonAltitude={(d: any) => d === hoveredCountry ? 0.02 : 0.01}
                        onPolygonHover={(polygon: any) => {
                            if (ref.current) {
                                (ref.current as HTMLElement).style.cursor = polygon ? 'pointer' : 'default';
                            }
                            setHoveredCountry(polygon);
                        }}
                        onPolygonClick={handlePolygonClick}

                        // Arcs
                        arcsData={arcs}
                        arcColor={() => '#D4AF37'}
                        arcDashLength={0.9}
                        arcDashGap={0.1}
                        arcDashAnimateTime={12000}
                        arcStroke={0.5}

                        // Labels (Capitals + Marseille)
                        labelsData={[...CAPITALS, MARSEILLE]}
                        labelLat={(d: any) => d.lat}
                        labelLng={(d: any) => d.lng}
                        labelText={(d: any) => d.name}
                        labelSize={(d: any) => d.name === "Marseille" ? 1.0 : 0.5}
                        labelDotRadius={(d: any) => d.name === "Marseille" ? 0.5 : 0.3}
                        labelColor={(d: any) => d.name === "Marseille" ? '#D4AF37' : '#14213d'}
                        labelResolution={2}

                        // Rings (Pulse at Marseille)
                        ringsData={[MARSEILLE]}
                        ringColor={() => '#D4AF37'}
                        ringMaxRadius={3}
                        ringPropagationSpeed={2}
                        ringRepeatPeriod={1000}
                    />
                )}
            </div>

            {/* Mobile toggle button — visible only on small screens */}
            {isMobile && (
                <button
                    onClick={() => setGlobeInteractive(prev => !prev)}
                    style={{
                        position: 'absolute',
                        bottom: '24px',
                        right: '20px',
                        zIndex: 999,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '100px',
                        border: `2px solid ${globeInteractive ? '#D4AF37' : '#14213d'}`,
                        background: globeInteractive ? '#14213d' : 'rgba(255,255,255,0.92)',
                        color: globeInteractive ? '#D4AF37' : '#14213d',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(20,33,61,0.18)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.25s ease',
                        WebkitTapHighlightColor: 'transparent',
                        pointerEvents: 'auto',
                    }}
                    aria-label={globeInteractive ? 'Retour au scroll' : 'Explorer le globe'}
                >
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>
                        {globeInteractive ? '📜' : '🌍'}
                    </span>
                    {globeInteractive ? 'Scroll' : 'Explorer'}
                </button>
            )}
        </div>
    );
};

export default GlobeHero;
