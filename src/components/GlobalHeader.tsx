import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Radio, Scale, Shield, Mail, Home } from 'lucide-react';

const GlobalHeader: React.FC = () => {
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState<string>('');

    // UTC Clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: 'UTC',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setCurrentTime(`${timeString} UTC`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { path: '/', label: 'Home', icon: <Home size={18} /> },
        { path: '/simulations', label: 'Simulations', icon: <Globe size={18} /> },
        { path: '/news', label: 'News', icon: <Radio size={18} /> }, // Placeholder if not strictly defined
        { path: '/legal', label: 'Justice', icon: <Scale size={18} /> }, // Placeholder
        { path: '/sdgs', label: 'SDGs', icon: <Shield size={18} /> }, // Placeholder
        { path: '/contact', label: 'Contact', icon: <Mail size={18} /> }
    ];

    // Filter relevant links based on USER_REQUEST (Icons only button)
    // The user asked for "Bouton accès sections (icônes uniquement)". 
    // Let's implement a clean row of icons.

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'rgba(20, 33, 61, 0.95)', // Deep Navy
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 10000,
            color: 'white'
        }}>
            {/* Left: Logo/Symbol */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #009EDB', // UN Blue
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ width: '8px', height: '8px', background: '#009EDB', borderRadius: '50%' }} />
                </div>
                <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    letterSpacing: '1px',
                    fontWeight: 600
                }}>
                    SIMONU
                </span>
            </div>

            {/* Center: Live UTC Clock */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: '#009EDB',
                letterSpacing: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div style={{ width: '6px', height: '6px', background: 'red', borderRadius: '50%', boxShadow: '0 0 8px red' }} className="animate-pulse" />
                {currentTime}
            </div>

            {/* Right: Navigation Icons */}
            <nav style={{ display: 'flex', gap: '4px' }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={item.label}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                color: isActive ? '#009EDB' : 'rgba(255,255,255,0.6)',
                                transition: 'all 0.2s',
                                background: isActive ? 'rgba(0, 158, 219, 0.1)' : 'transparent'
                            }}
                        >
                            {item.icon}
                        </Link>
                    )
                })}
            </nav>
        </header>
    );
};

export default GlobalHeader;
