import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ODDS = [
    { id: 1, color: '#E5243B' },
    { id: 2, color: '#DDA63A' },
    { id: 3, color: '#4C9F38' },
    { id: 4, color: '#C5192D' },
    { id: 5, color: '#FF3A21' },
    { id: 6, color: '#26BDE2' },
    { id: 7, color: '#FCC30B' },
    { id: 8, color: '#A21942' },
    { id: 9, color: '#FD6925' },
    { id: 10, color: '#DD1367' },
    { id: 11, color: '#FD9D24' },
    { id: 12, color: '#BF8B2E' },
    { id: 13, color: '#3F7E44' },
    { id: 14, color: '#0A97D9' },
    { id: 15, color: '#56C02B' },
    { id: 16, color: '#00689D' },
    { id: 17, color: '#19486A' }
];

const ODDStrip: React.FC = () => {
    const { t } = useTranslation();
    const [hoveredOdd, setHoveredOdd] = useState<number | null>(null);

    return (
        <div style={{ marginTop: '80px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {/* TOOLTIP BUBBLE */}
            <AnimatePresence>
                {hoveredOdd !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '-70px', // Position above the strip
                            background: 'white',
                            color: '#14213d', // Deep Navy Text
                            padding: '12px 20px',
                            borderRadius: '8px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            zIndex: 20,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            border: `2px solid ${ODDS[hoveredOdd - 1].color}`
                        }}
                    >
                        <div style={{
                            width: '30px',
                            height: '30px',
                            background: ODDS[hoveredOdd - 1].color,
                            color: 'white',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}>
                            {hoveredOdd}
                        </div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem' }}>
                            {t(`sdg_${hoveredOdd}`)}
                        </span>
                        {/* Little triangle arrow at bottom */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: '12px',
                            height: '12px',
                            background: 'white',
                            borderBottom: `2px solid ${ODDS[hoveredOdd - 1].color}`,
                            borderRight: `2px solid ${ODDS[hoveredOdd - 1].color}`,
                            zIndex: -1
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <p style={{
                color: '#14213d', // Dark Navy for visibility on light background
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '16px',
                opacity: 0.9, // Increased opacity slightly for better visibility
                fontWeight: 600
            }}>
                {t('sdg_title')}
            </p>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
                {ODDS.map((odd) => (
                    <motion.div
                        key={odd.id}
                        onMouseEnter={() => setHoveredOdd(odd.id)}
                        onMouseLeave={() => setHoveredOdd(null)}
                        whileHover={{ scale: 1.2, zIndex: 10, y: -5 }}
                        style={{
                            width: '32px',
                            height: '32px',
                            background: odd.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            borderRadius: '2px',
                            cursor: 'default',
                            transition: 'background 0.2s'
                        }}
                    >
                        {odd.id}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ODDStrip;
