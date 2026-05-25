import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const AddToHomeScreenIOS: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Detect iOS (iPhone, iPad, iPod)
        const isIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent) || 
                   (userAgent.includes('mac') && navigator.maxTouchPoints > 1);
        };

        // Detect if already installed/opened in standalone mode
        const isStandalone = () => {
            return ('standalone' in window.navigator && (window.navigator as any).standalone) || 
                   window.matchMedia('(display-mode: standalone)').matches;
        };

        const dismissed = localStorage.getItem('pwa-ios-prompt-dismissed') === 'true';

        if (isIOS() && !isStandalone() && !dismissed) {
            // Show after a delay of 3 seconds so it's less intrusive
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('pwa-ios-prompt-dismissed', 'true');
    };

    // Custom Share Icon SVG (matching Safari iOS native Share button)
    const ShareIcon = () => (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 122, 255, 0.1)',
            padding: '4px',
            borderRadius: '6px',
            margin: '0 4px',
            verticalAlign: 'middle',
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="9" width="14" height="12" rx="2" />
                <path d="M12 2v12M8 6l4-4 4 4" />
            </svg>
        </span>
    );

    // Custom Plus Square Icon SVG (matching Safari iOS "Add to Home Screen" action icon)
    const PlusSquareIcon = () => (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            padding: '4px',
            borderRadius: '6px',
            margin: '0 4px',
            verticalAlign: 'middle',
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        </span>
    );

    // Helper to inject beautiful icons into translation strings
    const renderText = (text: string) => {
        let parts: React.ReactNode[] = [text];

        // Replace [share_icon]
        if (text.includes('[share_icon]')) {
            const split = text.split('[share_icon]');
            parts = [split[0], <ShareIcon key="share" />, split[1]];
        }

        // Replace [plus_icon]
        const newParts: React.ReactNode[] = [];
        parts.forEach((part) => {
            if (typeof part === 'string' && part.includes('[plus_icon]')) {
                const split = part.split('[plus_icon]');
                newParts.push(split[0]);
                newParts.push(<PlusSquareIcon key="plus" />);
                newParts.push(split[1]);
            } else {
                newParts.push(part);
            }
        });

        return <>{newParts.length > 0 ? newParts : parts}</>;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '120%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        left: '16px',
                        right: '16px',
                        zIndex: 99999, // Super high z-index to overlay everything
                        maxWidth: '420px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '20px',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        color: '#1c1c1e',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Decorative App Icon */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #094067 0%, #007AFF 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(9, 64, 103, 0.25)',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                letterSpacing: '0.5px'
                            }}>
                                S
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#094067' }}>
                                    {t('pwa_ios_title')}
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#8e8e93', marginTop: '2px' }}>
                                    simonu-marseille.fr
                                </p>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            style={{
                                background: 'rgba(0, 0, 0, 0.05)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#8e8e93',
                                padding: 0,
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Description / Subtitle */}
                    <p style={{ margin: '0 0 16px 0', fontSize: '0.86rem', lineHeight: '1.4', color: '#3a3a3c', fontWeight: 500 }}>
                        {t('pwa_ios_subtitle')}
                    </p>

                    {/* Step list */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        marginBottom: '16px',
                        border: '1px solid rgba(0, 0, 0, 0.03)'
                    }}>
                        <div style={{ fontSize: '0.84rem', lineHeight: '1.5', color: '#1c1c1e', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            {renderText(t('pwa_ios_step1'))}
                        </div>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(0, 0, 0, 0.05)' }}></div>
                        <div style={{ fontSize: '0.84rem', lineHeight: '1.5', color: '#1c1c1e', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            {renderText(t('pwa_ios_step2'))}
                        </div>
                    </div>

                    {/* Footer Hint & Dismiss Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#8e8e93', lineHeight: '1.3', flex: 1, paddingRight: '8px' }}>
                            {t('pwa_ios_hint')}
                        </span>
                        <button
                            onClick={handleDismiss}
                            style={{
                                background: '#007AFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                boxShadow: '0 4px 10px rgba(0, 122, 255, 0.3)',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            {t('pwa_ios_close')}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddToHomeScreenIOS;
