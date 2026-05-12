import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntranceAnimation: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrolling while animation is active
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
            // Optional: Set a flag in sessionStorage to show only once per session
            // sessionStorage.setItem('hasSeenIntro', 'true');
        }, 3500); // 3.5 seconds duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', // Soft white/grey
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                fontSize: '4rem',
                                fontFamily: "'Playfair Display', serif", // Assuming this font is available or similar serif
                                background: 'linear-gradient(45deg, #D4AF37, #C5A028)', // Gold Gradient
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                letterSpacing: '-1px'
                            }}
                        >
                            SimONU
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            style={{
                                color: '#666',
                                marginTop: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                fontSize: '0.9rem'
                            }}
                        >
                            Marseille
                        </motion.p>
                    </motion.div>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100px' }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        style={{
                            height: '2px',
                            background: '#D4AF37',
                            marginTop: '20px'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EntranceAnimation;
