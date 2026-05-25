import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, ChevronRight } from 'lucide-react';
import { client } from '../sanity/client';
import GeopoliticsGenerator from '../components/GeopoliticsGenerator';

const simulationsData = [
    {
        title: "SimONU Prépa",
        subtitle: "L'Excellence comme Outil de Recrutement",
        desc: "Organisée depuis +15 ans (15ème édition nov 2025). Destinée aux CPGE (ECG, ECT, B/L). 250 participants. Thèmes complexes (climat, terrorisme). Encadrement par Alain Joyeux (APHEC).",
        highlight: "250 Participants",
        category: "Domestique",
        color: "#094067",
    },
    {
        title: "SimONU EDC",
        subtitle: "L'Impact Social (Égalité des Chances)",
        desc: "Partenariat 'Phoenix'. Cible : Lycéens REP/REP+ (Marseille). Objectif : Briser l'autocensure et stimuler l'ambition via la diplomatie. 150 participants/an.",
        highlight: "Partenaire Phoenix",
        category: "Social",
        color: "#3F7E44",
    },
    {
        title: "Conseil de Sécurité",
        subtitle: "L'Innovation 2025",
        desc: "Lancement 22 mars 2025. Format de gestion de crise intense (15 membres, véto). Thème : L'Arctique (Ressources, Routes militaires).",
        highlight: "Thème : Arctique",
        category: "Nouveauté",
        color: "#DD1367",
    },
    {
        title: "NMUN New York",
        subtitle: "La Conférence Reine",
        desc: "5000 étudiants. Délégations KEDGE (ex: Botswana, UK). Palmarès : Outstanding Delegation Award (2015), Prix multiples (2019, 2022).",
        highlight: "Outstanding Award",
        category: "International",
        color: "#A21942",
    },
    {
        title: "NMUN Washington DC",
        subtitle: "Formation & Consolidation",
        desc: "Automne. Complémentaire à NY. Permet de former les nouvelles recrues. Régulièrement distinguée.",
        highlight: "Capitale Fédérale",
        category: "International",
        color: "#19486A",
    },
    {
        title: "Simulations Académiques",
        subtitle: "Prestataire Interne KEDGE",
        desc: "PGE (Sept) : Intégration & RSE. IBBA (Janv) : Thème Eau/Hult Prize. Bourse 3500€ pour le gagnant (Camp Londres).",
        highlight: "Intégration Cursus",
        category: "Académique",
        color: "#FD6925",
    }
];

/** Données du calendrier */
interface EventItem {
    date: string;
    title: string;
    location: string;
    target: string;
    color?: string;
}

const defaultEvents: EventItem[] = [
    { date: '04-05 Sept 2024',    title: 'Simulation PGE',          location: 'KEDGE Marseille', target: 'Étudiants PGE',                color: '#094067' },
    { date: '28-29 Nov 2025',     title: 'SimONU Prépa (15e éd.)',   location: 'KEDGE Marseille', target: 'CPGE (ECG, ECT, B/L)',          color: '#094067' },
    { date: '06-08 Jan 2025',     title: 'Simulation IBBA',          location: 'KEDGE Marseille', target: 'BBA (Eau/Hult Prize)',          color: '#19486A' },
    { date: '22 Mars 2025',       title: 'Conseil de Sécurité',      location: 'KEDGE Marseille', target: 'Public (Arctique)',             color: '#DD1367' },
    { date: 'Mars 2025',          title: 'SimONU EDC',               location: 'KEDGE Marseille', target: 'Lycéens REP (Phoenix)',         color: '#3F7E44' },
    { date: 'Avril (Annuel)',      title: 'NMUN New York',            location: 'New York, USA',   target: 'Délégation Internationale',    color: '#A21942' },
    { date: 'Automne (Annuel)',    title: 'NMUN Washington DC',       location: 'Washington',      target: 'Délégation Internationale',    color: '#FD6925' },
];

/** Timeline verticale — Event Card */
const TimelineEvent: React.FC<{ event: EventItem; index: number; isLast: boolean }> = ({ event, index, isLast }) => {
    const [hovered, setHovered] = useState(false);
    const color = event.color || '#094067';

    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            style={{
                display: 'flex',
                gap: '0',
                position: 'relative',
            }}
        >
            {/* Colonne de la timeline */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '48px',
                flexShrink: 0,
            }}>
                {/* Point */}
                <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: hovered ? color : 'white',
                    border: `3px solid ${color}`,
                    boxShadow: hovered ? `0 0 0 4px ${color}22` : 'none',
                    transition: 'all 0.25s ease',
                    zIndex: 1,
                    flexShrink: 0,
                    marginTop: '20px',
                }} />
                {/* Ligne */}
                {!isLast && (
                    <div style={{
                        width: '2px',
                        flex: 1,
                        background: 'rgba(9,64,103,0.12)',
                        marginTop: '6px',
                        minHeight: '40px',
                    }} />
                )}
            </div>

            {/* Card événement */}
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    flex: 1,
                    marginLeft: '20px',
                    marginBottom: isLast ? '0' : '24px',
                    padding: '20px 24px',
                    background: hovered ? 'white' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${hovered ? color + '33' : 'rgba(9,64,103,0.08)'}`,
                    borderLeft: `4px solid ${color}`,
                    borderRadius: '2px',
                    boxShadow: hovered ? `0 8px 30px ${color}18` : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Date badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    background: `${color}14`,
                    borderRadius: '20px',
                    marginBottom: '10px',
                }}>
                    <Calendar size={12} color={color} />
                    <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: 'var(--font-body)',
                    }}>
                        {event.date}
                    </span>
                </div>

                {/* Titre */}
                <h4 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#094067',
                    margin: '0 0 10px',
                    fontFamily: 'var(--font-heading)',
                }}>
                    {event.title}
                </h4>

                {/* Méta */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={13} color="#A0AEC0" />
                        <span style={{ fontSize: '0.85rem', color: '#718096', fontFamily: 'var(--font-body)' }}>
                            {event.location}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={13} color="#A0AEC0" />
                        <span style={{ fontSize: '0.85rem', color: '#718096', fontFamily: 'var(--font-body)' }}>
                            {event.target}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Simulations: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`*[_type == "event"] | order(_createdAt asc)`)
            .then(data => setEvents(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (window.location.hash === '#generateur') {
            setTimeout(() => {
                const el = document.getElementById('generateur');
                if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    const displayEvents: EventItem[] = events.length > 0
        ? events.map((e, i) => ({
            date: e.date || '',
            title: e.title || '',
            location: e.location || '',
            target: [(e.target || ''), (e.theme ? `/ ${e.theme}` : '')].filter(Boolean).join(' '),
            color: defaultEvents[i % defaultEvents.length]?.color,
        }))
        : defaultEvents;

    return (
        <div style={{ minHeight: '100vh', background: 'white', color: '#14213D', fontFamily: 'var(--font-body)' }}>

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
                            Activités & Simulations
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '20px',
                            color: '#094067',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                        }}>
                            Portefeuille d'Activités
                        </h1>
                        <p style={{
                            maxWidth: '560px',
                            margin: '0 auto',
                            fontSize: '1.05rem',
                            color: '#718096',
                            lineHeight: 1.7,
                        }}>
                            Des simulations locales aux conférences internationales, SimONU couvre tout le spectre de la diplomatie parlementaire.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── GRILLE DES SIMULATIONS ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '32px',
                    }}>
                        {simulationsData.map((sim, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                style={{
                                    border: '1px solid rgba(9,64,103,0.1)',
                                    borderTop: `4px solid ${sim.color}`,
                                    padding: '36px 32px',
                                    background: 'white',
                                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                    cursor: 'default',
                                }}
                                whileHover={{
                                    boxShadow: `0 16px 48px rgba(9,64,103,0.1)`,
                                    y: -4,
                                }}
                            >
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: '0.68rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    color: sim.color,
                                    fontWeight: 700,
                                    marginBottom: '14px',
                                    padding: '3px 10px',
                                    background: `${sim.color}14`,
                                    borderRadius: '20px',
                                }}>
                                    {sim.category}
                                </div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    marginBottom: '8px',
                                    color: '#094067',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                }}>
                                    {sim.title}
                                </h3>
                                <div style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: '#718096',
                                    marginBottom: '20px',
                                    paddingBottom: '16px',
                                    borderBottom: '1px solid rgba(9,64,103,0.07)',
                                }}>
                                    {sim.subtitle}
                                </div>
                                <p style={{
                                    fontSize: '0.93rem',
                                    lineHeight: 1.7,
                                    color: '#555',
                                    marginBottom: '20px',
                                }}>
                                    {sim.desc}
                                </p>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    color: sim.color,
                                }}>
                                    <ChevronRight size={14} />
                                    {sim.highlight}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CALENDRIER MAJEUR — TIMELINE ── */}
            <section style={{ padding: '80px 0', background: 'rgba(9,64,103,0.02)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '56px' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '10px',
                        }}>
                            <div style={{
                                width: '40px', height: '3px',
                                background: '#D4AF37',
                                borderRadius: '2px',
                            }} />
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.8rem',
                                color: '#094067',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Calendrier Majeur
                            </h2>
                        </div>
                        <p style={{ color: '#718096', fontSize: '0.95rem', marginLeft: '60px' }}>
                            Toutes les échéances de la saison SimONU — de septembre à avril.
                        </p>
                    </motion.div>

                    <div style={{ maxWidth: '700px' }}>
                        {displayEvents.map((event, i) => (
                            <TimelineEvent
                                key={i}
                                event={event}
                                index={i}
                                isLast={i === displayEvents.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S'ENTRAÎNER AUX DÉBATS — GÉNÉRATEUR GÉOPOLITIQUE ── */}
            <div id="generateur" style={{
                borderTop: '1px solid rgba(9,64,103,0.08)',
            }}>
                <div className="container" style={{ paddingTop: '20px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '8px',
                        paddingTop: '60px',
                    }}>
                        <div style={{
                            width: '40px', height: '3px',
                            background: '#D4AF37',
                            borderRadius: '2px',
                        }} />
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.8rem',
                            color: '#094067',
                            fontWeight: 700,
                            margin: 0,
                        }}>
                            S'entraîner aux Débats
                        </h2>
                    </div>
                    <p style={{
                        color: '#718096',
                        fontSize: '0.95rem',
                        marginLeft: '60px',
                        marginBottom: '0',
                    }}>
                        Entraînez-vous entre les séances grâce à notre outil de génération d'anecdotes géopolitiques.
                    </p>
                </div>
                <GeopoliticsGenerator />
            </div>

        </div>
    );
};

export default Simulations;
