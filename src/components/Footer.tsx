import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer style={{ background: '#F8F9FA', padding: '80px 0 40px', borderTop: '1px solid #E5E5E5' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>

                    {/* COL 1 - BRAND */}
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: 'var(--royal-blue)', fontFamily: 'var(--font-heading)' }}>
                            SIMONU
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            Campus KEDGE Luminy<br />
                            Rue Antoine Bourdelle<br />
                            13009 Marseille
                        </p>
                    </div>

                    {/* COL 2 - LINKS */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>{t('nav')}</h4>
                        <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem' }}>
                            {[
                                { name: t('welcome'), path: '/' },
                                { name: t('news'), path: '/actualites' },
                                { name: t('association'), path: '/association' },
                                { name: t('team'), path: '/equipe' },
                                { name: t('simulations'), path: '/simulations' },
                                { name: t('contact'), path: '/contact' }
                            ].map(item => (
                                <li key={item.name} style={{ marginBottom: '10px' }}>
                                    <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COL 3 - SOCIAL */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>{t('follow_us')}</h4>
                        <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://www.instagram.com/simonumarseille/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://www.linkedin.com/company/simonu-kedge-bs/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://www.facebook.com/groups/973367937266228" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
                            </li>
                        </ul>
                    </div>

                    {/* COL 4 - LEGAL */}
                    <div>
                        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>{t('legal')}</h4>
                        <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/mentions-legales" style={{ color: 'inherit', textDecoration: 'none' }}>{t('legal_mentions')}</Link>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Link to="/confidentialite" style={{ color: 'inherit', textDecoration: 'none' }}>{t('privacy')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
                    © 2026 SimONU Marseille. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
