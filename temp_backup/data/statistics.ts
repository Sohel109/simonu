export interface Statistic {
    number: string;
    label: string;
    icon?: string;
    description?: string;
}

export const statistics: Statistic[] = [
    {
        number: "18",
        label: "Années d'expérience",
        description: "Depuis 2006, SimONU forme les étudiants aux enjeux diplomatiques"
    },
    {
        number: "5000",
        label: "Étudiants rencontrés",
        description: "Lors des conférences NMUN à New York et Washington"
    },
    {
        number: "15",
        label: "Événements annuels",
        description: "Simulations, conférences et formations tout au long de l'année"
    },
    {
        number: "193",
        label: "Pays simulés",
        description: "Représentation de tous les États membres de l'ONU"
    }
];

export const achievements = [
    {
        year: "2015",
        title: "Outstanding Delegation Award",
        description: "Plus haute distinction au NMUN New York. 5 prix au total cette année-là."
    },
    {
        year: "2019",
        title: "2 prix au NMUN Washington DC",
        description: "Performance remarquable de la délégation"
    },
    {
        year: "2022",
        title: "1 prix au NMUN Washington DC",
        description: "Participation notable également à New York"
    },
    {
        year: "2023",
        title: "3 prix pour KEDGE",
        description: "SimONU Bordeaux confirme le niveau global des équipes KEDGE"
    }
];
