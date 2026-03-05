/**
 * Content Data
 * Educational articles, testimonials, and practice exercises
 */

export interface ContentItem {
    id: string;
    section: "understand" | "testimonials" | "practice";
    type: "Article" | "Témoignage" | "Audio";
    title: string;
    duration: string;
    tags: string[];
    isRead: boolean;
    content: string;
}

export const CONTENT_DATA: ContentItem[] = [
    // Section: Comprendre ce que tu ressens
    {
        id: "art-stress-1",
        section: "understand",
        type: "Article",
        title: "Le stress, c'est quoi exactement ?",
        duration: "3 min",
        tags: ["stress"],
        isRead: true,
        content: `Le stress est une réaction naturelle de l'organisme face à une situation perçue comme menaçante ou exigeante. C'est un mécanisme de survie hérité de nos ancêtres.\n\nIl existe deux types de stress :\n\n1. Le "bon" stress : il nous motive, nous donne de l'énergie pour affronter un défi (examen, prise de parole).\n2. Le "mauvais" stress : lorsqu'il devient chronique, il épuise l'organisme et peut mener à l'anxiété ou au burn-out.\n\nReconnaître ses symptômes (cœur qui bat vite, mains moites, pensées qui s'emballe) est la première étape pour apprendre à le réguler.`,
    },
    {
        id: "art-fatigue-1",
        section: "understand",
        type: "Article",
        title: "Fatigue mentale : quand le cerveau sature",
        duration: "4 min",
        tags: ["fatigue"],
        isRead: false,
        content: `La fatigue mentale n'est pas juste "être fatigué". C'est un état d'épuisement cognitif qui survient après une période prolongée d'activité intellectuelle intense ou de stress émotionnel.\n\nSignes courants :\n- Difficulté à se concentrer\n- Irritabilité\n- Perte de motivation\n- Sommeil non réparateur\n\nPour récupérer, le repos ne suffit pas toujours. Il faut offrir à son cerveau de vraies pauses : marcher sans téléphone, regarder l'horizon, pratiquer une activité manuelle.`,
    },

    // Section: D'autres vivent la même chose
    {
        id: "tem-marie",
        section: "testimonials",
        type: "Témoignage",
        title: 'Marie, 22 ans : "Je pensais être seule"',
        duration: "5 min",
        tags: ["isolement", "anxiété"],
        isRead: false,
        content: `Pendant longtemps, j'ai cru que j'étais la seule à ressentir ce vide. Je voyais mes amis sortir, rire, poster des stories, et je me sentais en décalage complet.\n\n"Pourquoi eux y arrivent et pas moi ?" C'était ma phrase boucle.\n\nUn jour, j'ai osé en parler à une amie proche. À ma grande surprise, elle a fondu en larmes. Elle vivait exactement la même chose mais le cachait aussi. Ce jour-là, j'ai compris que l'isolement est souvent une illusion que notre anxiété construit.`,
    },
    {
        id: "tem-thomas",
        section: "testimonials",
        type: "Témoignage",
        title: "Thomas, 23 ans : surmonter l'anxiété",
        duration: "4 min",
        tags: ["anxiété", "stress"],
        isRead: false,
        content: `L'anxiété sociale me paralysait. Aller en cours était une épreuve. J'avais l'impression que tout le monde me jugeait.\n\nJ'ai commencé par des petits défis : demander l'heure à un inconnu, lever la main une fois en cours. C'était terrifiant au début.\n\nCe qui m'a aidé, c'est d'accepter que je ne serai jamais le plus extraverti de la bande, et que c'est OK. Aujourd'hui, j'ai toujours un peu le trac, mais il ne m'empêche plus de vivre.`,
    },

    // Section: Prendre un temps pour soi
    {
        id: "aud-resp",
        section: "practice",
        type: "Audio",
        title: "Respiration guidée",
        duration: "5 min",
        tags: ["stress", "anxiété"],
        isRead: false,
        content: `(Audio en cours de lecture...)\n\nInstallez-vous confortablement. Fermez les yeux. Inspirez profondément par le nez en gonflant le ventre... 1, 2, 3, 4. Bloquez... 1, 2. Expirez doucement par la bouche... 1, 2, 3, 4, 5, 6.`,
    },
    {
        id: "aud-anx",
        section: "practice",
        type: "Audio",
        title: "Gérer l'anxiété au quotidien",
        duration: "12 min",
        tags: ["anxiété", "fatigue"],
        isRead: false,
        content: `(Podcast audio)\n\nDans cet épisode, nous explorons des techniques simples pour désamorcer une crise d'angoisse naissante. L'ancrage est une méthode puissante : nommez 5 objets que vous voyez, 4 que vous pouvez toucher, 3 que vous entendez...`,
    },
];
