import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    // Common & Navigation
                    "welcome": "Welcome",
                    "association": "The Association",
                    "team": "Our Team",
                    "simulations": "Simulations",
                    "news": "News",
                    "contact": "Contact",
                    "legal": "Legal",
                    "legal_mentions": "Legal Mentions",
                    "privacy": "Privacy Policy",
                    "follow_us": "Follow Us",
                    "nav": "Navigation",

                    // SDGs
                    "sdg_title": "Sustainable Development Goals",
                    "sdg_1": "No Poverty",
                    "sdg_2": "Zero Hunger",
                    "sdg_3": "Good Health and Well-being",
                    "sdg_4": "Quality Education",
                    "sdg_5": "Gender Equality",
                    "sdg_6": "Clean Water and Sanitation",
                    "sdg_7": "Affordable and Clean Energy",
                    "sdg_8": "Decent Work and Economic Growth",
                    "sdg_9": "Industry, Innovation and Infrastructure",
                    "sdg_10": "Reduced Inequalities",
                    "sdg_11": "Sustainable Cities and Communities",
                    "sdg_12": "Responsible Consumption and Production",
                    "sdg_13": "Climate Action",
                    "sdg_14": "Life Below Water",
                    "sdg_15": "Life on Land",
                    "sdg_16": "Peace, Justice and Strong Institutions",
                    "sdg_17": "Partnerships for the Goals",

                    // Stats & Partners
                    "stat_years": "Years of Experience",
                    "stat_prepa": "Prep Participants",
                    "stat_awards": "International Awards",
                    "stat_students": "Students Reached",
                    "partners_inst": "Institutional Partners",

                    // Geopolitics Generator
                    "geopo_title": "Geopolitics Generator",
                    "generate_btn": "Generate Subject",
                    "did_you_know": "Did you know?",
                    "modern_context": "Modern Context",
                    "close": "Close",
                    "click_to_generate": "Click generate to discover a random geopolitical fact!",

                    // Home Hero
                    "hero_title": "SIMONU MARSEILLE",
                    "hero_subtitle": "EXPERIENCE DIPLOMACY. SHAPE THE FUTURE.",
                    "discover": "DISCOVER",
                    "join_us": "JOIN US",
                    "explore_map": "Explore Map",
                    "close_map": "Close Map",
                    "vision_title": "OUR VISION",
                    "vision_text": "Training tomorrow's leaders through excellence in debate and understanding global issues.",
                    "feat_1_title": "Diplomacy",
                    "feat_1_text": "Democratizing UN mechanisms and spreading the 17 Sustainable Development Goals.",
                    "feat_2_title": "Excellence",
                    "feat_2_text": "Intensive preparation for International MUNs. Recognized awards (New York, Washington).",
                    "feat_3_title": "Impact",
                    "feat_3_text": "Equal Opportunity Program for 150 high school students. Stimulating civic ambition.",
                    "pwa_ios_title": "Install SimONU",
                    "pwa_ios_subtitle": "Add SimONU to your home screen for the best experience.",
                    "pwa_ios_step1": "Tap the Share button [share_icon] in the browser toolbar.",
                    "pwa_ios_step2": "Scroll down and select '[plus_icon] Add to Home Screen'.",
                    "pwa_ios_hint": "This app runs in full screen and does not require the App Store.",
                    "pwa_ios_close": "Got it"
                }
            },
            fr: {
                translation: {
                    // Common & Navigation
                    "welcome": "Accueil",
                    "association": "L'Association",
                    "team": "Notre Équipe",
                    "simulations": "Simulations",
                    "news": "Actualités",
                    "contact": "Contact",
                    "legal": "Légal",
                    "legal_mentions": "Mentions Légales",
                    "privacy": "Confidentialité",
                    "follow_us": "Suivez-nous",
                    "nav": "Navigation",
 
                    // SDGs
                    "sdg_title": "Objectifs de Développement Durable",
                    "sdg_1": "Pas de pauvreté",
                    "sdg_2": "Faim \"zéro\"",
                    "sdg_3": "Bonne santé et bien-être",
                    "sdg_4": "Éducation de qualité",
                    "sdg_5": "Égalité entre les sexes",
                    "sdg_6": "Eau propre et assainissement",
                    "sdg_7": "Énergie propre",
                    "sdg_8": "Travail décent",
                    "sdg_9": "Industrie et innovation",
                    "sdg_10": "Inégalités réduites",
                    "sdg_11": "Villes durables",
                    "sdg_12": "Consommation responsable",
                    "sdg_13": "Lutte contre le changement climatique",
                    "sdg_14": "Vie aquatique",
                    "sdg_15": "Vie terrestre",
                    "sdg_16": "Paix, justice et institutions efficaces",
                    "sdg_17": "Partenariats pour la réalisation des objectifs",
 
                    // Stats & Partners
                    "stat_years": "Années d'Expérience",
                    "stat_prepa": "Participants Prépa",
                    "stat_awards": "Prix Internationaux",
                    "stat_students": "Étudiants Touchés",
                    "partners_inst": "Partenaires Institutionnels",
 
                    // Geopolitics Generator
                    "geopo_title": "Générateur Géopolitique",
                    "generate_btn": "Générer un Sujet",
                    "did_you_know": "Le saviez-vous ?",
                    "modern_context": "Contexte Moderne",
                    "close": "Fermer",
                    "click_to_generate": "Cliquez sur générer pour découvrir une anecdote géopolitique !",
 
                    // Home Hero
                    "hero_title": "SIMONU MARSEILLE",
                    "hero_subtitle": "L'EXCELLENCE DIPLOMATIQUE / KEDGE BUSINESS SCHOOL",
                    "discover": "DÉCOUVRIR",
                    "join_us": "NOUS REJOINDRE",
                    "explore_map": "Explorer la Carte",
                    "close_map": "Fermer la Carte",
                    "vision_title": "NOTRE VISION",
                    "vision_text": "Former les leaders de demain par l'excellence du débat et la compréhension des enjeux globaux.",
                    "feat_1_title": "Diplomatie",
                    "feat_1_text": "Démocratiser les mécanismes onusiens et diffuser les 17 Objectifs de Développement Durable.",
                    "feat_2_title": "Excellence",
                    "feat_2_text": "Préparation intensive aux MUN Internationaux. Palmarès reconnu (New York, Washington).",
                    "feat_3_title": "Impact",
                    "feat_3_text": "Programme Égalité des Chances pour 150 lycéens. Stimuler l'ambition citoyenne.",
                    "pwa_ios_title": "Installer SimONU",
                    "pwa_ios_subtitle": "Ajoutez SimONU à votre écran d'accueil pour une expérience optimale.",
                    "pwa_ios_step1": "Appuyez sur le bouton Partager [share_icon] dans la barre d'outils du navigateur.",
                    "pwa_ios_step2": "Faites défiler et sélectionnez '[plus_icon] Sur l'écran d'accueil'.",
                    "pwa_ios_hint": "Cette application fonctionne en plein écran sans passer par l'App Store.",
                    "pwa_ios_close": "Compris"
                }
            }
        },
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
