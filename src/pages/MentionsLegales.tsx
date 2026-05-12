import React from 'react';
import { motion } from 'framer-motion';

const MentionsLegales: React.FC = () => {
    return (
        <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: '#f9fbfd' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '60px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#094067', marginBottom: '40px', borderBottom: '2px solid #D4AF37', paddingBottom: '20px', display: 'inline-block' }}>
                        Mentions Légales
                    </h1>

                    <div style={{ color: '#444', lineHeight: 1.8, fontSize: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>1. Éditeur du site</h2>
                        <p>Le site SimONU Marseille est édité par l'association étudiante <strong>SimONU</strong> (KEDGE Business School).</p>
                        <p>Adresse : Domaine de Luminy, Rue Antoine Bourdelle, 13009 Marseille, France.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>2. Hébergement</h2>
                        <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>3. Propriété Intellectuelle</h2>
                        <p>L'ensemble du contenu (textes, images, vidéos, logos, design) présent sur ce site est la propriété exclusive de l'association SimONU Marseille, sauf mention contraire. Toute reproduction, distribution ou modification, même partielle, est formellement interdite sans l'autorisation écrite expresse de l'association.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>4. Responsabilité</h2>
                        <p>L'association SimONU Marseille s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne saurait garantir que celles-ci sont exemptes d'erreurs ou toujours à jour. L'utilisation des informations présentes sur le site se fait sous la seule responsabilité de l'utilisateur.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>5. Contact</h2>
                        <p>Pour toute question relative à ces mentions légales, vous pouvez nous contacter via la page Contact de notre plateforme.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MentionsLegales;
