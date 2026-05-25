import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Play, Instagram, FileText, X } from 'lucide-react';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const Actualites: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    useEffect(() => {
        // Query to fetch all articles along with their resolved video URL from Sanity
        client.fetch(`*[_type == "article"] | order(date desc) {
            _id,
            title,
            date,
            category,
            description,
            image,
            link,
            "videoUrl": videoFile.asset->url
        }`)
        .then(data => setArticles(data))
        .catch(console.error);
    }, []);

    // Category Badge Helper
    const renderBadge = (category: string) => {
        switch (category) {
            case 'instagram':
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(225, 48, 108, 0.1)',
                        color: '#E1306C',
                        border: '1px solid rgba(225, 48, 108, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <Instagram size={14} />
                        Instagram
                    </div>
                );
            case 'video':
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: '#D4AF37',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <Play size={14} fill="#D4AF37" />
                        Vidéo / Reel
                    </div>
                );
            default:
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(9, 64, 103, 0.1)',
                        color: '#094067',
                        border: '1px solid rgba(9, 64, 103, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <FileText size={14} />
                        Article
                    </div>
                );
        }
    };

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
                        Retrouvez toutes nos publications, analyses géopolitiques et suivez notre fil d'actualité en direct.
                    </p>
                </motion.div>

                {/* ARTICLES FROM SANITY */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#14213D', fontFamily: 'Playfair Display, serif', marginBottom: '30px', borderBottom: '2px solid #D4AF37', display: 'inline-block', paddingBottom: '10px' }}>
                        Dernières Publications
                    </h2>
                    
                    {articles.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic', background: 'white', padding: '30px', borderRadius: '8px', border: '1px dashed #ccc' }}>
                            Aucun article n'a encore été publié via le CMS. Rendez-vous dans l'interface d'administration pour créer votre premier article !
                        </p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                            {articles.map((article) => {
                                const isVideo = article.category === 'video' && article.videoUrl;
                                
                                return (
                                    <div key={article._id} style={{ height: '100%' }}>
                                        <a 
                                            href={isVideo ? undefined : (article.link || '#')} 
                                            target={isVideo ? undefined : (article.link ? "_blank" : "_self")}
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                            onClick={(e) => {
                                                if (isVideo) {
                                                    e.preventDefault();
                                                    setActiveVideo(article.videoUrl);
                                                }
                                            }}
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
                                                    flexDirection: 'column',
                                                    position: 'relative'
                                                }}
                                            >
                                                {/* Image / Thumbnail Container */}
                                                {article.image && (
                                                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                                                        <img 
                                                            src={urlFor(article.image).width(600).url()} 
                                                            alt={article.title} 
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                        />
                                                        {/* Play Button Overlay for Videos */}
                                                        {isVideo && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                background: 'rgba(20, 33, 61, 0.4)',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                transition: 'background 0.3s'
                                                            }}
                                                            className="play-overlay"
                                                            >
                                                                <div style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '50%',
                                                                    background: '#D4AF37',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                                                                }}>
                                                                    <Play size={22} fill="white" color="white" style={{ marginLeft: '4px' }} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    {/* Badge and Date Header */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                        {renderBadge(article.category)}
                                                        <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>
                                                            {article.date ? new Date(article.date).toLocaleDateString('fr-FR') : ''}
                                                        </div>
                                                    </div>

                                                    <h3 style={{ fontSize: '1.3rem', color: '#094067', marginBottom: '15px', fontFamily: 'Playfair Display, serif' }}>
                                                        {article.title}
                                                    </h3>
                                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                                                        {article.description}
                                                    </p>
                                                    <div style={{ marginTop: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#094067', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                        {isVideo ? 'Regarder la vidéo 🎥' : "Lire l'article →"}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

            {/* HIGH-END FULLSCREEN VIDEO PLAYER MODAL */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(20, 33, 61, 0.95)',
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'relative',
                                width: '90%',
                                maxWidth: '800px',
                                aspectRatio: '16/9',
                                background: 'black',
                                borderRadius: '16px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                overflow: 'hidden',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video 
                                src={activeVideo} 
                                controls 
                                autoPlay 
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                            
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveVideo(null)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Actualites;

