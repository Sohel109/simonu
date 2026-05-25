import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Globe, ChevronRight } from 'lucide-react';

interface GeopoFact {
    pays: string;
    anecdote: string;
    contexteMod: string;
    theme: string;
}

const facts: GeopoFact[] = [
    {
        pays: "France",
        theme: "Diplomatie",
        anecdote: "Saviez-vous que l'armée française a été la première à utiliser le camouflage en 1915 ? Cette invention est née de l'initiative d'artistes peintres et de décorateurs de théâtre mobilisés.",
        contexteMod: "La France dispose du deuxième réseau diplomatique mondial, juste après les États-Unis, avec plus de 160 ambassades et représentations dans le monde."
    },
    {
        pays: "Japon",
        theme: "Géopolitique",
        anecdote: "Le Japon possède la monarchie continue la plus ancienne au monde, remontant à 660 avant J.-C. selon la tradition impériale. L'Empereur y est considéré comme un symbole de l'État.",
        contexteMod: "Troisième économie mondiale, le Japon est un acteur majeur de la technologie, de la robotique et de l'innovation industrielle, tout en maintenant une politique de défense pacifiste inscrite dans sa Constitution."
    },
    {
        pays: "Brésil",
        theme: "Histoire & Pouvoir",
        anecdote: "Le Brésil est le seul pays des Amériques à avoir accueilli le siège d'une monarchie européenne : la cour portugaise s'y est réfugiée de 1808 à 1821 lors de l'invasion napoléonienne.",
        contexteMod: "Première économie d'Amérique du Sud et membre fondateur du BRICS, le Brésil joue un rôle central dans la diplomatie du Sud Global et la coopération climatique internationale."
    },
    {
        pays: "Égypte",
        theme: "Géoéconomie",
        anecdote: "La Grande Pyramide de Gizeh a été la plus haute structure artificielle du monde pendant plus de 3 800 ans, un record longtemps inégalé dans l'histoire de l'humanité.",
        contexteMod: "L'Égypte contrôle le Canal de Suez, verrou stratégique par lequel transitent environ 12 % du commerce mondial et 8 % du pétrole mondial, en faisant un acteur géopolitique incontournable."
    },
    {
        pays: "Turquie",
        theme: "Géopolitique",
        anecdote: "Istanbul est la seule métropole au monde à s'étendre sur deux continents : l'Europe et l'Asie. Cette position unique lui confère une identité culturelle singulière et un rôle de carrefour civilisationnel.",
        contexteMod: "Membre de l'OTAN depuis 1952, la Turquie joue un rôle pivot entre le monde occidental et le Proche-Orient. Elle est un médiateur clé dans les conflits régionaux et un partenaire économique majeur de l'Union Européenne."
    },
    {
        pays: "Inde",
        theme: "Émergence",
        anecdote: "L'Inde est la plus grande démocratie du monde avec près de 970 millions d'électeurs inscrits. Les élections générales indiennes mobilisent plus d'un milliard de personnes sur plusieurs semaines.",
        contexteMod: "Devenue la cinquième économie mondiale et premier pays par la population, l'Inde ambitionne un siège permanent au Conseil de Sécurité de l'ONU et joue un rôle croissant dans la recomposition des alliances géopolitiques mondiales."
    },
    {
        pays: "Congo (RDC)",
        theme: "Ressources & Conflits",
        anecdote: "La République Démocratique du Congo abrite l'une des plus grandes forêts tropicales du monde — le second « poumon vert » de la planète après l'Amazonie — et dispose des réserves minières les plus importantes au monde.",
        contexteMod: "La RDC concentre 70 % des réserves mondiales de coltan, minéral essentiel aux batteries des smartphones et voitures électriques. Ce « paradoxe de l'abondance » en fait l'épicentre de conflits géopolitiques liés à la transition énergétique."
    },
    {
        pays: "Islande",
        theme: "Gouvernance & Innovation",
        anecdote: "L'Islande a fondé l'Althing en 930 ap. J.-C., considéré comme le plus ancien parlement du monde toujours en activité. Ce modèle de démocratie délibérative continue d'inspirer les systèmes politiques contemporains.",
        contexteMod: "Premier pays au monde à élire une femme cheffe d'État en 1980, l'Islande est régulièrement classée en tête des indices mondiaux d'égalité des genres et de qualité de vie. Son modèle énergétique est quasiment 100 % renouvelable."
    },
];

/** Composant section — remplace la popup flottante */
const GeopoliticsGenerator: React.FC = () => {
    const [currentFact, setCurrentFact] = useState<GeopoFact | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [usedIndices, setUsedIndices] = useState<number[]>([]);

    const generateFact = () => {
        setIsGenerating(true);

        // Éviter de répéter les mêmes faits consécutivement
        let available = facts.map((_, i) => i).filter(i => !usedIndices.includes(i));
        if (available.length === 0) {
            available = facts.map((_, i) => i);
            setUsedIndices([]);
        }

        const randomIndex = available[Math.floor(Math.random() * available.length)];
        setUsedIndices(prev => [...prev, randomIndex]);

        setTimeout(() => {
            setCurrentFact(facts[randomIndex]);
            setIsGenerating(false);
        }, 300);
    };

    const themeColors: Record<string, string> = {
        'Diplomatie':         '#094067',
        'Géopolitique':       '#19486A',
        'Histoire & Pouvoir': '#A21942',
        'Géoéconomie':        '#3F7E44',
        'Émergence':          '#FD6925',
        'Ressources & Conflits': '#DD1367',
        'Gouvernance & Innovation': '#0A97D9',
    };

    return (
        <section style={{
            padding: '100px 0',
            background: 'linear-gradient(180deg, rgba(9,64,103,0.03) 0%, white 100%)',
        }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '56px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px', height: '48px',
                            background: 'linear-gradient(135deg, #094067 0%, #0a5c8c 100%)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Globe size={22} color="white" />
                        </div>
                        <div>
                            <p style={{
                                fontSize: '0.72rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2.5px',
                                color: '#D4AF37',
                                fontWeight: 700,
                                margin: 0,
                                fontFamily: 'var(--font-body)',
                            }}>
                                Outil pédagogique
                            </p>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.8rem',
                                color: '#094067',
                                fontWeight: 700,
                                margin: 0,
                                letterSpacing: '-0.3px',
                            }}>
                                Générateur Géopolitique
                            </h2>
                        </div>
                    </div>
                    <p style={{
                        color: '#718096',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        maxWidth: '600px',
                        fontFamily: 'var(--font-body)',
                    }}>
                        Découvrez une anecdote historique et son contexte moderne pour enrichir vos arguments en simulation. Chaque génération révèle un angle géopolitique inédit.
                    </p>
                </motion.div>

                {/* GENERATE BUTTON */}
                <motion.button
                    onClick={generateFact}
                    disabled={isGenerating}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 36px',
                        background: isGenerating
                            ? 'rgba(9,64,103,0.5)'
                            : 'linear-gradient(135deg, #094067 0%, #0a5c8c 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        cursor: isGenerating ? 'not-allowed' : 'pointer',
                        boxShadow: '0 8px 24px rgba(9,64,103,0.2)',
                        fontFamily: 'var(--font-body)',
                        marginBottom: '40px',
                        transition: 'background 0.3s ease',
                    }}
                >
                    <motion.div
                        animate={{ rotate: isGenerating ? 360 : 0 }}
                        transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0, ease: 'linear' }}
                    >
                        <Shuffle size={18} />
                    </motion.div>
                    {isGenerating ? 'Génération...' : 'Générer un fait géopolitique'}
                </motion.button>

                {/* RESULT CARD */}
                <AnimatePresence mode="wait">
                    {currentFact ? (
                        <motion.div
                            key={currentFact.pays}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            style={{
                                background: 'white',
                                border: '1px solid rgba(9,64,103,0.1)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(9,64,103,0.08)',
                            }}
                        >
                            {/* Card Header */}
                            <div style={{
                                padding: '24px 36px',
                                background: `linear-gradient(135deg, ${themeColors[currentFact.theme] || '#094067'} 0%, ${themeColors[currentFact.theme] || '#094067'}cc 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <h3 style={{
                                        color: 'white',
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.6rem',
                                        fontWeight: 700,
                                        margin: '0 0 6px',
                                    }}>
                                        {currentFact.pays}
                                    </h3>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        background: 'rgba(255,255,255,0.2)',
                                        borderRadius: '20px',
                                        color: 'rgba(255,255,255,0.9)',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }}>
                                        {currentFact.theme}
                                    </span>
                                </div>
                                <Globe size={48} color="rgba(255,255,255,0.15)" />
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '36px' }}>
                                {/* Anecdote */}
                                <div style={{ marginBottom: '28px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '14px',
                                    }}>
                                        <div style={{
                                            width: '28px', height: '28px',
                                            background: 'rgba(212,175,55,0.15)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.9rem',
                                        }}>
                                            💡
                                        </div>
                                        <span style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            color: '#D4AF37',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
                                            fontFamily: 'var(--font-body)',
                                        }}>
                                            Le saviez-vous ?
                                        </span>
                                    </div>
                                    <p style={{
                                        fontSize: '1rem',
                                        lineHeight: 1.75,
                                        color: '#333',
                                        margin: 0,
                                        fontStyle: 'italic',
                                        fontFamily: 'var(--font-body)',
                                    }}>
                                        {currentFact.anecdote}
                                    </p>
                                </div>

                                {/* Separator */}
                                <div style={{
                                    height: '1px',
                                    background: 'linear-gradient(90deg, rgba(9,64,103,0.15) 0%, transparent 100%)',
                                    marginBottom: '28px',
                                }} />

                                {/* Contexte moderne */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '14px',
                                    }}>
                                        <div style={{
                                            width: '28px', height: '28px',
                                            background: 'rgba(9,64,103,0.1)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <ChevronRight size={14} color="#094067" />
                                        </div>
                                        <span style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            color: '#094067',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
                                            fontFamily: 'var(--font-body)',
                                        }}>
                                            Contexte actuel
                                        </span>
                                    </div>
                                    <p style={{
                                        fontSize: '1rem',
                                        lineHeight: 1.75,
                                        color: '#444',
                                        margin: 0,
                                        fontFamily: 'var(--font-body)',
                                    }}>
                                        {currentFact.contexteMod}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                padding: '60px',
                                border: '2px dashed rgba(9,64,103,0.15)',
                                borderRadius: '4px',
                                textAlign: 'center',
                                color: '#A0AEC0',
                                fontFamily: 'var(--font-body)',
                            }}
                        >
                            <Globe size={40} style={{ marginBottom: '16px', opacity: 0.3 }} />
                            <p style={{ margin: 0, fontSize: '1rem' }}>
                                Cliquez sur "Générer" pour découvrir une anecdote géopolitique.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default GeopoliticsGenerator;
