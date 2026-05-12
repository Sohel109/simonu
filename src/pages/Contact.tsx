import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Briefcase, GraduationCap, ArrowLeft, Paperclip } from 'lucide-react';

type Category = 'general' | 'partenariat' | 'recrutement' | null;

const Contact: React.FC = () => {
    const [category, setCategory] = useState<Category>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    // Store raw File objects — no base64 needed
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [lmFile, setLmFile] = useState<File | null>(null);

    // General Form Data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        // Recruitment specifics
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
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/send-email';

            // Build FormData — files sent as real binary, not base64
            const formPayload = new FormData();
            formPayload.append('prenom', prenom);
            formPayload.append('nom', nom);
            formPayload.append('email', formData.email);
            formPayload.append('objet', finalSubject || 'Contact');
            formPayload.append('message', finalMessage);
            if (cvFile) formPayload.append('cv', cvFile);
            if (lmFile) formPayload.append('lm', lmFile);

            const response = await fetch(apiUrl, {
                method: 'POST',
                // NO Content-Type header — browser sets it automatically with boundary
                body: formPayload
            });

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
        { id: 'general', title: 'Requête Générale', icon: <Mail size={48} strokeWidth={1} />, desc: 'Informations, questions générales ou requêtes diplomatiques et presse.' },
        { id: 'partenariat', title: 'Devenir Partenaire', icon: <Briefcase size={48} strokeWidth={1} />, desc: 'Soutenez nos actions et associez votre image à l\'excellence SimONU.' },
        { id: 'recrutement', title: 'Recrutement', icon: <GraduationCap size={48} strokeWidth={1} />, desc: 'Rejoignez nos délégations et formez-vous à la géopolitique internationale.' },
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
        transition: 'border-color 0.3s ease'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.85rem',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
        color: '#094067',
        fontWeight: 600
    };

    return (
        <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: 'white', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: '#094067', marginBottom: '16px' }}>
                        Bureau des Relations
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
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
                            transition={{ duration: 0.6 }}
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}
                        >
                            {cards.map(card => (
                                <motion.div
                                    key={card.id}
                                    initial="rest"
                                    whileHover="hover"
                                    animate="rest"
                                    onClick={() => setCategory(card.id as Category)}
                                    style={{
                                        padding: '60px 40px',
                                        background: '#FAFCFF',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <motion.div 
                                        variants={{
                                            rest: { opacity: 0 },
                                            hover: { opacity: 1 }
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0, bottom: 0,
                                            background: 'white',
                                            boxShadow: '0 20px 50px rgba(9, 64, 103, 0.08)',
                                            zIndex: 0
                                        }}
                                    />
                                    
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <motion.div 
                                            variants={{
                                                rest: { color: '#094067', scale: 1 },
                                                hover: { color: '#D4AF37', scale: 1.05 }
                                            }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}
                                        >
                                            {card.icon}
                                        </motion.div>
                                        
                                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#094067', marginBottom: '16px', fontWeight: 600 }}>
                                            {card.title}
                                        </h3>
                                        
                                        <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>
                                            {card.desc}
                                        </p>
                                        
                                        <motion.div 
                                            variants={{
                                                rest: { opacity: 0, y: 10 },
                                                hover: { opacity: 1, y: 0 }
                                            }}
                                            transition={{ duration: 0.3 }}
                                            style={{ marginTop: '30px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#094067', fontWeight: 600 }}
                                        >
                                            Ouvrir le dossier
                                        </motion.div>
                                    </div>
                                </motion.div>
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
                                onClick={() => {
                                    setCategory(null);
                                    setAttachments([]);
                                }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: 'none', border: 'none', color: '#666',
                                    cursor: 'pointer', fontSize: '0.85rem', marginBottom: '40px',
                                    textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#094067'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                            >
                                <ArrowLeft size={16} /> Retour aux options
                            </button>

                            <div style={{ background: 'white', border: '1px solid rgba(9, 64, 103, 0.1)', padding: '60px', boxShadow: '0 15px 50px rgba(0,0,0,0.03)' }}>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#094067', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
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
                                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '30px', background: '#f9fbfd', border: '1px dashed rgba(9, 64, 103, 0.3)' }}
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
                                        <textarea value={formData.message} onChange={(e) => updateField('message', e.target.value)} style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }} placeholder="Votre message ici..." required />
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
                                            boxShadow: '0 10px 20px rgba(9, 64, 103, 0.15)'
                                        }}
                                        onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)' }}
                                        onMouseLeave={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(0)' }}
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

export default Contact;
