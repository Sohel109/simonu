import React from 'react';


const Association: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#14213D', fontFamily: 'Montserrat, sans-serif' }}>

            {/* HEADER */}
            <div style={{ padding: '80px 0', textAlign: 'center', background: '#F4F7F6' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>L'Écosystème SimONU Marseille</h1>
                </div>
            </div>

            {/* SOMMAIRE EXÉCUTIF */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ borderLeft: '4px solid #14213D', paddingLeft: '40px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>Sommaire Exécutif</h2>
                        <p style={{ marginBottom: '24px', lineHeight: 1.8, fontSize: '1rem', color: '#333' }}>
                            Dans le paysage de l'enseignement supérieur de gestion en France, l'engagement associatif constitue un pilier fondamental de la pédagogie, souvent qualifié de <strong>« Learning by Doing »</strong>. Au sein de KEDGE Business School, SimONU Marseille se distingue comme une structure d'excellence dédiée à la diplomatie, à la géopolitique et à la simulation des travaux des Nations Unies.
                        </p>
                        <p style={{ lineHeight: 1.8, fontSize: '1rem', color: '#333' }}>
                            Ce rapport démontre comment SimONU Marseille dépasse le simple cadre étudiant pour devenir un véritable <strong>laboratoire de compétences managériales et citoyennes</strong>. L'analyse couvre ses activités phares (SimONU Prépa), son engagement sociétal via le programme « Égalité des Chances », son rayonnement international au travers des MUN de New York, ainsi que sa mutation vers l'autosuffisance via les « Corporate Services ».
                        </p>
                    </div>
                </div>
            </section>

            {/* CHAPITRE 1 : ANCRAGE */}
            <section style={{ padding: '80px 0', background: '#FAFAFA' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: '#14213D', fontFamily: 'Playfair Display, serif', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>1. Ancrage Institutionnel & Contexte</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#14213D' }}>1.1 L'Environnement KEDGE</h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#555', marginBottom: '20px' }}>
                                KEDGE Business School, institution triplement accréditée (AACSB, EQUIS, AMBA), impose des standards d'excellence. Le campus de Marseille, niché dans les Calanques, bénéficie de l'héritage cosmopolite de la cité phocéenne.
                            </p>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#555' }}>
                                La pédagogie <strong>« Learning by Doing »</strong> fait des associations des micro-entreprises avec obligations de résultats. SimONU offre un terrain d'application concret aux enseignements de stratégie et négociation.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#14213D' }}>1.2 Genèse & Historique</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '20px', paddingLeft: '20px', borderLeft: '2px solid #ddd' }}>
                                    <strong style={{ color: '#14213D' }}>2006 - 2011 : Les Fondations.</strong><br />
                                    Premières initiatives avec l'UNRIC.
                                </li>
                                <li style={{ marginBottom: '20px', paddingLeft: '20px', borderLeft: '2px solid #ddd' }}>
                                    <strong style={{ color: '#14213D' }}>2011 - 2017 : Structuration.</strong><br />
                                    Partenariat Phoenix Égalité des Chances. Fusion BEM-Euromed (2013).
                                </li>
                                <li style={{ paddingLeft: '20px', borderLeft: '2px solid #14213D' }}>
                                    <strong style={{ color: '#14213D' }}>2017 - Présent : L'Ère Moderne.</strong><br />
                                    Refonte des statuts, expansion des activités (PGE, IBBA) et rayonnement US.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHAPITRE 2 & 3 : STRATÉGIE & INTELLECT */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px' }}>

                        {/* MODELE ECO */}
                        <div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>2. Modèle Économique</h2>
                            <p style={{ marginBottom: '20px', lineHeight: 1.7, color: '#555' }}>
                                Face à la nécessité de réduire la dépendance aux subventions, l'association a lancé ses <strong>« Corporate Services »</strong>.
                            </p>
                            <div style={{ background: '#F4F7F6', padding: '30px', borderRadius: '4px' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#14213D' }}>Offre Entreprises</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Formations à la négociation, Public Speaking, Team Building via gestion de crise.</p>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '15px' }}>Partenaires Clés</h4>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    {['Air France', 'Rotary International', 'Lycée La Nativité'].map(p => (
                                        <span key={p} style={{ padding: '5px 15px', border: '1px solid #ddd', fontSize: '0.8rem', color: '#14213D' }}>{p}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* APPORTS INTELLECTUELS */}
                        <div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>3. Apports Intellectuels</h2>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 style={{ color: '#14213D', marginBottom: '10px' }}>Alignement ODD</h4>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#555' }}>
                                    Intégration systématique des Objectifs de Développement Durable : Accès à l'eau (ODD 6), Justice climatique (ODD 13), Paix (ODD 16).
                                </p>
                            </div>
                            <div>
                                <h4 style={{ color: '#14213D', marginBottom: '10px' }}>Veille Géopolitique</h4>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#555' }}>
                                    Production d'articles d'analyse (ex: "Ruée vers le lithium", "Rome-Berlin"). Les membres sont des analystes capables de décrypter l'actualité.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONCLUSION */}
            <section style={{ padding: '80px 0', background: '#14213D', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: 'Playfair Display, serif', color: 'white' }}>Conclusion</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'white' }}>
                        SimONU Marseille est une école de l'excellence diplomatique et managériale. Elle opère localement (Lycées), nationalement (Prépas) et internationalement (NY/DC). Structurée, innovante et résiliente, elle incarne le meilleur de l'engagement étudiant à KEDGE.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Association;
