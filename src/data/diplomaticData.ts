export interface Fact {
    id: string;
    category: 'History' | 'Diplomacy' | 'Geopolitics' | 'UN';
    content: {
        fr: string;
        en: string;
        es: string;
        ar: string;
        zh: string;
        ru: string;
    };
}

// Échantillon de données (à étendre vers 1000+)
export const diplomaticFacts: Fact[] = [
    {
        id: '1',
        category: 'UN',
        content: {
            fr: "Le Conseil de sécurité de l'ONU compte 15 membres, dont 5 permanents disposant d'un droit de veto.",
            en: "The UN Security Council has 15 members, including 5 permanent members with veto power.",
            es: "El Consejo de Seguridad de la ONU tiene 15 miembros, incluidos 5 permanentes con derecho a veto.",
            ar: "يتألف مجلس الأمن التابع للأمم المتحدة من 15 عضواً، منهم 5 أعضاء دائمين يتمتعون بحق النقض.",
            zh: "联合国安理会有15个成员国，其中包括5个拥有否决权的常任理事国。",
            ru: "В Совет Безопасности ООН входят 15 членов, в том числе 5 постоянных членов, обладающих правом вето."
        }
    },
    {
        id: '2',
        category: 'History',
        content: {
            fr: "La Charte des Nations Unies a été signée le 26 juin 1945 à San Francisco.",
            en: "The Charter of the United Nations was signed on June 26, 1945, in San Francisco.",
            es: "La Carta de las Naciones Unidas se firmó el 26 de junio de 1945 en San Francisco.",
            ar: "تم التوقيع على ميثاق الأمم المتحدة في 26 يونيو 1945 في سان فرانسيسكو.",
            zh: "《联合国宪章》于1945年6月26日在旧金山签署。",
            ru: "Устав Организации Объединенных Наций был подписан 26 июня 1945 года в Сан-Франциско."
        }
    },
    {
        id: '3',
        category: 'Geopolitics',
        content: {
            fr: "Il y a actuellement 193 États membres à l'Organisation des Nations Unies.",
            en: "There are currently 193 Member States in the United Nations.",
            es: "Actualmente hay 193 Estados miembros en las Naciones Unidas.",
            ar: "يوجد حاليًا 193 دولة عضوًا في الأمم المتحدة.",
            zh: "目前联合国有193个会员国。",
            ru: "В настоящее время в Организации Объединенных Наций насчитывается 193 государства-члена."
        }
    },
    {
        id: '4',
        category: 'Diplomacy',
        content: {
            fr: "Les langues officielles de l'ONU sont l'anglais, le français, l'espagnol, le russe, le chinois et l'arabe.",
            en: "The official languages of the UN are English, French, Spanish, Russian, Chinese, and Arabic.",
            es: "Los idiomas oficiales de la ONU son inglés, francés, español, ruso, chino y árabe.",
            ar: "اللغات الرسمية للأمم المتحدة هي الإنجليزية والفرنسية والإسبانية والروسية والصينية والعربية.",
            zh: "联合国的官方语言是英语、法语、西班牙语、俄语、中文和阿拉伯语。",
            ru: "Официальными языками ООН являются английский, французский, испанский, русский, китайский и арабский."
        }
    },
    {
        id: '5',
        category: 'History',
        content: {
            fr: "Le siège de l'ONU à New York est considéré comme un territoire international.",
            en: "The UN Headquarters in New York is considered international territory.",
            es: "La sede de la ONU en Nueva York se considera territorio internacional.",
            ar: "يعتبر مقر الأمم المتحدة في نيويورك أرضًا دولية.",
            zh: "位于纽约的联合国总部被视为国际领土。",
            ru: "Штаб-квартира ООН в Нью-Йорке считается международной территорией."
        }
    }
];

export const countries = [
    "France", "United States", "China", "Russia", "United Kingdom",
    "Germany", "Japan", "India", "Brazil", "South Africa",
    "Saudi Arabia", "Egypt", "Nigeria", "Canada", "Australia"
];

export const topics = {
    fr: ["Crise climatique", "Sécurité cybernétique", "Droits de l'homme", "Commerce international", "Désarmement nucléaire"],
    en: ["Climate Crisis", "Cybersecurity", "Human Rights", "International Trade", "Nuclear Disarmament"],
    es: ["Crisis climática", "Ciberseguridad", "Derechos humanos", "Comercio internacional", "Desarme nuclear"],
    ar: ["أزمة المناخ", "الأمن السيبراني", "حقوق الإنسان", "التجارة الدولية", "نزع السلاح النووي"],
    zh: ["气候危机", "网络安全", "人权", "国际贸易", "核裁军"],
    ru: ["Климатический кризис", "Кибербезопасность", "Права человека", "Международная торговля", "Ядерное разоружение"]
};
