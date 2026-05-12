import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const Actualites: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`*[_type == "article"] | order(date desc)`).then(data => setArticles(data)).catch(console.error);
        
        // Ajout dynamique du script Elfsight pour Instagram
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#f9fbfd', paddingTop: '140px', paddingBottom: '100px' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: '#094067', marginBottom: '16px' }}>
                        Actualités & Live Feed
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Retrouvez toutes nos publications, analyses géopolitiques et suivez notre fil d'actualité en direct via Instagram.
                    </p>
                </motion.div>

                {/* ARTICLES FROM SANITY */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#14213D', fontFamily: 'Playfair Display, serif', marginBottom: '30px', borderBottom: '2px solid #D4AF37', display: 'inline-block', paddingBottom: '10px' }}>
                        Dernières Publications
                    </h2>
                    
                    {articles.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic', background: 'white', padding: '30px', borderRadius: '8px', border: '1px dashed #ccc' }}>Aucun article n'a encore été publié via le CMS. Rendez-vous dans l'interface d'administration pour créer votre premier article !</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                            {articles.map((article) => (
                                <a 
                                    key={article._id} 
                                    href={article.link || '#'} 
                                    target={article.link ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        style={{ 
                                            background: 'white', 
                                            borderRadius: '12px', 
                                            overflow: 'hidden', 
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {article.image && (
                                            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                                                <img 
                                                    src={urlFor(article.image).width(600).url()} 
                                                    alt={article.title} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                />
                                            </div>
                                        )}
                                        <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase' }}>
                                                {article.date ? new Date(article.date).toLocaleDateString('fr-FR') : ''}
                                            </div>
                                            <h3 style={{ fontSize: '1.3rem', color: '#094067', marginBottom: '15px', fontFamily: 'Playfair Display, serif' }}>
                                                {article.title}
                                            </h3>
                                            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                                                {article.description}
                                            </p>
                                            <div style={{ marginTop: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#094067', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Lire l'article →
                                            </div>
                                        </div>
                                    </motion.div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* INSTAGRAM LIVE FEED */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem', color: '#14213D', fontFamily: 'Playfair Display, serif', margin: 0, borderBottom: '2px solid #D4AF37', display: 'inline-block', paddingBottom: '10px' }}>
                            Live Feed Instagram
                        </h2>
                    </div>
                    <div style={{ width: '100%', minHeight: '500px', display: 'flex', justifyContent: 'center', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        {/* Placeholder Widget Elfsight Instagram */}
                        <div className="elfsight-app-69ea966a-c31e-4eea-86b3-5ce8720e4662" data-elfsight-app-lazy style={{ width: '100%' }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Actualites;
