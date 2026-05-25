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
            style={{ height: '64px', textDecoration: 'none' }}
        >
            {failed ? (
                /* Fallback texte */
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
                    onError={(e) => {
                        if (partner.domain && !e.currentTarget.src.includes('icon.horse')) {
                            e.currentTarget.src = `https://icon.horse/icon/${partner.domain}`;
                        } else {
                            setFailed(true);
                        }
                    }}
                    style={{
                        /* Taille fixe uniforme pour tous les logos */
                        height: '48px',
                        width: '120px',
                        objectFit: 'contain',
                        /* Passage grayscale → couleur au hover */
                        filter: hovered
                            ? 'grayscale(0%) opacity(1)'
                            : 'grayscale(100%) opacity(0.5)',
                        transition: 'filter 0.3s ease, transform 0.3s ease',
                        transform: hovered ? 'scale(1.06)' : 'scale(1)',
                        display: 'block',
                    }}
                />
            )}
        </a>
    );
};

/**
 * Infinite Scrolling Marquee
 * - Boucle continue (seamless) via duplication de la liste
 * - Pause on hover
 * - Fade sur les bords gauche/droit
 */
const PartnerMarquee: React.FC = () => {
    const [paused, setPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    /* Durée du tour complet (secondes). Plus c'est grand, plus c'est lent. */
    const DURATION = 40;

    return (
        <section className="relative w-full overflow-hidden py-20">

            {/* Fade gauche */}
            <div
                className="pointer-events-none absolute top-0 left-0 z-10 h-full w-28"
                style={{
                    background: 'linear-gradient(to right, white 0%, transparent 100%)',
                }}
            />
            {/* Fade droit */}
            <div
                className="pointer-events-none absolute top-0 right-0 z-10 h-full w-28"
                style={{
                    background: 'linear-gradient(to left, white 0%, transparent 100%)',
                }}
            />

            {/* TRACK — contient la liste × 2 pour la boucle seamless */}
            <div
                ref={trackRef}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="flex"
                style={{
                    /* Animation CSS pure : translateX de 0 → -50% */
                    animation: `marquee ${DURATION}s linear infinite`,
                    animationPlayState: paused ? 'paused' : 'running',
                    width: 'max-content',
                }}
            >
                {/* Première copie */}
                {PARTNERS.map((p, i) => (
                    <PartnerLogo key={`a-${i}`} partner={p} />
                ))}
                {/* Deuxième copie — crée l'illusion d'infini */}
                {PARTNERS.map((p, i) => (
                    <PartnerLogo key={`b-${i}`} partner={p} />
                ))}
            </div>

            {/* KEYFRAME inline via style tag */}
            <style>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default PartnerMarquee;
