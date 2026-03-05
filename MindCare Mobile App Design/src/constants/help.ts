/**
 * Help Resources Data
 * Mental health services and support contacts
 */

export interface HelpResource {
    id: string;
    category: "immediate" | "student";
    name: string;
    shortDesc: string;
    fullDesc: string;
    hours: string;
    fullHours: string;
    badges: string[];
    whenToContact: string;
    phone: string | null;
    website: string;
}

export const HELP_DATA: HelpResource[] = [
    {
        id: "nightline",
        category: "immediate",
        name: "Nightline",
        shortDesc: "Des étudiants formés pour t'écouter",
        fullDesc:
            "Nightline est un service d'écoute nocturne par et pour les étudiants. Tu peux parler de tout ce qui te préoccupe (stress, études, solitude, vie perso) à un autre étudiant formé à l'écoute active, dans un cadre bienveillant, confidentiel et sans jugement.",
        hours: "21h - 2h30",
        fullHours:
            "Ouvert tous les soirs de 21h à 2h30 du matin (sauf vacances universitaires).",
        badges: ["Tchat & Tel", "Anonyme", "Gratuit", "Étudiants"],
        whenToContact:
            "Quand tu te sens seul·e le soir, que tu as besoin de vider ton sac avant de dormir, ou que le stress des études t'empêche de trouver le sommeil.",
        phone: "01 88 32 12 32",
        website: "https://nightline.fr",
    },
    {
        id: "3114",
        category: "immediate",
        name: "3114",
        shortDesc: "Numéro national de prévention suicide",
        fullDesc:
            "Le 3114 est le numéro national de prévention du suicide. Des professionnels de santé (infirmiers, psychologues) te répondent 24h/24 et 7j/7 pour t'écouter, évaluer la situation et t'orienter si nécessaire.",
        hours: "24h/24 • 7j/7",
        fullHours: "Disponible 24h/24 et 7j/7.",
        badges: ["Urgence", "Pro", "Gratuit", "Confidentiel"],
        whenToContact:
            "Si tu as des idées noires, que tu penses à la mort, ou que tu es inquiet·e pour un·e proche. C'est une ligne de crise professionnelle.",
        phone: "3114",
        website: "https://3114.fr",
    },
    {
        id: "fil-sante",
        category: "student",
        name: "Fil Santé Jeunes",
        shortDesc: "Information et écoute pour les 12-25 ans",
        fullDesc:
            "Fil Santé Jeunes est un service complet d'information et d'écoute. Ils abordent tous les sujets : santé mentale, sexualité, addictions, vie affective. Tu peux les contacter par téléphone, chat ou forum.",
        hours: "9h - 23h",
        fullHours: "Tous les jours de 9h à 23h.",
        badges: ["12-25 ans", "Généraliste", "Gratuit"],
        whenToContact:
            "Pour poser une question sur ta santé, comprendre ce qui t'arrive ou parler à un professionnel sans jugement.",
        phone: "0 800 235 236",
        website: "https://filsantejeunes.com",
    },
    {
        id: "sante-psy",
        category: "student",
        name: "Santé Psy Étudiant",
        shortDesc: "8 séances gratuites avec un psy",
        fullDesc:
            "Un dispositif gouvernemental qui permet à tout étudiant de bénéficier jusqu'à 8 séances gratuites avec un psychologue partenaire, sans avance de frais. Il suffit d'une ordonnance de ton médecin ou du service de santé universitaire.",
        hours: "Sur RDV",
        fullHours: "Selon les disponibilités des psychologues partenaires.",
        badges: ["Dispositif État", "Gratuit", "Suivi"],
        whenToContact:
            "Quand tu sens que tu as besoin d'un suivi régulier et structuré, au-delà d'une simple écoute ponctuelle.",
        phone: null,
        website: "https://santepsy.etudiant.gouv.fr",
    },
];
