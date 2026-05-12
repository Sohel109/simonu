import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Globe, Users, HeartHandshake, AlertTriangle } from 'lucide-react';

const newsItems = [
    {
        category: 'UNITED NATIONS',
        title: '79th General Assembly focuses on sustainable development goals acceleration.',
        source: 'UN News service',
        time: '12m ago',
        icon: <Globe size={18} color="#009EDB" />
    },
    {
        category: 'INTL JUSTICE',
        title: 'ICJ delivers advisory opinion on climate change obligations.',
        source: 'The Hague Registry',
        time: '45m ago',
        icon: <Scale size={18} color="#009EDB" />
    },
    {
        category: 'PEACE & SECURITY',
        title: 'Security Council adopts resolution 2720 on expanding humanitarian aid.',
        source: 'UNSC Press',
        time: '2h ago',
        icon: <AlertTriangle size={18} color="#FF6347" />
    },
    {
        category: 'HUMAN RIGHTS',
        title: 'High Commissioner outlines new framework for digital rights protection.',
        source: 'OHCHR Geneva',
        time: '3h ago',
        icon: <Users size={18} color="#009EDB" />
    },
    {
        category: 'DIPLOMACY',
        title: 'Multilateral summit concludes with historic pact on future cooperation.',
        source: 'Diplomatic Wire',
        time: '4h ago',
        icon: <HeartHandshake size={18} color="#009EDB" />
    }
];

const NewsGrid: React.FC = () => {
    return (
        <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
            <div className="container">
                <div className="section-title">
                    <h2 style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>Global Briefing</h2>
                    <div className="line" />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px',
                    marginTop: '40px'
                }}>
                    {newsItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="clean-card"
                            style={{
                                padding: '32px',
                                borderLeft: '4px solid #009EDB',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#009EDB',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {item.category}
                                </div>
                                {item.icon}
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px', lineHeight: 1.5 }}>
                                {item.title}
                            </h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                                <span>{item.source}</span>
                                <span style={{ fontFamily: 'var(--font-mono)' }}>{item.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
