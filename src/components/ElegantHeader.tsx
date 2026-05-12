import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const ElegantHeader: React.FC = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: t('welcome') },
        { path: '/actualites', label: t('news') },
        { path: '/association', label: t('association') },
        { path: '/equipe', label: t('team') },
        { path: '/simulations', label: t('simulations') },
    ];

    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: scrolled ? '15px' : '0',
                transition: 'padding-top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{
                    width: scrolled ? 'auto' : '100%',
                    padding: scrolled ? '10px 25px' : '24px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: scrolled ? '20px' : '0',
                    background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(15px)' : 'none',
                    borderRadius: scrolled ? '30px' : '0',
                    boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                    border: scrolled ? '1px solid rgba(20, 33, 61, 0.1)' : '1px solid transparent',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: scrolled ? 'auto' : 'none',
                }}>
                    {/* Left Spacer */}
                    <div style={{ 
                        width: scrolled ? '0px' : '80px', 
                        overflow: 'hidden',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: 'auto' 
                    }}>
                    </div>

                    {/* CENTER LOGO */}
                    <Link to="/" style={{
                        textDecoration: 'none',
                        pointerEvents: 'auto',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                    }}>
                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: scrolled ? '1rem' : '1.2rem',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            color: '#094067',
                            margin: 0,
                            textTransform: 'uppercase',
                            transition: 'font-size 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                            SIMONU MARSEILLE
                        </h1>
                    </Link>

                    {/* RIGHT MENU TRIGGER */}
                    <div style={{ 
                        width: scrolled ? 'auto' : '80px', 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        pointerEvents: 'auto',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                color: '#094067',
                                textTransform: 'uppercase',
                                padding: scrolled ? '5px' : '0',
                            }}
                        >
                            <span style={{ display: scrolled ? 'none' : 'block' }}>Menu</span>
                            <Menu size={scrolled ? 20 : 24} style={{ transition: 'all 0.4s ease' }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* OVERLAY MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0, // "Droit Haut Fixe" - Usually implies a drawer or overlay from right
                            // User said "menu déroulant propre épuré droit haut fixe"
                            // Could mean a dropdown right under the button, or a full side panel.
                            // "Dropdown" usually means small. "Menu déroulant"
                            // Let's make it a sophisticated right-side panel or floating card.
                            width: '100%',
                            height: '100vh',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '40px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#094067'
                            }}
                        >
                            <X size={32} />
                        </button>

                        {/* Menu Items */}
                        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{
                                            textDecoration: 'none',
                                            fontFamily: 'Playfair Display, serif',
                                            fontSize: '2.5rem',
                                            color: isActive ? '#D4AF37' : '#094067',
                                            position: 'relative',
                                            padding: '0 15px',
                                        }}
                                    >
                                        <motion.span
                                            whileHover={{ x: 10 }}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </Link>
                                );
                            })}

                            <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={{
                                marginTop: '40px',
                                padding: '16px 40px',
                                background: '#094067',
                                color: 'white',
                                textDecoration: 'none',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {t('contact')}
                            </Link>
                        </nav>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ElegantHeader;
