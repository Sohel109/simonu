import React, { useRef, useState } from 'react';

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
 * Logo avec fallback Clearbit puis texte si l'image ne charge pas.
 * Hauteur fixe + object-contain = taille homogène garantie.
 */
const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
    const [failed, setFailed] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
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
    const [paused, setPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    // Auto-scroll loop
    useEffect(() => {
        let animationFrameId: number;
        
        const scroll = () => {
            if (trackRef.current && !paused && !isDragging) {
                trackRef.current.scrollLeft += 1;
                
                // The content is duplicated 4 times, resetting at 1/4th (one full set) width is seamless
                const singleSetWidth = trackRef.current.scrollWidth / 4;
                if (trackRef.current.scrollLeft >= singleSetWidth) {
                    trackRef.current.scrollLeft -= singleSetWidth;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };
        
        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [paused, isDragging]);

    // Mouse Dragging (Desktop)
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (trackRef.current) {
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setStartScrollLeft(trackRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setPaused(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault(); // prevent text selection
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        
        let newScrollLeft = startScrollLeft - walk;
        const singleSetWidth = trackRef.current.scrollWidth / 4;

        if (newScrollLeft >= singleSetWidth * 2) {
            newScrollLeft -= singleSetWidth;
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setStartScrollLeft(newScrollLeft);
        } else if (newScrollLeft <= 0) {
            newScrollLeft += singleSetWidth;
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setStartScrollLeft(newScrollLeft);
        }
        
        trackRef.current.scrollLeft = newScrollLeft;
    };

    // Native touch scrolling loop handler (Mobile)
    const handleScroll = () => {
        if (!trackRef.current || isDragging) return;
        const singleSetWidth = trackRef.current.scrollWidth / 4;
        
        if (trackRef.current.scrollLeft >= singleSetWidth * 2) {
            trackRef.current.scrollLeft -= singleSetWidth;
        } else if (trackRef.current.scrollLeft <= 0) {
            trackRef.current.scrollLeft += singleSetWidth;
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
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={handleScroll}
                className="flex"
                style={{
                    width: '100%',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                <div className="flex w-max" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
                    {/* 4 sets to ensure smooth seamless looping in both directions during drag */}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`a-${i}`} partner={p} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`b-${i}`} partner={p} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`c-${i}`} partner={p} />)}
                    {PARTNERS.map((p, i) => <PartnerLogo key={`d-${i}`} partner={p} />)}
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
