import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import { useResizeDetector } from 'react-resize-detector';
import * as THREE from 'three';

interface City {
    name: string;
    lat: number;
    lng: number;
}

// --- CONSTANTS ---
const MARSEILLE: City = { name: "Marseille", lat: 43.2965, lng: 5.3698 }; // Real coordinates

// Real coordinates for capitals
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
    const { width, height, ref } = useResizeDetector();
    const globeEl = useRef<any>(null);
    const [countries, setCountries] = useState({ features: [] });
    const [arcs, setArcs] = useState<any[]>([]);

    // 1. Fetch Country Polygons (GeoJSON)
    useEffect(() => {
        // Use a reliable GeoJSON source directly
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => {
                setCountries(data);
            });
    }, []);

    // 2. Prepare Arcs (Marseille <-> Capitals)
    useEffect(() => {
        // We want a "continuous loop" effect.
        // react-globe.gl arcs animate one way. 
        // To simulate "M->C then C->M", we can visually trick it.
        // Or just let it flow M->C repeatedly which looks like "broadcasting".
        // The user said "renvoie au point de départ". 
        // We can create TWO arcs per connection: one M->C (gold), one C->M (gold).
        // And stagger their animation times?
        // Or just use `arcDashAnimateTime` and loop it.

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
            // Auto-rotate slowly
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;

            // Disable zoom to allow scrolling on the page
            globeEl.current.controls().enableZoom = false;

            // Set initial POV to Europe/Atlantic
            globeEl.current.pointOfView({ lat: 30, lng: -10, altitude: 2.0 });
        }
    }, [globeEl.current]);

    return (
        <div ref={ref} style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, background: '#F8F9FA', pointerEvents: (width && width < 768) ? 'none' : 'auto' }}>
            {width && height && (
                <Globe
                    ref={globeEl}
                    width={width}
                    height={height}
                    backgroundColor="#F8F9FA" // Match page background

                    // Globe Appearance
                    showGlobe={true}
                    globeImageUrl={null} // No texture, use material color
                    globeMaterial={new THREE.MeshPhongMaterial({ color: '#FFFFFF', shininess: 0 })} // Pure Matte White Sphere
                    showAtmosphere={false} // No halo

                    // Polygons (Countries)
                    polygonsData={countries.features}
                    polygonCapColor={() => '#FFFFFF'} // White Countries
                    polygonSideColor={() => 'transparent'}
                    polygonStrokeColor={() => '#D4AF37'} // Gold Contours
                    polygonAltitude={0.01} // Slight elevation to prevent z-fighting with globe surface

                    // Arcs
                    arcsData={arcs}
                    arcColor={() => '#D4AF37'} // Gold
                    arcDashLength={0.9} // Continuous looking lines (long segments)
                    arcDashGap={0.1} // Short gaps
                    arcDashAnimateTime={12000} // Extremely slow speed
                    arcStroke={0.5} // Thin Minimalist Lines

                    // Labels (Capitals + Marseille)
                    labelsData={[...CAPITALS, MARSEILLE]}
                    labelLat={(d: any) => d.lat}
                    labelLng={(d: any) => d.lng}
                    labelText={(d: any) => d.name}
                    labelSize={(d: any) => d.name === "Marseille" ? 1.0 : 0.5} // Smaller minimalist labels
                    labelDotRadius={(d: any) => d.name === "Marseille" ? 0.5 : 0.3} // Smaller dots
                    labelColor={(d: any) => d.name === "Marseille" ? '#D4AF37' : '#14213d'}
                    labelResolution={2}

                    // Rings (Pulse at Marseille)
                    ringsData={[MARSEILLE]}
                    ringColor={() => '#D4AF37'}
                    ringMaxRadius={3} // Smaller pulse
                    ringPropagationSpeed={2}
                    ringRepeatPeriod={1000}
                />
            )}
            {/* Title Overlay Removed */}
        </div>
    );
};

export default GlobeHero;
