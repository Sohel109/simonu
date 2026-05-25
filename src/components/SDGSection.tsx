import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ODDS = [
    { id: 1,  color: '#E5243B', label_fr: 'Pas de pauvreté',                        label_en: 'No Poverty' },
    { id: 2,  color: '#DDA63A', label_fr: 'Faim "zéro"',                             label_en: 'Zero Hunger' },
    { id: 3,  color: '#4C9F38', label_fr: 'Bonne santé',                             label_en: 'Good Health' },
    { id: 4,  color: '#C5192D', label_fr: 'Éducation de qualité',                    label_en: 'Quality Education' },
    { id: 5,  color: '#FF3A21', label_fr: 'Égalité des sexes',                       label_en: 'Gender Equality' },
    { id: 6,  color: '#26BDE2', label_fr: 'Eau propre',                              label_en: 'Clean Water' },
    { id: 7,  color: '#FCC30B', label_fr: 'Énergie propre',                          label_en: 'Clean Energy' },
    { id: 8,  color: '#A21942', label_fr: 'Travail décent',                          label_en: 'Decent Work' },
    { id: 9,  color: '#FD6925', label_fr: 'Industrie & innovation',                  label_en: 'Industry & Innovation' },
    { id: 10, color: '#DD1367', label_fr: 'Inégalités réduites',                     label_en: 'Reduced Inequalities' },
    { id: 11, color: '#FD9D24', label_fr: 'Villes durables',                         label_en: 'Sustainable Cities' },
    { id: 12, color: '#BF8B2E', label_fr: 'Consommation responsable',                label_en: 'Responsible Consumption' },
    { id: 13, color: '#3F7E44', label_fr: 'Lutte climatique',                        label_en: 'Climate Action' },
    { id: 14, color: '#0A97D9', label_fr: 'Vie aquatique',                           label_en: 'Life Below Water' },
    { id: 15, color: '#56C02B', label_fr: 'Vie terrestre',                           label_en: 'Life on Land' },
    { id: 16, color: '#00689D', label_fr: 'Paix & justice',                          label_en: 'Peace & Justice' },
    { id: 17, color: '#19486A', label_fr: 'Partenariats',                            label_en: 'Partnerships' },
];

const SDGSection: React.FC = () => {
    const { i18n } = useTranslation();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isFr = i18n.language === 'fr' || i18n.language.startsWith('fr');

    return (
        <section style={{
            padding: '120px 0',
            background: 'white',
            borderTop: '1px solid rgba(9, 64, 103, 0.06)',
        }}>
            <div className="container">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '70px' }}
                >
                    <p style={{
                        fontSize: '0.78rem',
                        color: '#A0AEC0',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                    }}>
                        {isFr ? 'Notre engagement' : 'Our commitment'}
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                        color: '#094067',
                        fontWeight: 700,
                        marginBottom: '24px',
                        letterSpacing: '-0.5px',
                    }}>
                        {isFr
                            ? 'Les 17 Objectifs de Développement Durable'
                            : 'The 17 Sustainable Development Goals'}
                    </h2>
                    <p style={{
                        maxWidth: '620px',
                        margin: '0 auto',
                        fontSize: '1.05rem',
                        color: '#718096',
                        lineHeight: 1.8,
                        fontFamily: 'var(--font-body)',
                    }}>
                        {isFr
                            ? 'SimONU Marseille intègre systématiquement l\'agenda 2030 des Nations Unies dans ses simulations, ses débats et ses publications — formant des leaders conscients des enjeux planétaires.'
                            : 'SimONU Marseille systematically integrates the UN 2030 Agenda into its simulations, debates and publications — training leaders aware of global challenges.'}
                    </p>
                </motion.div>

                {/* SDG GRID */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'center',
                        maxWidth: '900px',
                        margin: '0 auto',
                        position: 'relative',
                    }}
                >
                    {ODDS.map((odd, idx) => {
                        const label = isFr ? odd.label_fr : odd.label_en;
                        const isHovered = hoveredId === odd.id;
                        return (
                            <motion.div
                                key={odd.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.03 }}
                                onMouseEnter={() => setHoveredId(odd.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    position: 'relative',
                                    width: '72px',
                                    height: '72px',
                                    background: odd.color,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'default',
                                    transform: isHovered ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
                                    boxShadow: isHovered ? `0 12px 30px ${odd.color}55` : '0 2px 8px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
                                    zIndex: isHovered ? 10 : 1,
                                }}
                            >
                                <span style={{
                                    color: 'white',
                                    fontSize: '1.4rem',
                                    fontWeight: 800,
                                    lineHeight: 1,
                                    fontFamily: 'var(--font-heading)',
                                }}>
                                    {odd.id}
                                </span>

                                {/* TOOLTIP */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.92, x: "-50%" }}
                                            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                            exit={{ opacity: 0, y: 8, scale: 0.92, x: "-50%" }}
                                            transition={{ duration: 0.18 }}
                                            style={{
                                                position: 'absolute',
                                                bottom: 'calc(100% + 10px)',
                                                left: '50%',
                                                background: 'white',
                                                border: `2px solid ${odd.color}`,
                                                borderRadius: '8px',
                                                padding: '8px 14px',
                                                whiteSpace: 'nowrap',
                                                pointerEvents: 'none',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                zIndex: 100,
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '0.78rem',
                                                fontWeight: 700,
                                                color: odd.color,
                                                fontFamily: 'var(--font-body)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>
                                                ODD {odd.id} — {label}
                                            </span>
                                            {/* Arrow */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-7px',
                                                left: '50%',
                                                transform: 'translateX(-50%) rotate(45deg)',
                                                width: '12px',
                                                height: '12px',
                                                background: 'white',
                                                borderBottom: `2px solid ${odd.color}`,
                                                borderRight: `2px solid ${odd.color}`,
                                            }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* BOTTOM TAG */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '50px',
                        fontSize: '0.82rem',
                        color: '#A0AEC0',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-body)',
                    }}
                >
                    {isFr
                        ? 'Agenda 2030 · Nations Unies · KEDGE Business School'
                        : 'Agenda 2030 · United Nations · KEDGE Business School'}
                </motion.p>

            </div>
        </section>
    );
};

export default SDGSection;
