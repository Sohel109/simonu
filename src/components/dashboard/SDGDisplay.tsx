import React from 'react';
import { motion } from 'framer-motion';

const SDGDisplay: React.FC = () => {
    return (
        <section style={{ padding: '100px 0', background: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Sustainable Development Goals</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Monitoring progress towards the 2030 Agenda for Sustainable Development, with a specific focus on peace, justice, and partnerships.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* SDG 16 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        style={{ background: '#00558a', color: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 85, 138, 0.2)' }}
                    >
                        <div style={{ padding: '40px' }}>
                            <div style={{ fontSize: '4rem', fontWeight: 800, opacity: 0.3, lineHeight: 1 }}>16</div>
                            <h3 style={{ fontSize: '1.8rem', margin: '20px 0', color: 'white' }}>Peace, Justice & Strong Institutions</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
                                Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                    <span>Target Progress</span>
                                    <span>68%</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                                    <div style={{ width: '68%', height: '100%', background: 'white', borderRadius: '2px' }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SDG 17 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        style={{ background: '#19486a', color: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(25, 72, 106, 0.2)' }}
                    >
                        <div style={{ padding: '40px' }}>
                            <div style={{ fontSize: '4rem', fontWeight: 800, opacity: 0.3, lineHeight: 1 }}>17</div>
                            <h3 style={{ fontSize: '1.8rem', margin: '20px 0', color: 'white' }}>Partnerships for the Goals</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
                                Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                    <span>Global Cooperation Index</span>
                                    <span>74%</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                                    <div style={{ width: '74%', height: '100%', background: 'white', borderRadius: '2px' }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SDGDisplay;
