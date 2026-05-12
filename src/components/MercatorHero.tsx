import React from 'react';
import { motion } from 'framer-motion';

// --- CONSTANTS ---
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

// Coordinates (Approx Lat, Lng)
const MARSEILLE = { lat: 43.3, lng: -25.0 }; // Shifted REALLY far left
const CAPITALS = [
    { name: "Paris", lat: 58.0, lng: -28.0 }, // Shifted UP visually (exaggerated north)
    { name: "New York", lat: 48.0, lng: -150.0 }, // Shifted UP and RIGHT to separate from Washington
    { name: "Washington", lat: 38.9, lng: -175.0 }, // Shifted MAX left near edge
    { name: "Geneva", lat: 46.2, lng: 6.1 },
    { name: "Nairobi", lat: -1.3, lng: 36.8 },
    { name: "Beijing", lat: 39.9, lng: 116.4 },
    { name: "Brasilia", lat: -15.8, lng: -47.9 },
    { name: "Canberra", lat: -35.3, lng: 149.1 },
    { name: "New Delhi", lat: 28.6, lng: 77.2 },
    { name: "Cairo", lat: 30.0, lng: 31.2 },
    { name: "Tokyo", lat: 35.7, lng: 139.7 },
];

/**
 * Simple Mercator projection conversion
 */
const project = (lat: number, lng: number) => {
    // Equirectangular projection (Plate Carrée)
    // Linear mapping for x and y
    const x = (lng + 180) * (MAP_WIDTH / 360);
    const y = (90 - lat) * (MAP_HEIGHT / 180);
    return { x, y };
};

const MercatorHero: React.FC = () => {
    const marseillePos = project(MARSEILLE.lat, MARSEILLE.lng);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            background: '#F8F9FA', // Light background as requested/inferred from "Dark Blue on White"
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Map Frame */}
            <div style={{
                border: '4px solid #14213d',
                width: '90%',
                maxWidth: '1200px',
                height: '60%',
                position: 'relative',
                background: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
                <svg
                    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 1
                    }}
                >
                    {/* 
                         Only Capitals & Connections (Continents Removed)
                    */}

                    {/* Marseille Point & Label */}
                    <g>
                        <circle cx={marseillePos.x} cy={marseillePos.y} r={4} fill="#D4AF37" />
                        <circle cx={marseillePos.x} cy={marseillePos.y} r={8} fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5">
                            <animate attributeName="r" from="4" to="20" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <motion.text
                            x={marseillePos.x}
                            y={marseillePos.y + 15}
                            textAnchor="middle"
                            style={{
                                fill: '#D4AF37', // Gold for the HQ
                                fontSize: '10px',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            MARSEILLE
                        </motion.text>
                    </g>

                    {/* Connections to Capitals */}
                    {CAPITALS.map((cap, i) => {
                        const pos = project(cap.lat, cap.lng);
                        const midX = (marseillePos.x + pos.x) / 2;
                        const midY = (marseillePos.y + pos.y) / 2 - 50; // Curve up

                        return (
                            <g key={i}>
                                {/* Destination Point */}
                                <motion.circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={3}
                                    fill="white" // White for others to distinguish
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                                />

                                {/* Label */}
                                <motion.text
                                    x={pos.x}
                                    y={pos.y + 12}
                                    textAnchor="middle"
                                    style={{
                                        fill: '#14213d',
                                        fontSize: '10px',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 + i * 0.2 }}
                                >
                                    {cap.name}
                                </motion.text>

                                {/* Animated Line */}
                                <motion.path
                                    d={`M${marseillePos.x},${marseillePos.y} Q${midX},${midY} ${pos.x},${pos.y}`}
                                    fill="none"
                                    stroke="#D4AF37"
                                    strokeWidth="2"
                                    // strokeDasharray removed for solid beam
                                    initial={{ pathLength: 0, opacity: 0.6 }}
                                    animate={{
                                        pathLength: [0, 1],
                                        opacity: 0.6
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "reverse", // Ping-Pong effect: M->C then C->M
                                        repeatDelay: 0.5
                                    }}
                                />
                            </g>
                        );
                    })}

                </svg>
                {/* Mercator Label */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '12px',
                    color: '#14213d',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    SIMONU MARSEILLE
                </div>
            </div>
        </div>
    );
};

export default MercatorHero;
