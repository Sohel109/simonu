import React, { useRef, useEffect, useState } from 'react';
import { client } from '../sanity/client';

const simulationsData = [
    {
        title: "SimONU Prépa",
        subtitle: "L'Excellence comme Outil de Recrutement",
        desc: "Organisée depuis +15 ans (15ème édition nov 2025). Destinée aux CPGE (ECG, ECT, B/L). 250 participants. Thèmes complexes (climat, terrorisme). Encadrement par Alain Joyeux (APHEC).",
        highlight: "KPI: 250 Participants",
        category: "Domestique"
    },
    {
        title: "SimONU EDC",
        subtitle: "L'Impact Social (Égalité des Chances)",
        desc: "Partenariat 'Phoenix'. Cible : Lycéens REP/REP+ (Marseille). Objectif : Briser l'autocensure et stimuler l'ambition via la diplomatie. 150 participants/an.",
        highlight: "Partenaire: Phoenix",
        category: "Social"
    },
    {
        title: "Conseil de Sécurité",
        subtitle: "L'Innovation 2025",
        desc: "Lancement 22 mars 2025. Format de gestion de crise intense (15 membres, véto). Thème : L'Arctique (Ressources, Routes militaires).",
        highlight: "Thème: Arctique",
        category: "Nouveauté"
    },
    {
        title: "NMUN New York",
        subtitle: "La Conférence Reine",
        desc: "5000 étudiants. Délégations KEDGE (ex: Botswana, UK). Palmarès : Outstanding Delegation Award (2015), Prix multiples (2019, 2022).",
        highlight: "Outstanding Award",
        category: "International"
    },
    {
        title: "NMUN Washington DC",
        subtitle: "Formation & Consolidation",
        desc: "Automne. Complémentaire à NY. Permet de former les nouvelles recrues. Régulièrement distinguée.",
        highlight: "Capitale Fédérale",
        category: "International"
    },
    {
        title: "Simulations Académiques",
        subtitle: "Prestataire Interne KEDGE",
        desc: "PGE (Sept) : Intégration & RSE. IBBA (Janv) : Thème Eau/Hult Prize. Bourse 3500€ pour le gagnant (Camp Londres).",
        highlight: "Intégration Cursus",
        category: "Académique"
    }
];

const Simulations: React.FC = () => {
    const actusRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`*[_type == "event"] | order(_createdAt asc)`)
            .then(data => setEvents(data))
            .catch(console.error);

        // Ajout dynamique du script Elfsight
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

    const scrollToActus = () => {
        if (actusRef.current) {
            actusRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const defaultEvents = [
        ['04-05 Sept 2024', 'Simulation PGE', 'KEDGE Marseille', 'Étudiants PGE'],
        ['28-29 Nov 2025', 'SimONU Prépa (15e éd.)', 'KEDGE Marseille', 'CPGE (ECG, ECT, B/L)'],
        ['06-08 Jan 2025', 'Simulation IBBA', 'KEDGE Marseille', 'BBA (Eau/Hult Prize)'],
        ['22 Mars 2025', 'Conseil de Sécurité', 'KEDGE Marseille', 'Public (Arctique)'],
        ['Mars 2025', 'SimONU EDC', 'KEDGE Marseille', 'Lycéens REP (Phoenix)'],
        ['Avril (Annuel)', 'NMUN New York', 'New York, USA', 'Délégation Internationale'],
        ['Automne (Annuel)', 'NMUN Washington DC', 'Washington', 'Délégation Internationale']
    ];

    const displayEvents = events.length > 0 
        ? events.map(e => [e.date || '', e.title || '', e.location || '', (e.target ? e.target : '') + (e.theme ? ` / ${e.theme}` : '')])
        : defaultEvents;

    return (
        <div style={{ minHeight: '100vh', background: 'white', color: '#14213D', fontFamily: 'Montserrat, sans-serif' }}>

            <div style={{ padding: '60px 0', textAlign: 'center', background: '#F4F7F6' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>Portefeuille d'Activités</h1>
                </div>
            </div>

            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
                        {simulationsData.map((sim, i) => (
                            <div key={i} style={{ border: '1px solid #eee', padding: '40px', background: 'white', transition: 'box-shadow 0.3s' }}>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '15px' }}>{sim.category}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>{sim.title}</h3>
                                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#14213D', marginBottom: '20px', borderBottom: '1px solid #14213D', display: 'inline-block', paddingBottom: '5px' }}>{sim.subtitle}</div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#555', marginBottom: '20px' }}>{sim.desc}</p>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14213D', background: '#F4F7F6', padding: '10px', display: 'inline-block' }}>{sim.highlight}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TABLEAU CALENDRIER (ANNEXE 2) */}
            <section style={{ padding: '80px 0', background: '#FAFAFA' }}>
                <div className="container">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>Calendrier Majeur</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#14213D', color: 'white' }}>
                                    <th style={{ padding: '15px' }}>Date</th>
                                    <th style={{ padding: '15px' }}>Événement</th>
                                    <th style={{ padding: '15px' }}>Lieu</th>
                                    <th style={{ padding: '15px' }}>Cible / Thème</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayEvents.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd', background: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                                        <td style={{ padding: '15px', fontWeight: 600 }}>{row[0]}</td>
                                        <td style={{ padding: '15px' }}>{row[1]}</td>
                                        <td style={{ padding: '15px' }}>{row[2]}</td>
                                        <td style={{ padding: '15px' }}>{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Simulations;
