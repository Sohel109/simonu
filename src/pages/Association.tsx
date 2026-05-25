import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Globe, Award, CheckCircle, TrendingUp,
    Users, Lightbulb, Search, DollarSign, Building
} from 'lucide-react';

/** Composant de mise en valeur d'un terme */
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <strong style={{ color: '#094067', fontWeight: 700 }}>{children}</strong>
);

/** Sous-titre de section avec icône */
const SectionTitle: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
    level?: 2 | 3;
}> = ({ icon, children, level = 2 }) => {
    const Tag = `h${level}` as 'h2' | 'h3';
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '28px',
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(9, 64, 103, 0.08)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                {icon}
            </div>
            <Tag style={{
                fontFamily: 'var(--font-heading)',
                fontSize: level === 2 ? '1.7rem' : '1.25rem',
                color: '#094067',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.3px',
            }}>
                {children}
            </Tag>
        </div>
    );
};

/** Liste de points clés avec icône CheckCircle */
const KeyPoints: React.FC<{ items: string[] }> = ({ items }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle
                    size={16}
                    color="#4C9F38"
                    style={{ flexShrink: 0, marginTop: '3px' }}
                />
                <span style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: '#555',
                    fontFamily: 'var(--font-body)',
                }}>
                    {item}
                </span>
            </li>
        ))}
    </ul>
);

const Association: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#14213D', fontFamily: 'var(--font-body)' }}>

            {/* ── PAGE HEADER ── */}
            <div style={{
                padding: '100px 0 80px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(9,64,103,0.05) 0%, white 100%)',
                borderBottom: '1px solid rgba(9,64,103,0.07)',
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p style={{
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            color: '#D4AF37',
                            marginBottom: '16px',
                            fontWeight: 700,
                        }}>
                            Chapitre 1
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '20px',
                            color: '#094067',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                        }}>
                            L'Écosystème SimONU Marseille
                        </h1>
                        <p style={{
                            maxWidth: '580px',
                            margin: '0 auto',
                            fontSize: '1.05rem',
                            color: '#718096',
                            lineHeight: 1.7,
                        }}>
                            Un laboratoire de compétences diplomatiques et managériales au cœur de KEDGE Business School.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── SOMMAIRE EXÉCUTIF ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '60px',
                            alignItems: 'start',
                        }}
                    >
                        <div style={{ borderLeft: '4px solid #094067', paddingLeft: '36px' }}>
                            <SectionTitle icon={<BookOpen size={20} color="#094067" />} level={2}>
                                Sommaire Exécutif
                            </SectionTitle>
                            <p style={{ lineHeight: 1.8, fontSize: '1rem', color: '#444', marginBottom: '20px' }}>
                                Dans le paysage de l'enseignement supérieur en France, l'engagement associatif constitue un pilier de la pédagogie <Highlight>« Learning by Doing »</Highlight>. SimONU Marseille se distingue comme une structure d'excellence dédiée à la <Highlight>diplomatie</Highlight>, à la <Highlight>géopolitique</Highlight> et à la simulation des travaux des Nations Unies.
                            </p>
                            <p style={{ lineHeight: 1.8, fontSize: '1rem', color: '#444' }}>
                                Ce rapport démontre comment SimONU dépasse le simple cadre étudiant pour devenir un véritable <Highlight>laboratoire de compétences managériales et citoyennes</Highlight>.
                            </p>
                        </div>

                        {/* Points clés */}
                        <div>
                            <p style={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                color: '#A0AEC0',
                                fontWeight: 700,
                                marginBottom: '20px',
                            }}>
                                Points essentiels
                            </p>
                            <KeyPoints items={[
                                'Activité phare SimONU Prépa — 250 participants, 15 éditions',
                                'Programme « Égalité des Chances » avec l\'association Phoenix',
                                'Rayonnement international : NMUN New York & Washington DC',
                                'Mutation vers l\'autosuffisance via les « Corporate Services »',
                                'Institution triplement accréditée (AACSB, EQUIS, AMBA)',
                            ]} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── ANCRAGE INSTITUTIONNEL ── */}
            <section style={{ padding: '80px 0', background: 'rgba(9,64,103,0.025)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionTitle icon={<Building size={20} color="#094067" />}>
                            1. Ancrage Institutionnel & Contexte
                        </SectionTitle>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                            gap: '60px',
                        }}>
                            {/* Environnement KEDGE */}
                            <div>
                                <h3 style={{
                                    fontSize: '1.15rem',
                                    marginBottom: '16px',
                                    color: '#094067',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                }}>
                                    1.1 L'Environnement KEDGE
                                </h3>
                                <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: '#555', marginBottom: '20px' }}>
                                    KEDGE Business School, institution <Highlight>triplement accréditée</Highlight> (AACSB, EQUIS, AMBA), impose des standards d'excellence. Le campus de Marseille bénéficie de l'héritage cosmopolite de la cité phocéenne.
                                </p>
                                <KeyPoints items={[
                                    'Pédagogie « Learning by Doing » — les associations sont des micro-entreprises',
                                    'Terrain d\'application concret pour la stratégie et la négociation',
                                    'Obligation de résultats mesurables sur chaque mandat',
                                ]} />
                            </div>

                            {/* Genèse */}
                            <div>
                                <h3 style={{
                                    fontSize: '1.15rem',
                                    marginBottom: '20px',
                                    color: '#094067',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                }}>
                                    1.2 Genèse & Historique
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {[
                                        { period: '2006 – 2011', label: 'Les Fondations', desc: 'Premières initiatives avec l\'UNRIC. Pose des bases du mouvement MUN à Marseille.' },
                                        { period: '2011 – 2017', label: 'Structuration', desc: 'Partenariat Phoenix Égalité des Chances. Fusion BEM-Euromed (2013).' },
                                        { period: '2017 – Présent', label: 'L\'Ère Moderne', desc: 'Refonte des statuts, expansion (PGE, IBBA) et rayonnement US.', active: true },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                gap: '20px',
                                                paddingLeft: '16px',
                                                borderLeft: `3px solid ${item.active ? '#094067' : '#ddd'}`,
                                            }}
                                        >
                                            <div>
                                                <div style={{
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    color: '#D4AF37',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    marginBottom: '4px',
                                                }}>
                                                    {item.period}
                                                </div>
                                                <div style={{
                                                    fontWeight: 700,
                                                    color: '#094067',
                                                    fontSize: '0.95rem',
                                                    marginBottom: '6px',
                                                }}>
                                                    {item.label}
                                                </div>
                                                <p style={{
                                                    fontSize: '0.9rem',
                                                    color: '#718096',
                                                    margin: 0,
                                                    lineHeight: 1.6,
                                                }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── MODÈLE ÉCONOMIQUE & APPORTS ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                        gap: '80px',
                    }}>

                        {/* MODÈLE ÉCONOMIQUE */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SectionTitle icon={<DollarSign size={20} color="#094067" />}>
                                2. Modèle Économique
                            </SectionTitle>
                            <p style={{ lineHeight: 1.8, color: '#555', marginBottom: '28px', fontSize: '0.97rem' }}>
                                Face à la nécessité de réduire la dépendance aux subventions, l'association a lancé ses <Highlight>« Corporate Services »</Highlight> — une offre B2B structurée autour des compétences SimONU.
                            </p>

                            <div style={{
                                background: 'rgba(9,64,103,0.04)',
                                padding: '28px',
                                borderRadius: '4px',
                                borderLeft: '4px solid #094067',
                                marginBottom: '28px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '12px',
                                }}>
                                    <TrendingUp size={18} color="#094067" />
                                    <h4 style={{ margin: 0, color: '#094067', fontWeight: 700, fontSize: '1rem' }}>
                                        Offre Entreprises
                                    </h4>
                                </div>
                                <KeyPoints items={[
                                    'Formations à la négociation et au débat structuré',
                                    'Ateliers Public Speaking pour dirigeants',
                                    'Team Building via gestion de crise diplomatique',
                                ]} />
                            </div>

                            <div>
                                <p style={{
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    color: '#A0AEC0',
                                    fontWeight: 700,
                                    marginBottom: '14px',
                                }}>
                                    Partenaires Clés
                                </p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {['Air France', 'Rotary International', 'Lycée La Nativité'].map(p => (
                                        <span
                                            key={p}
                                            style={{
                                                padding: '6px 16px',
                                                border: '1px solid rgba(9,64,103,0.15)',
                                                fontSize: '0.82rem',
                                                color: '#094067',
                                                fontWeight: 600,
                                                borderRadius: '20px',
                                            }}
                                        >
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* APPORTS INTELLECTUELS */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <SectionTitle icon={<Lightbulb size={20} color="#094067" />}>
                                3. Apports Intellectuels
                            </SectionTitle>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

                                {/* Alignement ODD */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '14px',
                                    }}>
                                        <Globe size={18} color="#3F7E44" />
                                        <h4 style={{ margin: 0, color: '#094067', fontWeight: 700, fontSize: '1rem' }}>
                                            Alignement ODD
                                        </h4>
                                    </div>
                                    <KeyPoints items={[
                                        'Intégration des 17 ODD dans chaque simulation',
                                        'Accès à l\'eau (ODD 6) — Justice climatique (ODD 13)',
                                        'Paix et institutions efficaces (ODD 16)',
                                        'Lutte contre les inégalités (ODD 10)',
                                    ]} />
                                </div>

                                {/* Veille Géopolitique */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '14px',
                                    }}>
                                        <Search size={18} color="#0A97D9" />
                                        <h4 style={{ margin: 0, color: '#094067', fontWeight: 700, fontSize: '1rem' }}>
                                            Veille Géopolitique
                                        </h4>
                                    </div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#555', marginBottom: '14px' }}>
                                        Production régulière d'articles d'analyse géopolitique approfondis. Les membres deviennent de véritables <Highlight>analystes capables de décrypter l'actualité internationale</Highlight>.
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {['"Ruée vers le lithium"', '"Rome-Berlin"', '"Arctique 2025"'].map(a => (
                                            <span key={a} style={{
                                                padding: '4px 12px',
                                                background: 'rgba(10,151,217,0.08)',
                                                color: '#0A97D9',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                            }}>
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Impact formation */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '14px',
                                    }}>
                                        <Users size={18} color="#A21942" />
                                        <h4 style={{ margin: 0, color: '#094067', fontWeight: 700, fontSize: '1rem' }}>
                                            Impact Formation
                                        </h4>
                                    </div>
                                    <KeyPoints items={[
                                        '5 000+ étudiants touchés en 19 ans d\'existence',
                                        '150 lycéens REP/REP+ formés chaque année (Égalité des Chances)',
                                        '10+ prix et distinctions internationaux',
                                    ]} />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── CONCLUSION ── */}
            <section style={{ padding: '80px 0', background: '#094067', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Award size={40} color="#D4AF37" style={{ marginBottom: '24px' }} />
                        <h2 style={{
                            fontSize: '2rem',
                            marginBottom: '24px',
                            fontFamily: 'var(--font-heading)',
                            color: 'white',
                            fontWeight: 700,
                        }}>
                            Conclusion
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.85,
                            color: 'rgba(255,255,255,0.85)',
                            marginBottom: '12px',
                        }}>
                            SimONU Marseille est une <strong style={{ color: '#D4AF37' }}>école de l'excellence diplomatique et managériale</strong>. Elle opère localement (Lycées), nationalement (Prépas) et internationalement (NY/DC).
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.7,
                        }}>
                            Structurée, innovante et résiliente, elle incarne le meilleur de l'engagement étudiant à KEDGE.
                        </p>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Association;
