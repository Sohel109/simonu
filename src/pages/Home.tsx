import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GlobeHero from '../components/GlobeHero';
import TimezoneClock from '../components/TimezoneClock';
import SDGSection from '../components/SDGSection';
import PartnerMarquee from '../components/PartnerMarquee';

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
            <div className="notranslate" translate="no" style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', fontWeight: 400, color: 'white', lineHeight: 1, marginBottom: '16px' }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-body)' }}>
                {label}
            </div>
        </div>
    );
};


const Home: React.FC = () => {
    const { t, i18n } = useTranslation();
    const heroRef = useRef(null);

    return (
        <div style={{ position: 'relative' }}>

            {/* ── HERO SECTION ── */}
            <div
                ref={heroRef}
                style={{
                    position: 'relative',
                    // 100dvh = dynamic viewport height (excludes browser chrome on mobile)
                    // Falls back to 100vh on older browsers
                    height: '100dvh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                } as React.CSSProperties}
            >
                <GlobeHero />

                {/* GLOBAL CLOCK */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <div style={{ pointerEvents: 'auto' }}>
                        <TimezoneClock />
                    </div>
                </div>

                {/* CTA BUTTONS — ODD strip removed from here */}
                <motion.div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        maxWidth: '1000px',
                        padding: '0 40px',
                        marginTop: '55vh',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link
                            to="/association"
                            style={{
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
                                boxShadow: '0 4px 12px rgba(9, 64, 103, 0.2)',
                            }}
                        >
                            {t('discover')}
                        </Link>

                        <Link
                            to="/contact"
                            style={{
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
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            }}
                        >
                            {t('contact')}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* ── 1. MISSION ── */}
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
                            { title: t('feat_1_title'), text: t('feat_1_text') },
                            { title: t('feat_2_title'), text: t('feat_2_text') },
                            { title: t('feat_3_title'), text: t('feat_3_text') },
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

            {/* ── 2. STATISTIQUES ── */}
            <section style={{ padding: '140px 0', backgroundColor: 'var(--royal-blue)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', textAlign: 'center' }}>
                        {[
                            { val: 19,   label: t('stat_years'),   suffix: '+' },
                            { val: 250,  label: t('stat_prepa'),   suffix: '' },
                            { val: 10,   label: t('stat_awards'),  suffix: '+' },
                            { val: 5000, label: t('stat_students'),suffix: '', startValue: 4900 },
                        ].map((stat, i) => (
                            <Counter key={`${i}-${i18n.language}`} target={stat.val} label={stat.label} suffix={stat.suffix} startValue={stat.startValue} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. SDG SECTION (nouvelle, déplacée du Hero) ── */}
            <SDGSection />

            {/* ── 4. PARTENAIRES ── marquee défilant infini */}
            <section style={{ paddingTop: '80px', paddingBottom: '20px', background: 'white' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <p style={{
                        fontSize: '0.78rem',
                        color: '#A0AEC0',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginBottom: '14px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                    }}>
                        Partenaires Institutionnels
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        color: '#094067',
                        fontWeight: 700,
                        marginBottom: 0,
                    }}>
                        Ils nous font confiance
                    </h2>
                </motion.div>
                <PartnerMarquee />
            </section>

        </div>
    );
};

export default Home;
