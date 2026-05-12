import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Notre Histoire', path: '/association' },
        { label: 'Équipe', path: '/equipe' },
        { label: 'Événements', path: '/simulations' }, // Mapping 'Simulations' to 'Événements' conceptually
        { label: 'Ressources', path: '/ressources' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            height: scrolled ? '64px' : '80px',
            backgroundColor: 'rgba(250, 250, 248, 0.98)', // Blanc Ivoire opaque
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.4s ease'
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* LOGO */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Logo Vectoriel Simplifié Or */}
                    <div style={{
                        width: scrolled ? '36px' : '48px',
                        height: scrolled ? '36px' : '48px',
                        background: 'var(--imperial-gold)',
                        mask: 'url(/assets/logo-placeholder.svg) center/contain no-repeat', // Placeholder mask
                        WebkitMask: 'url(/assets/logo-placeholder.svg) center/contain no-repeat',
                        borderRadius: '50%', // Fallback shape
                        transition: 'all 0.4s ease'
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: scrolled ? '1.2rem' : '1.5rem',
                        color: 'var(--royal-blue)',
                        letterSpacing: '1px',
                        transition: 'all 0.4s ease'
                    }}>
                        SIMONU
                    </span>
                </Link>

                {/* NAVIGATION DESKTOP */}
                <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                fontFamily: 'var(--font-nav)',
                                fontSize: '14px',
                                fontWeight: isActive(item.path) ? 700 : 500,
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                color: 'var(--royal-blue)',
                                textDecoration: 'none',
                                paddingBottom: '4px',
                                borderBottom: isActive(item.path) ? '3px solid var(--imperial-gold)' : '3px solid transparent',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--imperial-gold)';
                                e.currentTarget.style.borderBottomColor = 'var(--imperial-gold)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--royal-blue)';
                                if (!isActive(item.path)) e.currentTarget.style.borderBottomColor = 'transparent';
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* CTA BOUTON */}
                    <Link to="/contact" style={{
                        backgroundColor: 'var(--royal-blue)',
                        color: 'var(--imperial-gold)',
                        padding: '12px 32px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-nav)',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bordeaux)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--royal-blue)'}
                    >
                        Nous Rejoindre
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
