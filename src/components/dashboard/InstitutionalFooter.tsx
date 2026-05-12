import React from 'react';

const InstitutionalFooter: React.FC = () => {
    return (
        <footer style={{ background: '#1b365d', color: 'white', padding: '60px 0 20px', borderTop: '4px solid #009EDB' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>

                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', letterSpacing: '1px' }}>SIMONU</div>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                            Simulation de l'Organisation des Nations Unies.<br />
                            Marseille, France.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: '#009EDB', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Data Sources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                            <li style={{ marginBottom: '10px' }}>UN Open Data</li>
                            <li style={{ marginBottom: '10px' }}>World Bank API</li>
                            <li style={{ marginBottom: '10px' }}>Global Peace Index</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#009EDB', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                            <li style={{ marginBottom: '10px' }}>Terms of Use</li>
                            <li style={{ marginBottom: '10px' }}>Privacy Policy</li>
                            <li style={{ marginBottom: '10px' }}>Transparency Report</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#009EDB', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                            <li style={{ marginBottom: '10px' }}>contact@simonu.fr</li>
                            <li style={{ marginBottom: '10px' }}>+33 1 23 45 67 89</li>
                        </ul>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                    &copy; {new Date().getFullYear()} SIMONU Marseille. All rights reserved. Institutional Theme.
                </div>
            </div>
        </footer>
    );
};

export default InstitutionalFooter;
