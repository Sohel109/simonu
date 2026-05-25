import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Briefcase, GraduationCap, ArrowLeft, Paperclip, ArrowRight } from 'lucide-react';

type Category = 'general' | 'partenariat' | 'recrutement' | null;

const Contact: React.FC = () => {
    const [category, setCategory] = useState<Category>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [lmFile, setLmFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        programme: '',
        civilite: '',
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const nameParts = formData.fullName.trim().split(' ');
        const prenom = nameParts[0] || '';
        const nom = nameParts.slice(1).join(' ') || prenom;

        let finalMessage = formData.message;
        let finalSubject = formData.subject;

        if (category === 'partenariat') {
            finalSubject = `[Partenariat] ${formData.subject}`;
        } else if (category === 'recrutement') {
            finalSubject = `[Recrutement] Candidature de ${formData.fullName}`;
            finalMessage = `Civilité : ${formData.civilite}\nProgramme : ${formData.programme}\n\nMessage de motivation :\n${formData.message}`;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '/api/send-email';
            const formPayload = new FormData();
            formPayload.append('prenom', prenom);
            formPayload.append('nom', nom);
            formPayload.append('email', formData.email);
            formPayload.append('objet', finalSubject || 'Contact');
            formPayload.append('message', finalMessage);
            if (cvFile) formPayload.append('cv', cvFile);
            if (lmFile) formPayload.append('lm', lmFile);

            const response = await fetch(apiUrl, { method: 'POST', body: formPayload });

            if (response.ok) {
                setStatus('success');
                alert('Votre dossier a été transmis avec succès aux instances concernées.');
                setCategory(null);
                setFormData({ fullName: '', email: '', subject: '', message: '', programme: '', civilite: '' });
                setCvFile(null);
                setLmFile(null);
                setStatus('idle');
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Erreur lors de la transmission. Veuillez réessayer.');
            setStatus('idle');
        }
    };

    const cards = [
        {
            id: 'general',
            title: 'Requête Générale',
            ctaLabel: 'Nous contacter',
            icon: <Mail size={42} strokeWidth={1.2} />,
            desc: 'Informations, questions générales ou requêtes diplomatiques et presse.',
            color: '#094067',
        },
        {
            id: 'partenariat',
            title: 'Devenir Partenaire',
            ctaLabel: 'Devenir Partenaire',
            icon: <Briefcase size={42} strokeWidth={1.2} />,
            desc: "Soutenez nos actions et associez votre image à l'excellence SimONU.",
            color: '#D4AF37',
        },
        {
            id: 'recrutement',
            title: 'Recrutement',
            ctaLabel: 'Postuler',
            icon: <GraduationCap size={42} strokeWidth={1.2} />,
            desc: 'Rejoignez nos délégations et formez-vous à la géopolitique internationale.',
            color: '#3F7E44',
        },
    ];

    const inputStyle = {
        width: '100%',
        padding: '16px',
        border: '1px solid rgba(9, 64, 103, 0.2)',
        borderRadius: '0px',
        background: '#f9fbfd',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1rem',
        color: '#094067',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        boxSizing: 'border-box' as const,
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.85rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
        color: '#094067',
        fontWeight: 600,
    };

    return (
        <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: 'white', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '72px' }}
                >
                    <p style={{
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        color: '#D4AF37',
                        marginBottom: '16px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-body)',
                    }}>
                        Prise de contact
                    </p>
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: '#094067',
                        marginBottom: '20px',
                        fontWeight: 700,
                        letterSpacing: '-0.5px',
                    }}>
                        Bureau des Relations
                    </h1>
                    <p style={{
                        color: '#718096',
                        fontSize: '1.05rem',
                        maxWidth: '560px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        Veuillez sélectionner la nature de votre requête pour être redirigé vers le département compétent.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!category ? (
                        <motion.div
                            key="cards"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '24px',
                            }}
                        >
                            {cards.map((card, idx) => (
                                <ContactCard
                                    key={card.id}
                                    card={card}
                                    index={idx}
                                    onSelect={() => setCategory(card.id as Category)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <button
                                onClick={() => { setCategory(null); setCvFile(null); setLmFile(null); }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: 'none', border: 'none', color: '#718096',
                                    cursor: 'pointer', fontSize: '0.85rem', marginBottom: '40px',
                                    textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600,
                                    transition: 'color 0.2s', fontFamily: 'var(--font-body)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#094067'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
                            >
                                <ArrowLeft size={16} /> Retour aux options
                            </button>

                            <div style={{
                                background: 'white',
                                border: '1px solid rgba(9, 64, 103, 0.1)',
                                padding: '60px',
                                boxShadow: '0 15px 50px rgba(0,0,0,0.04)',
                            }}>
                                <h2 style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '2.2rem',
                                    color: '#094067',
                                    marginBottom: '40px',
                                    borderBottom: '1px solid #eee',
                                    paddingBottom: '20px',
                                    fontWeight: 700,
                                }}>
                                    {category === 'general' && 'Requête Générale'}
                                    {category === 'partenariat' && 'Dossier de Partenariat'}
                                    {category === 'recrutement' && 'Candidature Officielle'}
                                </h2>

                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                                        <div>
                                            <label style={labelStyle}>Nom & Prénom</label>
                                            <input type="text" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} style={inputStyle} placeholder="Votre nom" required />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Adresse Email</label>
                                            <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} placeholder="adresse@domaine.com" required />
                                        </div>
                                    </div>

                                    {category === 'recrutement' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', overflow: 'hidden' }}
                                        >
                                            <div>
                                                <label style={labelStyle}>Civilité</label>
                                                <select value={formData.civilite} onChange={(e) => updateField('civilite', e.target.value)} style={inputStyle} required>
                                                    <option value="" disabled>Sélectionnez...</option>
                                                    <option value="Madame">Madame</option>
                                                    <option value="Monsieur">Monsieur</option>
                                                    <option value="Autre">Autre</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Programme (KEDGE)</label>
                                                <select value={formData.programme} onChange={(e) => updateField('programme', e.target.value)} style={inputStyle} required>
                                                    <option value="" disabled>Sélectionnez...</option>
                                                    <option value="PGE">PGE (Programme Grande École)</option>
                                                    <option value="IBBA">IBBA</option>
                                                    <option value="EBP">EBP</option>
                                                    <option value="KEDGE Bachelor">KEDGE Bachelor</option>
                                                    <option value="Mastère Spécialisé">Mastère Spécialisé / MSc</option>
                                                    <option value="Autre">Autre</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}

                                    {category !== 'recrutement' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <label style={labelStyle}>Objet de la requête</label>
                                            <input type="text" value={formData.subject} onChange={(e) => updateField('subject', e.target.value)} style={inputStyle} placeholder="Sujet de votre message" required />
                                        </motion.div>
                                    )}

                                    {category === 'recrutement' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                                gap: '30px',
                                                padding: '30px',
                                                background: '#f9fbfd',
                                                border: '1px dashed rgba(9, 64, 103, 0.3)',
                                            }}
                                        >
                                            <div>
                                                <label style={labelStyle}>Curriculum Vitae (PDF) *</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                                    <Paperclip size={18} color="#D4AF37" />
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                                        style={{ fontSize: '0.9rem', color: '#666' }}
                                                        required
                                                    />
                                                </div>
                                                {cvFile && <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#4C9F38' }}>✅ {cvFile.name}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Lettre de Motivation (Optionnel)</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                                    <Paperclip size={18} color="#D4AF37" />
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => setLmFile(e.target.files?.[0] || null)}
                                                        style={{ fontSize: '0.9rem', color: '#666' }}
                                                    />
                                                </div>
                                                {lmFile && <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#4C9F38' }}>✅ {lmFile.name}</p>}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div>
                                        <label style={labelStyle}>
                                            {category === 'recrutement' ? 'Texte de présentation libre' : 'Corps du Message'}
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => updateField('message', e.target.value)}
                                            style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }}
                                            placeholder="Votre message ici..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        style={{
                                            justifySelf: 'end',
                                            padding: '16px 50px',
                                            background: '#094067',
                                            color: 'white',
                                            border: 'none',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            fontSize: '0.9rem',
                                            fontWeight: 700,
                                            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                            opacity: status === 'sending' ? 0.7 : 1,
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 10px 20px rgba(9, 64, 103, 0.15)',
                                            fontFamily: 'var(--font-body)',
                                        }}
                                        onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseLeave={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        {status === 'sending' ? 'Transmission...' : 'Soumettre le dossier'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

/** Composant card CTA avec bouton explicite */
const ContactCard: React.FC<{
    card: { id: string; title: string; ctaLabel: string; icon: React.ReactNode; desc: string; color: string };
    index: number;
    onSelect: () => void;
}> = ({ card, index, onSelect }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '48px 36px 36px',
                background: hovered ? '#FAFCFF' : 'white',
                border: `1px solid ${hovered ? card.color + '30' : 'rgba(9,64,103,0.1)'}`,
                borderTop: `4px solid ${hovered ? card.color : 'rgba(9,64,103,0.12)'}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                boxShadow: hovered ? `0 20px 60px ${card.color}14` : '0 2px 12px rgba(0,0,0,0.04)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
            }}
            onClick={onSelect}
        >
            {/* Icon */}
            <div style={{
                color: hovered ? card.color : '#094067',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}>
                {card.icon}
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                color: '#094067',
                margin: 0,
                fontWeight: 700,
            }}>
                {card.title}
            </h3>

            {/* Desc */}
            <p style={{
                color: '#718096',
                fontSize: '0.93rem',
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 300,
                fontFamily: 'var(--font-body)',
            }}>
                {card.desc}
            </p>

            {/* ── CTA BUTTON ── */}
            <button
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
                style={{
                    marginTop: '8px',
                    padding: '14px 32px',
                    background: hovered ? card.color : '#094067',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                    boxShadow: hovered
                        ? `0 8px 24px ${card.color}44`
                        : '0 4px 12px rgba(9,64,103,0.15)',
                    transform: hovered ? 'scale(1.03)' : 'scale(1)',
                    fontFamily: 'var(--font-body)',
                }}
            >
                {card.ctaLabel}
                <ArrowRight size={14} />
            </button>
        </motion.div>
    );
};

export default Contact;
