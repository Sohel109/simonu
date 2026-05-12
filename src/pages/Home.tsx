import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GlobeHero from '../components/GlobeHero';
import TimezoneClock from '../components/TimezoneClock';
import ODDStrip from '../components/ODDStrip';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

// COMPOSANT COMPTEUR
const Counter = ({ target, label, suffix = '', startValue = 0 }: { target: number; label: string; suffix?: string; startValue?: number }) => {
    const [count, setCount] = useState(startValue);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = startValue;
            const duration = 2000;
            const steps = target - startValue;

            if (steps <= 0) {
                setCount(target);
                return;
            }

            const stepTime = Math.max(1, Math.abs(Math.floor(duration / steps)));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, target, startValue]);

    return (
        <div ref={nodeRef}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', fontWeight: 400, color: 'white', lineHeight: 1, marginBottom: '16px' }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-body)' }}>
                {label}
            </div>
        </div>
    );
};

const PARTNERS = [
    { name: 'KEDGE BS', domain: 'kedge.edu', localLogo: '/partners/kedge.png' },
    { name: 'AIR FRANCE', domain: 'airfrance.com', localLogo: '/partners/airfrance.png' },
    { name: 'ROTARY', domain: 'rotary.org', localLogo: '/partners/rotary.png' },
    { name: 'UNRIC', domain: 'unric.org', localLogo: '/partners/unric.png' },
    { name: 'FDNU', domain: 'fdnu.org', localLogo: '/partners/fdnu.png' },
    { name: 'Diplo\'PACA', domain: '', localLogo: '/partners/diplo.png' },
    { name: 'Jane Goodall Institute', domain: 'janegoodall.org', localLogo: '/partners/jane.png' },
    { name: 'Unis-Terre', domain: '', localLogo: '/partners/unisterre.png' },
    { name: 'AFNU', domain: 'afnu.fr', localLogo: '/partners/afnu.png' },
    { name: 'Monde des Grandes Ecoles', domain: 'mondedesgrandesecoles.fr', localLogo: '/partners/mge.png' },
    { name: 'Phoenix Egalité des Chances', domain: '', localLogo: '/partners/phoenix.png' },
    { name: 'Lycée La Nativité', domain: '', localLogo: '/partners/nativite.png' }
];

const PartnerCarousel = () => {
    const [index, setIndex] = useState(0);

    const nextPartner = () => {
        setIndex((prevIndex) => (prevIndex + 1) % PARTNERS.length);
    };

    const prevPartner = () => {
        setIndex((prevIndex) => (prevIndex - 1 + PARTNERS.length) % PARTNERS.length);
    };

    const currentPartner = PARTNERS[index];

    return (
        <div style={{
            position: 'relative',
            height: '140px',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            border: '1px solid rgba(20, 33, 61, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            overflow: 'hidden'
        }}>
            
            {/* Arrows */}
            <button 
                onClick={prevPartner}
                style={{
                    position: 'absolute',
                    left: '10px',
                    zIndex: 20,
                    background: 'rgba(244, 247, 246, 0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#14213D',
                    transition: 'background 0.2s'
                }}
            >
                <ChevronLeft size={24} />
            </button>

            <button 
                onClick={nextPartner}
                style={{
                    position: 'absolute',
                    right: '10px',
                    zIndex: 20,
                    background: 'rgba(244, 247, 246, 0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#14213D',
                    transition: 'background 0.2s'
                }}
            >
                <ChevronRight size={24} />
            </button>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 60px' // Avoid text going under arrows
                    }}
                >
                    {/* Background Logo Container */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 0,
                        opacity: 1, // Opacité maximale demandée
                        pointerEvents: 'none',
                        padding: '10px' // Petite marge pour ne pas coller aux bords
                    }}>
                        {currentPartner.localLogo ? (
                            <>
                                <img 
                                    src={currentPartner.localLogo} 
                                    alt={`${currentPartner.name} logo`}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Contain pour voir le logo en entier
                                    onError={(e) => {
                                        if (currentPartner.domain && !e.currentTarget.src.includes('clearbit')) {
                                            e.currentTarget.src = `https://logo.clearbit.com/${currentPartner.domain}`;
                                        } else {
                                            e.currentTarget.style.display = 'none';
                                            if (e.currentTarget.nextElementSibling) {
                                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                                            }
                                        }
                                    }}
                                />
                                <Building2 
                                    size={100} 
                                    style={{ display: 'none', color: '#14213D', opacity: 0.2 }} 
                                />
                            </>
                        ) : (
                            <Building2 size={100} style={{ color: '#14213D', opacity: 0.2 }} />
                        )}
                    </div>

                    {/* Foreground Text */}
                    <span style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: '#14213D',
                        fontFamily: 'var(--font-heading)',
                        cursor: 'default',
                        textAlign: 'center',
                        zIndex: 1,
                        background: 'rgba(255, 255, 255, 0.85)',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        // On pourrait le masquer si le logo est 100% opaque, 
                        // mais on le garde pour être sûr qu'on lit bien le nom
                    }}>
                        {currentPartner.name}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Home: React.FC = () => {
    const { t } = useTranslation();
    const heroRef = useRef(null);

    return (
        <div style={{ position: 'relative' }}>

            {/* HEROS SECTION - GLOBE ANIMATION */}
            <div ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                {/* ANIMATED BACKGROUND & MAP */}
                <GlobeHero />

                {/* GLOBAL CLOCK (Fixed Top Left) */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <div style={{ pointerEvents: 'auto' }}>
                        <TimezoneClock />
                    </div>
                </div>

                {/* CONTENT (Buttons + SDGs) */}
                <motion.div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        maxWidth: '1000px',
                        padding: '0 40px',
                        marginTop: '55vh' // Increased from 45vh to push buttons lower as requested
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {/* BUTTONS */}
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
                        <Link to="/association" style={{
                            padding: '16px 40px',
                            background: '#094067',
                            color: 'white',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            borderRadius: '0px',
                            border: '1px solid #094067',
                            boxShadow: '0 4px 12px rgba(9, 64, 103, 0.2)'
                        }}>
                            {t('discover')}
                        </Link>

                        <Link to="/contact" style={{
                            padding: '16px 40px',
                            background: 'white',
                            border: '1px solid #094067',
                            color: '#094067',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            borderRadius: '0px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            {t('contact')}
                        </Link>
                    </div>

                    {/* ODD STRIP (Below Buttons) */}
                    <ODDStrip />

                </motion.div>
            </div>

            {/* SECTIONS CONTENU */}

            {/* 1. MISSION */}
            <section style={{ padding: '160px 0', background: 'white' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
                            {t('vision_title')}
                        </p>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', lineHeight: 1.4 }}>
                            {t('vision_text')}
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginTop: '100px' }}>
                        {[
                            {
                                title: t('feat_1_title'),
                                text: t('feat_1_text')
                            },
                            {
                                title: t('feat_2_title'),
                                text: t('feat_2_text')
                            },
                            {
                                title: t('feat_3_title'),
                                text: t('feat_3_text')
                            }
                        ].map((item, idx) => (
                            <div key={idx} style={{ padding: '0 20px' }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--royal-blue)', fontWeight: 600 }}>0{idx + 1}.</div>
                                <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#666' }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. STATISTIQUES - BLEU PROFOND */}
            <section style={{ padding: '140px 0', backgroundColor: 'var(--royal-blue)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', textAlign: 'center' }}>
                        {[
                            { val: 19, label: t('stat_years'), suffix: "+" },
                            { val: 250, label: t('stat_prepa'), suffix: "" },
                            { val: 10, label: t('stat_awards'), suffix: "+" },
                            { val: 5000, label: t('stat_students'), suffix: "", startValue: 4900 }
                        ].map((stat, i) => (
                            <Counter key={i} target={stat.val} label={stat.label} suffix={stat.suffix} startValue={stat.startValue} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PARTENAIRES */}
            <section style={{ padding: '120px 0', background: '#F8F9FA' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '60px' }}>
                        Partenaires Institutionnels
                    </p>
                    <PartnerCarousel />
                </div>
            </section>

        </div>
    );
};

export default Home;
