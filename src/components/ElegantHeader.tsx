import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const ElegantHeader: React.FC<{ isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }> = ({ isMenuOpen, setIsMenuOpen }) => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer le menu lors d'un changement de route
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/',            label: t('welcome') },
        { path: '/actualites',  label: t('news') },
        { path: '/association', label: t('association') },
        { path: '/equipe',      label: t('team') },
        { path: '/simulations', label: t('simulations') },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
        const gtSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (gtSelect) {
            gtSelect.value = newLang;
            gtSelect.dispatchEvent(new Event('change'));
        }
    };

    const isEn = i18n.language === 'en';

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
                transition: 'padding-top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <div style={{
                    width: scrolled ? 'auto' : '100%',
                    padding: scrolled ? '10px 25px' : '24px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: scrolled ? '20px' : '0',
                    background: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(15px)' : 'none',
                    borderRadius: scrolled ? '30px' : '0',
                    boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
                    border: scrolled ? '1px solid rgba(9, 64, 103, 0.1)' : '1px solid transparent',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: scrolled ? 'auto' : 'none',
                }}>
                    {/* Left Spacer */}
                    <div style={{
                        width: scrolled ? '0px' : '80px',
                        overflow: 'hidden',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: 'auto',
                    }} />

                    {/* CENTER LOGO */}
                    <Link to="/" style={{
                        textDecoration: 'none',
                        pointerEvents: 'auto',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    }}>
                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: scrolled ? '1rem' : '1.2rem',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            color: '#094067',
                            margin: 0,
                            textTransform: 'uppercase',
                            transition: 'font-size 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}>
                            SIMONU MARSEILLE
                        </h1>
                    </Link>

                    {/* RIGHT — Lang toggle + Menu trigger */}
                    <div style={{
                        width: scrolled ? 'auto' : '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        pointerEvents: 'auto',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        {/* FR/EN Toggle — visible dans le header scrollé */}
                        {scrolled && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={toggleLanguage}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0',
                                    background: 'transparent',
                                    border: '1px solid rgba(9,64,103,0.2)',
                                    borderRadius: '16px',
                                    padding: '0',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                <span translate="no" style={{
                                    padding: '5px 10px',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    color: !isEn ? 'white' : '#718096',
                                    background: !isEn ? '#094067' : 'transparent',
                                    transition: 'all 0.2s ease',
                                }}>FR</span>
                                <span translate="no" style={{
                                    padding: '5px 10px',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    color: isEn ? 'white' : '#718096',
                                    background: isEn ? '#094067' : 'transparent',
                                    transition: 'all 0.2s ease',
                                }}>EN</span>
                            </motion.button>
                        )}

                        {/* Menu Burger */}
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
                            <span className="hidden sm:block" style={scrolled ? { display: 'none' } : {}}>Menu</span>
                            <Menu size={scrolled ? 20 : 24} style={{ transition: 'all 0.4s ease' }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── OVERLAY MENU PLEIN ÉCRAN ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0, right: 0,
                            width: '100%',
                            height: '100vh',
                            background: 'rgba(255,255,255,0.97)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                                color: '#094067',
                            }}
                        >
                            <X size={32} />
                        </button>

                        {/* Nav Links */}
                        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px' }}>
                            {navItems.map((item, idx) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.07, duration: 0.4 }}
                                    >
                                        <Link
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
                                    </motion.div>
                                );
                            })}

                            {/* CTA Contact */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: navItems.length * 0.07 + 0.1 }}
                            >
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        marginTop: '20px',
                                        padding: '16px 40px',
                                        background: '#094067',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {t('contact')}
                                </Link>
                            </motion.div>

                            {/* ── TOGGLE FR/EN dans le menu overlay ── */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: navItems.length * 0.07 + 0.2 }}
                                style={{
                                    marginTop: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <span style={{
                                    fontSize: '0.68rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    color: '#A0AEC0',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                }}>
                                    Langue / Language
                                </span>
                                <button
                                    onClick={toggleLanguage}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'transparent',
                                        border: '1px solid rgba(9,64,103,0.2)',
                                        borderRadius: '24px',
                                        padding: '0',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    <span style={{
                                        padding: '10px 20px',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        color: !isEn ? 'white' : '#718096',
                                        background: !isEn ? '#094067' : 'transparent',
                                        transition: 'all 0.25s ease',
                                    }}>
                                        🇫🇷 Français
                                    </span>
                                    <span style={{
                                        padding: '10px 20px',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        color: isEn ? 'white' : '#718096',
                                        background: isEn ? '#094067' : 'transparent',
                                        transition: 'all 0.25s ease',
                                    }}>
                                        🇬🇧 English
                                    </span>
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ElegantHeader;
