import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Contrôles fixes en bas à droite : Raccourci Géopo + Toggle Langue */
const FixedControls: React.FC<{ isMenuOpen?: boolean }> = ({ isMenuOpen = false }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);

        // Trigger Google Translate automatic translation for CMS content
        const gtSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (gtSelect) {
            gtSelect.value = newLang;
            gtSelect.dispatchEvent(new Event('change'));
        }
    };

    const handleGeopoClick = () => {
        if (location.pathname === '/simulations') {
            const el = document.getElementById('generateur');
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        } else {
            navigate('/simulations#generateur');
        }
    };

    const isEn = i18n.language === 'en';

    return (
        <div style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 9000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-end',
        }}>
            {/* RACCOURCI GÉOPOLITIQUE */}
            <motion.button
                onClick={handleGeopoClick}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={isEn ? 'Geopolitics Generator' : 'Générateur Géopolitique'}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    boxShadow: '0 8px 24px rgba(212,175,55,0.4)',
                    cursor: 'pointer',
                }}
            >
                <Globe size={20} />
            </motion.button>

            {/* TOGGLE LANGUE */}
            <AnimatePresence>
                {!isMenuOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                        onClick={toggleLanguage}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        title={isEn ? 'Passer en français' : 'Switch to English'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0',
                            background: 'white',
                            border: '1px solid rgba(9,64,103,0.18)',
                            borderRadius: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            padding: '0',
                            overflow: 'hidden',
                            fontFamily: 'var(--font-body)',
                        }}
                    >
                        <span style={{
                            padding: '10px 14px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: !isEn ? 'white' : '#718096',
                            background: !isEn ? '#094067' : 'transparent',
                            transition: 'all 0.25s ease',
                        }}>
                            <span translate="no">FR</span>
                        </span>
                        <span style={{
                            padding: '10px 14px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: isEn ? 'white' : '#718096',
                            background: isEn ? '#094067' : 'transparent',
                            transition: 'all 0.25s ease',
                        }}>
                            <span translate="no">EN</span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FixedControls;
