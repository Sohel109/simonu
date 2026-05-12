export interface Event {
    nom: string;
    date: string;
    lieu: string;
    cible: string;
    description: string;
    participants?: string;
    edition?: string;
}

export const events: Event[] = [
    {
        nom: "SimONU Prépa",
        date: "28-29 novembre 2025",
        lieu: "KEDGE Marseille",
        cible: "Élèves CPGE (ECG, ECT, B/L)",
        description: "15ème édition. Simulation destinée aux classes préparatoires. Première école en France à proposer cet événement.",
        participants: "70-250 participants",
        edition: "15ème"
    },
    {
        nom: "SimONU Égalité des Chances",
        date: "Mars 2025",
        lieu: "KEDGE Marseille",
        cible: "Lycéens REP/REP+",
        description: "Programme social en partenariat avec Phoenix Égalité des Chances. Démocratiser l'accès aux simulations ONU.",
        participants: "~150 lycéens"
    },
    {
        nom: "Simulation PGE",
        date: "4-5 septembre 2024",
        lieu: "KEDGE Marseille",
        cible: "Étudiants Programme Grande École",
        description: "Simulation intégrée au cursus académique. Outil d'intégration et de sensibilisation aux enjeux RSE."
    },
    {
        nom: "Simulation IBBA",
        date: "6-8 janvier 2025",
        lieu: "KEDGE Marseille",
        cible: "Étudiants International BBA",
        description: "Thème 2025 : Accès équitable à l'eau potable. Partenariat Hult Business School (bourse 3 500 € pour le gagnant)."
    },
    {
        nom: "Simulation Conseil de Sécurité",
        date: "22 mars 2025",
        lieu: "KEDGE Marseille",
        cible: "Public",
        description: "Première simulation du Conseil de Sécurité ouverte au public. Thème : L'Arctique (enjeux climatiques et sécuritaires)."
    },
    {
        nom: "NMUN New York",
        date: "Avril (annuel)",
        lieu: "New York, USA",
        cible: "Délégation internationale",
        description: "Plus grande simulation mondiale (~5 000 étudiants). Session de clôture au siège de l'ONU. Outstanding Delegation 2015 (5 prix)."
    },
    {
        nom: "NMUN Washington DC",
        date: "Automne (annuel)",
        lieu: "Washington DC, USA",
        cible: "Délégation internationale",
        description: "Simulation complémentaire à New York. Formation des nouvelles recrues. 2 prix en 2019, 1 prix en 2022."
    }
];

export interface Partner {
    nom: string;
    type: string;
    description: string;
    logo?: string;
}

export const partners: Partner[] = [
    {
        nom: "AFNU",
        type: "Partenaire institutionnel ONU",
        description: "Association Française pour les Nations Unies"
    },
    {
        nom: "UNRIC",
        type: "Organe officiel ONU",
        description: "Centre Régional d'Information de l'ONU pour l'Europe Occidentale"
    },
    {
        nom: "FDNU",
        type: "Fédération nationale",
        description: "Fédération pour la Diplomatie et les Nations Unies"
    },
    {
        nom: "Diplo'PACA",
        type: "Partenaire régional",
        description: "Branche régionale de la FDNU"
    },
    {
        nom: "Phoenix Égalité des Chances",
        type: "Partenaire éducatif",
        description: "Association de tutorat et accompagnement des lycéens issus de milieux défavorisés"
    },
    {
        nom: "Lycée La Nativité",
        type: "Partenaire éducatif",
        description: "Lycée International - Aix-en-Provence"
    },
    {
        nom: "Monde des Grandes Écoles",
        type: "Média spécialisé",
        description: "Média de référence de l'enseignement supérieur"
    },
    {
        nom: "Jane Goodall Institute",
        type: "ONG environnementale",
        description: "Organisation internationale de protection de l'environnement et de la biodiversité"
    },
    {
        nom: "Unis-Terre",
        type: "Association étudiante",
        description: "Réseau étudiant pour le développement durable"
    }
];
