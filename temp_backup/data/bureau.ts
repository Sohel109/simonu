// Données réelles du Bureau Exécutif 2026
export interface BureauMember {
    poste: string;
    nom: string;
    prenom: string;
    email?: string;
    role2?: string;
    initiales: string;
}

export const bureau2026: BureauMember[] = [
    {
        poste: "Présidente",
        nom: "Paul",
        prenom: "Romane",
        email: "simonu@kedgebs.com",
        initiales: "RP"
    },
    {
        poste: "Vice-Présidente",
        nom: "Goubert",
        prenom: "Ema",
        role2: "Chargée Communication",
        initiales: "EG"
    },
    {
        poste: "Trésorier",
        nom: "Mohammedi",
        prenom: "Merrid",
        role2: "Chargé Simulation",
        initiales: "MM"
    },
    {
        poste: "Secrétaire Générale",
        nom: "Dervishi",
        prenom: "Erina",
        role2: "Chargée MUN",
        initiales: "ED"
    }
];

export interface Pole {
    nom: string;
    responsable: string;
    charges?: string[];
    description: string;
}

export const poles: Pole[] = [
    {
        nom: "Pôle MUN",
        responsable: "Irlande Giovannino",
        charges: ["Erina Dervishi"],
        description: "Gestion logistique et académique des délégations internationales (New York, Washington). Inscriptions NMUN, visas, vols, hôtels, et formation intensive des délégués."
    },
    {
        nom: "Pôle Simulation",
        responsable: "Capucine Labene",
        charges: ["Alexandre Gallea", "Alicia Fevry", "Merrid Mohammedi"],
        description: "Ingénierie pédagogique des événements internes. Rédaction des Background Guides, conception des scénarios de crise, et formation des présidents de séance (Chairs)."
    },
    {
        nom: "Pôle Communication",
        responsable: "Camille Jourdin",
        charges: ["Lina Karkar", "Ema Goubert"],
        description: "Gestion de l'image de marque sur les réseaux sociaux, création de visuels, couverture des événements, promotion des recrutements et des activités."
    },
    {
        nom: "Pôle Partenariats",
        responsable: "Sabrine Kaoutar",
        charges: ["Chloé Degonde"],
        description: "Démarchage de sponsors, entretien des relations avec les partenaires existants (entreprises, institutions). Assure la viabilité financière de l'association."
    },
    {
        nom: "Pôle Commercial & Logistique",
        responsable: "Félix Lucas (Commercial), Louis Kieffer (Logistique)",
        description: "Développement de l'offre Corporate Services et gestion du bon déroulement matériel des événements (salles, traiteurs, flux de participants)."
    }
];
