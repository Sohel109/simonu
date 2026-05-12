import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FixedControlsProps {
    onOpenGeopo: () => void;
}

const FixedControls: React.FC<FixedControlsProps> = ({ onOpenGeopo }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);

        // Trigger Google Translate automatic translation for the rest of the site (CMS content, etc.)
        const gtSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (gtSelect) {
            gtSelect.value = newLang;
            gtSelect.dispatchEvent(new Event('change'));
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column', // Stacked vertically
                            gap: '12px',
                            marginBottom: '12px'
                        }}
                    >
                        {/* Language Toggle */}
                        <motion.button
                            onClick={toggleLanguage}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: 'none',
                                background: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: '#333'
                            }}
                        >
                            {i18n.language === 'en' ? 'FR' : 'EN'}
                        </motion.button>

                        {/* Geopo Generator Button */}
                        <motion.button
                            onClick={() => {
                                onOpenGeopo();
                                setIsOpen(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: 'none',
                                background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)', // Gold
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}
                            title="Open Geopolitics Generator"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#094067', // Royal Blue
                    boxShadow: '0 8px 24px rgba(9, 64, 103, 0.25)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    zIndex: 9999
                }}
            >
                +
            </motion.button>
        </div>
    );
};

export default FixedControls;
