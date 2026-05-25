import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock } from 'lucide-react';

const CITIES = [
    { name: 'Marseille', tz: 'Europe/Paris' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Beijing', tz: 'Asia/Shanghai' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Nairobi', tz: 'Africa/Nairobi' },
    { name: 'Rio de Janeiro', tz: 'America/Sao_Paulo' },
];

const TimezoneClock: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState(CITIES[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: selectedCity.tz,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setTime(timeString);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [selectedCity]);

    return (
        <div className="absolute z-[100] left-4 top-[90px] sm:left-5 sm:top-5">
            <div style={{ position: 'relative' }}>
                {/* Clock Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #094067',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: '#094067',
                        fontFamily: 'var(--font-mono)',
                        minWidth: '200px'
                    }}
                >
                    <Clock size={16} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
                            {selectedCity.name}
                        </span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 400, lineHeight: 1 }}>
                            {time}
                        </span>
                    </div>
                    <ChevronDown size={14} style={{ marginLeft: 'auto', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                marginTop: '8px',
                                width: '100%',
                                background: 'white',
                                borderRadius: '4px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {CITIES.map((city) => (
                                <button
                                    key={city.name}
                                    onClick={() => {
                                        setSelectedCity(city);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        padding: '10px 16px',
                                        textAlign: 'left',
                                        background: selectedCity.name === city.name ? '#f0f9ff' : 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid #f0f0f0',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        color: '#094067',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {city.name}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TimezoneClock;
