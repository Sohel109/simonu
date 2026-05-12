import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface GeopoFact {
    country: string;
    anecdote: string;
    modern: string;
}

const facts: GeopoFact[] = [
    {
        country: "France",
        anecdote: "Did you know that the French Army was the first to use camouflage in 1915? It was created by painters and theater set designers.",
        modern: "France maintains the second-largest diplomatic network in the world, just after the United States."
    },
    {
        country: "Japan",
        anecdote: "Japan has the oldest continuous monarchy in the world, dating back to 660 BC according to legend.",
        modern: "Today, Japan is the world's third-largest economy and a leader in technology and robotics."
    },
    {
        country: "Brazil",
        anecdote: "Brazil was the only country in the Americas to serve as the seat of a European monarchy (Portugal) from 1808 to 1821.",
        modern: "It is the largest economy in South America and a key member of the BRICS group."
    },
    {
        country: "Egypt",
        anecdote: "The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years.",
        modern: "Egypt controls the Suez Canal, a critical chokepoint for global trade and energy shipments."
    },
    {
        country: "Turkey",
        anecdote: "Istanbul is the only city in the world located on two continents: Europe and Asia.",
        modern: "Turkey plays a crucial geopolitical role as a bridge between East and West and a NATO member."
    }
];

interface GeopoliticsGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
}

const GeopoliticsGenerator: React.FC<GeopoliticsGeneratorProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [currentFact, setCurrentFact] = useState<GeopoFact | null>(null);

    const generateFact = () => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        setCurrentFact(facts[randomIndex]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 10001
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '500px',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '32px',
                            zIndex: 10002,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <h2 style={{
                            marginTop: 0,
                            color: '#1a1a1a',
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '2rem'
                        }}>
                            {t('geopo_title')}
                        </h2>

                        <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {currentFact ? (
                                <motion.div
                                    key={currentFact.country}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h3 style={{ color: '#D4AF37', margin: '0 0 10px 0' }}>{currentFact.country}</h3>
                                    <p style={{ fontStyle: 'italic', marginBottom: '16px', color: '#555' }}>
                                        <strong>{t('did_you_know')}</strong> {currentFact.anecdote}
                                    </p>
                                    <div style={{ height: '1px', background: '#eee', margin: '16px 0' }} />
                                    <p style={{ color: '#333' }}>
                                        <strong>{t('modern_context')}:</strong> {currentFact.modern}
                                    </p>
                                </motion.div>
                            ) : (
                                <p style={{ textAlign: 'center', color: '#888' }}>
                                    Click generate to discover a random geopolitical fact!
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button
                                onClick={generateFact}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    background: '#094067', // Royal Blue-ish
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s'
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {t('generate_btn')}
                            </button>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '12px 24px',
                                    background: '#f1f1f1',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                {t('close')}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GeopoliticsGenerator;
