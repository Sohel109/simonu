import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FloatingMenu: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const navItems = [
        { path: '/', label: t('welcome') }, // Key from translations
        { path: '/association', label: t('association') },
        { path: '/equipe', label: t('team') },
        { path: '/simulations', label: t('simulations') },
        { path: '/contact', label: t('contact') },
    ];

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9990,
            width: 'auto',
        }}>
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 1.5 // Delay after entrance animation
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px', // Added gap per user request
                    padding: '0', // Minimal padding
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '0px', // Square
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
            >
                {/* Brand Mark Square */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        width: '44px',
                        height: '44px',
                        background: '#094067',
                        borderRadius: '0px', // Square
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>S</span>
                </motion.div>

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isHovered = hoveredPath === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{
                                position: 'relative',
                                padding: '12px 24px',
                                borderRadius: '0px', // Square
                                textDecoration: 'none',
                                color: isActive ? '#fff' : '#1a1a1a',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                textTransform: 'uppercase', // More "brutalist"/square vibe
                                letterSpacing: '1px',
                                transition: 'color 0.2s ease',
                                whiteSpace: 'nowrap',
                                fontFamily: "'Inter', sans-serif",
                                overflow: 'hidden'
                            }}
                        >
                            {/* Active Background Square */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: '#094067',
                                        borderRadius: '0px', // Square
                                        zIndex: -1
                                    }}
                                    transition={{ type: "tween", duration: 0.3 }} // Sharp transition
                                />
                            )}

                            {/* Hover Background Square */}
                            {isHovered && !isActive && (
                                <motion.div
                                    layoutId="hoverTab"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.05)',
                                        borderRadius: '0px', // Square
                                        zIndex: -1
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            <span style={{ position: 'relative', zIndex: 1 }}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
};

export default FloatingMenu;
