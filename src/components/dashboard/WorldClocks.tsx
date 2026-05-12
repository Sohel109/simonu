import React, { useState, useEffect } from 'react';

const CLOCKS = [
    { city: 'New York', tz: 'America/New_York', label: 'UN HQ' },
    { city: 'Geneva', tz: 'Europe/Zurich', label: 'UNOG' },
    { city: 'The Hague', tz: 'Europe/Amsterdam', label: 'ICJ' },
    { city: 'Vienna', tz: 'Europe/Vienna', label: 'UNOV' },
    { city: 'Nairobi', tz: 'Africa/Nairobi', label: 'UNON' },
];

const WorldClocks: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{ padding: '40px 0', background: '#0b1121', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                {CLOCKS.map((clock) => {
                    const cityTime = time.toLocaleTimeString('en-US', {
                        timeZone: clock.tz,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });

                    return (
                        <div key={clock.city} style={{ textAlign: 'center', opacity: 0.8, flex: '1 0 150px' }}>
                            <div style={{ color: '#009EDB', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                                {clock.label}
                            </div>
                            <div style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                                {cityTime}
                            </div>
                            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>
                                {clock.city}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WorldClocks;
