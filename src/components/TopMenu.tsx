import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopMenu: React.FC = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'Accueil' },
        { path: '/association', label: 'L\'Association' },
        { path: '/equipe', label: 'Gouvernance' },
        { path: '/simulations', label: 'Simulations' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: scrolled ? '0' : '20px 0',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(12px)',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                height: scrolled ? '70px' : '80px',
                display: 'flex',
                alignItems: 'center',
                transition: 'height 0.3s ease',
                boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.03)' : 'none'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                    {/* LOGO */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'var(--royal-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '16px',
                            borderRadius: '2px'
                        }}>
                            S
                        </div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem', letterSpacing: '-0.3px', textTransform: 'uppercase' }}>
                            SimONU <span style={{ fontWeight: 300 }}>Marseille</span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav style={{ display: 'flex', gap: '4px' }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onMouseEnter={() => setHoveredPath(item.path)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    style={{
                                        position: 'relative',
                                        padding: '10px 18px',
                                        textDecoration: 'none',
                                        color: isActive ? 'white' : 'var(--text-main)',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        transition: 'color 0.2s',
                                        background: isActive ? 'var(--royal-blue)' : 'transparent',
                                        borderRadius: '2px',
                                    }}
                                >
                                    {item.label}
                                    {!isActive && hoveredPath === item.path && (
                                        <motion.div
                                            layoutId="hoverBg"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'rgba(0,0,0,0.03)',
                                                zIndex: -1,
                                                borderRadius: '2px'
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* EXT LINK */}
                    <a href="#" style={{
                        padding: '10px 24px',
                        border: '1px solid var(--royal-blue)',
                        color: 'var(--royal-blue)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        borderRadius: '2px',
                        background: 'transparent',
                        transition: 'all 0.2s'
                    }}>
                        KEDGE BS
                    </a>
                </div>
            </div>
        </header>
    );
};

export default TopMenu;
