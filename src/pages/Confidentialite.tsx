import React from 'react';
import { motion } from 'framer-motion';

const Confidentialite: React.FC = () => {
    return (
        <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: '#f9fbfd' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '60px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#094067', marginBottom: '40px', borderBottom: '2px solid #D4AF37', paddingBottom: '20px', display: 'inline-block' }}>
                        Politique de Confidentialité
                    </h1>

                    <div style={{ color: '#444', lineHeight: 1.8, fontSize: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>1. Collecte des données personnelles</h2>
                        <p>L'association SimONU Marseille s'engage à ce que la collecte et le traitement de vos données, effectués à partir de notre plateforme, soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
                        <p>Nous collectons les données suivantes : nom, prénom, adresse e-mail, ainsi que les informations nécessaires aux candidatures (CV, cursus) lorsque vous utilisez nos formulaires de contact ou de recrutement.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>2. Utilisation des données</h2>
                        <p>Les données personnelles recueillies sont utilisées uniquement dans le cadre explicite pour lequel elles ont été soumises :</p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                            <li style={{ marginBottom: '8px' }}>Gestion des candidatures et du recrutement.</li>
                            <li style={{ marginBottom: '8px' }}>Réponses à vos questions ou requêtes diplomatiques.</li>
                            <li style={{ marginBottom: '8px' }}>Établissement de partenariats.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>3. Conservation et Sécurité</h2>
                        <p>Vos données sont conservées pour la durée stricte nécessaire au traitement de votre requête (généralement pendant l'année universitaire en cours). Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour empêcher l'accès non autorisé, l'altération ou la destruction de vos données personnelles.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>4. Vos droits</h2>
                        <p>Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles. Vous pouvez exercer ce droit en nous contactant via notre page de contact.</p>

                        <h2 style={{ fontSize: '1.2rem', color: '#094067', marginTop: '30px', marginBottom: '15px' }}>5. Cookies</h2>
                        <p>Ce site utilise des cookies techniques strictement nécessaires à son bon fonctionnement ainsi que des outils d'analyse d'audience anonymisés pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour bloquer ces cookies à tout moment.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Confidentialite;
