import React, { useEffect, useRef, useState } from 'react';

import Globe from 'react-globe.gl';

// Sample data for "Live" points
const N_ARCS = 20;
const ARC_REL_LEN = 0.4; // relative to whole arc
const FLIGHT_TIME = 2000;
const RINGS_MAX_R = 5; // deg
const RING_PROPAGATION_SPEED = 5; // deg/sec

// Capital cities or key locations
const PLACES = [
    { city: 'New York', lat: 40.7128, lng: -74.0060, type: 'ONU' },
    { city: 'Geneva', lat: 46.2044, lng: 6.1432, type: 'Diplo' },
    { city: 'Nairobi', lat: -1.2921, lng: 36.8219, type: 'ONU' },
    { city: 'Vienna', lat: 48.2082, lng: 16.3738, type: 'ONU' },
    { city: 'The Hague', lat: 52.0705, lng: 4.3007, type: 'Justice' },
    { city: 'Kinshasa', lat: -4.4419, lng: 15.2663, type: 'Conflict' },
    { city: 'Gaza', lat: 31.5, lng: 34.4667, type: 'Conflict' },
    { city: 'Kyiv', lat: 50.4501, lng: 30.5234, type: 'Conflict' },
];

const WorldDashboard: React.FC = () => {
    const globeEl = useRef<any>(null);
    const [pointsData, setPointsData] = useState<any[]>([]);
    const [arcsData, setArcsData] = useState<any[]>([]);
    const [ringsData, setRingsData] = useState<any[]>([]);

    useEffect(() => {
        // Initialize points
        setPointsData(PLACES);

        // Simulate arcs (diplomatic cables/flights)
        const arcs = Array.from({ length: N_ARCS }).map(() => {
            const start = PLACES[Math.floor(Math.random() * PLACES.length)];
            const end = PLACES[Math.floor(Math.random() * PLACES.length)];
            return {
                startLat: start.lat,
                startLng: start.lng,
                endLat: end.lat,
                endLng: end.lng,
                color: ['#009EDB', '#ffffff'] // UN Blue to White gradient
            };
        });
        setArcsData(arcs);

        // Simulate rings (active events)
        const rings = PLACES.filter(p => p.type === 'Conflict' || p.type === 'Justice').map(p => ({
            lat: p.lat,
            lng: p.lng,
            color: p.type === 'Conflict' ? 'rgba(255, 69, 0, 0.8)' : 'rgba(0, 158, 219, 0.8)'
        }));
        setRingsData(rings);

        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
            globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '85vh', background: '#0b1121' }}>
            {/* Map Container */}
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                // Points
                pointsData={pointsData}
                pointColor={() => '#009EDB'}
                pointAltitude={0.02}
                pointRadius={0.5}

                // Arcs
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={ARC_REL_LEN}
                arcDashGap={2}
                arcDashInitialGap={() => Math.random() * 2}
                arcDashAnimateTime={FLIGHT_TIME}
                arcStroke={0.5}

                // Rings
                ringsData={ringsData}
                ringColor="color"
                ringMaxRadius={RINGS_MAX_R}
                ringPropagationSpeed={RING_PROPAGATION_SPEED}
                ringRepeatPeriod={FLIGHT_TIME * 0.5}

                width={window.innerWidth}
                height={window.innerHeight * 0.85}
            />

            {/* Overlay UI */}
            <div style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                pointerEvents: 'none'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '3rem',
                    letterSpacing: '-1px',
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    marginBottom: '8px'
                }}>
                    Global Monitor
                </h1>
                <p style={{
                    color: '#009EDB',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    background: 'rgba(0, 158, 219, 0.1)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}>
                    ● LIVE SYSTEM ACTIVE
                </p>
            </div>

            {/* Overlay Statistics / Filters (Visual only per request) */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                display: 'flex',
                gap: '12px',
                pointerEvents: 'auto'
            }}>
                {['PEACE & SECURITY', 'HUMAN RIGHTS', 'DEVELOPMENT', 'INTL LAW'].map(filter => (
                    <button key={filter} style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        padding: '10px 20px',
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        backdropFilter: 'blur(4px)',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                        className="hover:bg-white/10"
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WorldDashboard;
