import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Partner {
    name: string;
    logo: string;
    url: string;
    domain?: string;
}

const PARTNERS: Partner[] = [
    { name: 'UNRIC',                       logo: '/partners/unric.png',                                                                       url: 'https://unric.org/fr/', domain: 'unric.org' },
    { name: 'FDNU',                        logo: '/partners/fdnu.png',                                                                        url: 'https://www.fdnu.fr', domain: 'fdnu.org' },
    { name: "Diplo'PACA",                  logo: '/partners/diplo.png',                                                                       url: 'https://www.instagram.com/diplopaca/' },
    { name: 'Jane Goodall Institute',      logo: '/partners/jane.png',                                                                        url: 'https://janegoodall.fr', domain: 'janegoodall.org' },
    { name: 'Unis-Terre',                  logo: '/partners/unisterre.png',                                                                   url: 'https://unis-terre.com' },
    { name: 'AFNU',                        logo: '/partners/afnu.png',                                                                        url: 'https://www.afnu.fr', domain: 'afnu.fr' },
    { name: 'Monde des Grandes Écoles',    logo: '/partners/mge.png',                                                                         url: 'https://www.mondedesgrandesecoles.fr', domain: 'mondedesgrandesecoles.fr' },
    { name: 'Phoenix Égalité des Chances', logo: '/partners/phoenix.png',                                                                     url: 'https://www.phoenix-egalite-des-chances.com' },
    { name: 'Lycée La Nativité',           logo: '/partners/nativite.png',                                                                    url: 'https://www.la-nativite.fr' },
    { name: 'KEDGE Business School',       logo: 'https://upload.wikimedia.org/wikipedia/fr/5/52/KEDGE_Business_School_%28logo%29.png',       url: 'https://kedge.edu', domain: 'kedge.edu' },
    { name: 'Air France',                  logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg',                   url: 'https://wwws.airfrance.fr', domain: 'airfrance.com' },
    { name: 'Rotary International',        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Rotary_International_logo.svg',         url: 'https://www.rotary.org/fr', domain: 'rotary.org' },
];

/**
 * Logo avec fallback Clearbit / icon.horse puis texte si l'image ne charge pas.
 * Hauteur fixe + object-contain = taille homogène garantie.
 */
const PartnerLogo: React.FC<{ partner: Partner; onLinkClick?: (e: React.MouseEvent) => void }> = ({ partner, onLinkClick }) => {
    const [failed, setFailed] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center justify-center shrink-0 px-10"
            draggable={false}
            style={{ height: '64px', textDecoration: 'none', userSelect: 'none' }}
        >
            {failed ? (
                <span
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        color: hovered ? '#094067' : '#94A3B8',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.3s ease',
                    }}
                >
                    {partner.name}
                </span>
            ) : (
                <img
                    src={partner.logo}
                    alt={partner.name}
                    draggable={false}
                    onError={(e) => {
                        if (partner.domain && !e.currentTarget.src.includes('icon.horse')) {
                            e.currentTarget.src = `https://icon.horse/icon/${partner.domain}`;
                        } else {
                            setFailed(true);
                        }
                    }}
                    style={{
                        height: '48px',
                        width: '120px',
                        objectFit: 'contain',
                        filter: hovered
                            ? 'grayscale(0%) opacity(1)'
                            : 'grayscale(100%) opacity(0.5)',
                        transition: 'filter 0.3s ease, transform 0.3s ease',
                        transform: hovered ? 'scale(1.06)' : 'scale(1)',
                        display: 'block',
                        userSelect: 'none',
                    }}
                />
            )}
        </a>
    );
};

const PartnerMarquee: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMouseDragging, setIsMouseDragging] = useState(false);
    const [isTouching, setIsTouching] = useState(false);
    const [isTouchPaused, setIsTouchPaused] = useState(false);

    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const hasDraggedRef = useRef(false);
    const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const isPaused = isHovered || isMouseDragging || isTouching || isTouchPaused;

    // Normalisation des limites pour un défilement infini sans coupure
    const normalizeScroll = useCallback(() => {
        if (!trackRef.current) return;
        const singleSetWidth = trackRef.current.scrollWidth / 4;
        if (singleSetWidth <= 0) return;

        if (trackRef.current.scrollLeft >= singleSetWidth * 2) {
            trackRef.current.scrollLeft -= singleSetWidth;
        } else if (trackRef.current.scrollLeft <= 10) {
            trackRef.current.scrollLeft += singleSetWidth;
        }
    }, []);

    // Définir la position initiale au début du deuxième set (Set B)
    useEffect(() => {
        if (trackRef.current) {
            const singleSetWidth = trackRef.current.scrollWidth / 4;
            if (singleSetWidth > 0 && trackRef.current.scrollLeft === 0) {
                trackRef.current.scrollLeft = singleSetWidth;
            }
        }
    }, []);

    // Boucle d'auto-scroll
    useEffect(() => {
        let animationFrameId: number;
        
        const scroll = () => {
            if (trackRef.current && !isPaused) {
                trackRef.current.scrollLeft += 0.8;
                normalizeScroll();
            }
            animationFrameId = requestAnimationFrame(scroll);
        };
        
        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, normalizeScroll]);

    // Gestionnaires d'événements Tactiles (Mobile)
    const handleTouchStart = () => {
        setIsTouching(true);
        if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
        if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
        setIsTouchPaused(true);
        // Reprend l'auto-scroll après la fin de l'inertie de glissement mobile
        touchTimerRef.current = setTimeout(() => {
            setIsTouchPaused(false);
        }, 1200);
    };

    // Gestionnaires de Drag à la souris (Desktop)
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        setIsMouseDragging(true);
        hasDraggedRef.current = false;
        if (trackRef.current) {
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setStartScrollLeft(trackRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsMouseDragging(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseUp = () => {
        setIsMouseDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDragging || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        
        if (Math.abs(walk) > 5) {
            hasDraggedRef.current = true;
        }

        const newScrollLeft = startScrollLeft - walk;
        trackRef.current.scrollLeft = newScrollLeft;
        normalizeScroll();
    };

    const handleScroll = () => {
        normalizeScroll();
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        if (hasDraggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
            hasDraggedRef.current = false;
        }
    };

    return (
        <section className="relative w-full overflow-hidden py-20">
            <div
                className="pointer-events-none absolute top-0 left-0 z-10 h-full w-28"
                style={{ background: 'linear-gradient(to right, white 0%, transparent 100%)' }}
            />
            <div
                className="pointer-events-none absolute top-0 right-0 z-10 h-full w-28"
                style={{ background: 'linear-gradient(to left, white 0%, transparent 100%)' }}
            />

            <div
                ref={trackRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onScroll={handleScroll}
                className="flex"
                style={{
                    width: '100%',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-x',
                    cursor: isMouseDragging ? 'grabbing' : 'grab',
                }}
            >
                <div className="flex w-max" style={{ pointerEvents: isMouseDragging ? 'none' : 'auto' }}>
                    {/* 4 jeux de logos pour assurer un défilement infini fluide dans les deux directions */}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`a-${i}`} partner={p} onLinkClick={handleLinkClick} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`b-${i}`} partner={p} onLinkClick={handleLinkClick} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`c-${i}`} partner={p} onLinkClick={handleLinkClick} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`d-${i}`} partner={p} onLinkClick={handleLinkClick} />)}
                </div>
            </div>
            
            <style>{`
                .flex::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default PartnerMarquee;

