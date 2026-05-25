import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../sanity/client';

interface TeamMember {
    name: string;
    role: string;
    desc: string;
    photo?: string;
}

interface Pole {
    name: string;
    chef: string;
    mission: string;
}

interface EquipeData {
    bureau: TeamMember[];
    poles: Pole[];
    encadrement: string;
}

/** Génère une couleur de fond unique et déterministe à partir du nom */
const getAvatarColor = (name: string): string => {
    const colors = [
        '#094067', '#1B4F8C', '#2E6DAD', '#0A97D9',
        '#19486A', '#3F7E44', '#A21942', '#DD1367',
        '#D4AF37', '#C5192D', '#FD6925', '#00689D',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

/** Extrait les initiales d'un nom complet */
const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
};

/** Card de membre du bureau — trombinoscope style */
const MemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    const [hovered, setHovered] = useState(false);
    const bgColor = getAvatarColor(member.name);
    const initials = getInitials(member.name);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'white',
                border: '1px solid rgba(9, 64, 103, 0.1)',
                borderRadius: '2px',
                padding: '36px 28px 32px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                boxShadow: hovered
                    ? '0 16px 48px rgba(9, 64, 103, 0.12)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                borderTop: hovered ? `3px solid #D4AF37` : '3px solid transparent',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Déco fond */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '80px',
                background: hovered
                    ? 'linear-gradient(135deg, rgba(9,64,103,0.04) 0%, rgba(212,175,55,0.04) 100%)'
                    : 'rgba(9,64,103,0.02)',
                transition: 'background 0.3s ease',
                zIndex: 0,
            }} />

            {/* AVATAR */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {member.photo ? (
                    <img
                        src={member.photo}
                        alt={member.name}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `3px solid ${bgColor}22`,
                            boxShadow: `0 4px 16px ${bgColor}33`,
                        }}
                    />
                ) : (
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}cc 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 6px 20px ${bgColor}40`,
                        border: '3px solid white',
                    }}>
                        <span style={{
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            letterSpacing: '1px',
                        }}>
                            {initials}
                        </span>
                    </div>
                )}
            </div>

            {/* NOM */}
            <div style={{ zIndex: 1 }}>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#14213D',
                    margin: 0,
                    marginBottom: '6px',
                    letterSpacing: '-0.2px',
                }}>
                    {member.name}
                </h3>

                {/* RÔLE */}
                <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: 'rgba(9, 64, 103, 0.07)',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#094067',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-body)',
                }}>
                    {member.role}
                </div>
            </div>

            {/* DESCRIPTION */}
            {member.desc && (
                <p style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: '#718096',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    zIndex: 1,
                }}>
                    {member.desc}
                </p>
            )}
        </motion.div>
    );
};

/** Card de pôle opérationnel */
const PoleCard: React.FC<{ pole: Pole; index: number }> = ({ pole, index }) => {
    const bgColor = getAvatarColor(pole.chef);
    const initials = getInitials(pole.chef);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            style={{
                display: 'flex',
                gap: '20px',
                padding: '28px',
                background: 'white',
                border: '1px solid rgba(9, 64, 103, 0.08)',
                borderRadius: '2px',
            }}
        >
            {/* Numéro */}
            <div style={{
                fontSize: '2.5rem',
                color: 'rgba(9,64,103,0.1)',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                lineHeight: 1,
                minWidth: '48px',
            }}>
                {String(index + 1).padStart(2, '0')}
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    color: '#14213D',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                }}>
                    {pole.name}
                </h3>

                {/* Chef du pôle avec avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}cc 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: 'white',
                        flexShrink: 0,
                    }}>
                        {initials}
                    </div>
                    <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#094067',
                        fontFamily: 'var(--font-body)',
                    }}>
                        Resp. {pole.chef}
                    </span>
                </div>

                <p style={{
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    color: '#718096',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                }}>
                    {pole.mission}
                </p>
            </div>
        </motion.div>
    );
};

const Equipe: React.FC = () => {
    const [data, setData] = useState<EquipeData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sanityMembers = await client.fetch(`*[_type == "teamMember"] | order(order asc)`);

                if (sanityMembers.length === 0) {
                    const res = await fetch('/data/equipe.json');
                    const json = await res.json();
                    setData(json);
                } else {
                    setData({
                        bureau: sanityMembers.filter((m: any) => m.category === 'bureau'),
                        poles: sanityMembers.filter((m: any) => m.category === 'pole').map((p: any) => ({
                            name: p.role,
                            chef: p.name,
                            mission: p.desc,
                        })),
                        encadrement: "L'association bénéficie du soutien de l'administration (Céline Salle, Learning by Doing Manager) et d'un réseau Alumni actif (ex: Théo Geandreau, Camille Paolini) assurant le mentorat.",
                    });
                }
            } catch (err) {
                console.error("Erreur de chargement Sanity:", err);
                try {
                    const res = await fetch('/data/equipe.json');
                    const json = await res.json();
                    setData(json);
                } catch (fallbackErr) {
                    console.error("Erreur du fichier JSON de secours:", fallbackErr);
                }
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return (
            <div style={{
                padding: '200px 0',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                color: '#094067',
            }}>
                <div style={{
                    width: '40px', height: '40px',
                    border: '3px solid rgba(9,64,103,0.2)',
                    borderTopColor: '#094067',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 20px',
                }} />
                Chargement de l'équipe...
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'white', color: '#14213D', fontFamily: 'var(--font-body)' }}>

            {/* ── PAGE HEADER ── */}
            <div style={{
                padding: '100px 0 80px',
                textAlign: 'center',
                background: 'linear-gradient(180deg, rgba(9,64,103,0.04) 0%, white 100%)',
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
                            Mandat 2026
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            marginBottom: '20px',
                            color: '#094067',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                        }}>
                            Gouvernance & Équipe
                        </h1>
                        <p style={{
                            maxWidth: '560px',
                            margin: '0 auto',
                            fontSize: '1.05rem',
                            color: '#718096',
                            lineHeight: 1.7,
                        }}>
                            Une organisation hiérarchisée, spécialisée et professionnalisée au service de l'excellence diplomatique.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── TROMBINOSCOPE — BUREAU EXÉCUTIF ── */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '60px' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '8px',
                        }}>
                            <div style={{
                                width: '40px',
                                height: '3px',
                                background: '#D4AF37',
                                borderRadius: '2px',
                            }} />
                            <h2 style={{
                                fontSize: '1.6rem',
                                color: '#094067',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Le Bureau Exécutif
                            </h2>
                        </div>
                        <p style={{ color: '#718096', fontSize: '0.95rem', marginLeft: '60px' }}>
                            Les membres élus au cœur de la gouvernance de SimONU Marseille.
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '24px',
                    }}>
                        {data.bureau.map((m, i) => (
                            <MemberCard key={i} member={m} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PÔLES OPÉRATIONNELS ── */}
            <section style={{ padding: '80px 0 100px', background: 'rgba(9,64,103,0.02)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '50px' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '8px',
                        }}>
                            <div style={{
                                width: '40px',
                                height: '3px',
                                background: '#094067',
                                borderRadius: '2px',
                            }} />
                            <h2 style={{
                                fontSize: '1.6rem',
                                color: '#094067',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Pôles Opérationnels
                            </h2>
                        </div>
                        <p style={{ color: '#718096', fontSize: '0.95rem', marginLeft: '60px' }}>
                            Les équipes spécialisées qui font vivre l'association au quotidien.
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '20px',
                    }}>
                        {data.poles.map((p, i) => (
                            <PoleCard key={i} pole={p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ENCADREMENT & ALUMNI ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        maxWidth: '780px',
                        margin: '0 auto',
                        padding: '48px 56px',
                        background: 'linear-gradient(135deg, #094067 0%, #0a5c8c 100%)',
                        borderRadius: '4px',
                        color: 'white',
                    }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '20px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            color: '#D4AF37',
                            letterSpacing: '0.5px',
                        }}>
                            Encadrement & Réseau Alumni
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.85)',
                            lineHeight: 1.8,
                            margin: 0,
                        }}>
                            {data.encadrement}
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Equipe;
