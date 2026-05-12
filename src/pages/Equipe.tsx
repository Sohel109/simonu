import React, { useState, useEffect } from 'react';
import { client } from '../sanity/client';

interface TeamMember {
    name: string;
    role: string;
    desc: string;
}

interface Pole {
    name: string;
    chef: string;
    mission: string;
}

interface EquipeData {
    bureau: TeamMember[];
    poles: Pole[];
    encadrement: string;
}

const Equipe: React.FC = () => {
    const [data, setData] = useState<EquipeData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requête Sanity pour récupérer les membres triés par ordre
                const sanityMembers = await client.fetch(`*[_type == "teamMember"] | order(order asc)`);
                
                // Si la base Sanity est vide (le client n'a pas encore rempli), on charge le JSON de secours
                if (sanityMembers.length === 0) {
                    const res = await fetch('/data/equipe.json');
                    const json = await res.json();
                    setData(json);
                } else {
                    // On formate les données Sanity pour qu'elles correspondent à notre interface
                    setData({
                        bureau: sanityMembers.filter((m: any) => m.category === 'bureau'),
                        poles: sanityMembers.filter((m: any) => m.category === 'pole').map((p: any) => ({
                            name: p.role, // Le nom du pôle
                            chef: p.name, // Le nom du chef
                            mission: p.desc // La mission
                        })),
                        // Texte statique pour l'encadrement en attendant de l'ajouter dans Sanity
                        encadrement: "L'association bénéficie du soutien de l'administration (Céline Salle, Learning by Doing Manager) et d'un réseau Alumni actif (ex: Théo Geandreau, Camille Paolini) assurant le mentorat."
                    });
                }
            } catch (err) {
                console.error("Erreur de chargement Sanity (CORS ou autre):", err);
                // On charge le JSON de secours même en cas d'erreur pour éviter le chargement infini !
                try {
                    const res = await fetch('/data/equipe.json');
                    const json = await res.json();
                    setData(json);
                } catch (fallbackErr) {
                    console.error("Erreur du fichier JSON de secours:", fallbackErr);
                }
            }
        };

        fetchData();
    }, []);

    if (!data) return <div style={{ padding: '100px', textAlign: 'center' }}>Chargement...</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'white', color: '#14213D', fontFamily: 'Montserrat, sans-serif' }}>

            <div style={{ padding: '60px 0', textAlign: 'center', background: '#F4F7F6' }}>
                <div className="container">
                    <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#14213D', marginBottom: '16px', fontWeight: 600 }}>Chapitre 2</p>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>Gouvernance & RH</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#555' }}>
                        Une organisation hiérarchisée, spécialisée et professionnalisée (Mandat 2026).
                    </p>
                </div>
            </div>

            {/* BUREAU EXECUTIF (TABLE AU 1) */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>2.1 Le Bureau Exécutif</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        {data.bureau.map((m, i) => (
                            <div key={i} style={{ padding: '30px', border: '1px solid #eee', background: 'white', textAlign: 'center' }}>
                                <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', color: '#14213D', marginBottom: '10px' }}>{m.role}</div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontFamily: 'Playfair Display, serif' }}>{m.name}</h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#666' }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* POLES OPERATIONNELS */}
            <section style={{ padding: '80px 0', background: '#FAFAFA' }}>
                <div className="container">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', color: '#14213D', fontFamily: 'Playfair Display, serif' }}>2.2 Pôles Opérationnels</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px' }}>
                        {data.poles.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ fontSize: '2rem', color: '#ddd', fontWeight: 700, lineHeight: 1 }}>0{i + 1}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', color: '#14213D', marginBottom: '5px' }}>{p.name}</h3>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#14213D', marginBottom: '10px' }}>Resp. {p.chef}</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#555' }}>{p.mission}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ENCADREMENT */}
            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#14213D' }}>Encadrement & Alumni</h3>
                    <p style={{ maxWidth: '800px', fontSize: '1rem', color: '#555', lineHeight: 1.7 }}>
                        {data.encadrement}
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Equipe;
