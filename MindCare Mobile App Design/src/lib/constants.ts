// --- CONTENT DATA ---
export const CONTENT_DATA = [
  {
    id: 'art-stress-1',
    section: 'understand',
    type: 'Article',
    title: "Le stress, c'est quoi exactement ?",
    duration: '3 min',
    tags: ['stress'],
    isRead: true,
    content: `Le stress est une réaction naturelle de l'organisme face à une situation perçue comme menaçante ou exigeante. C'est un mécanisme de survie hérité de nos ancêtres.\n\nIl existe deux types de stress :\n\n1. Le "bon" stress : il nous motive, nous donne de l'énergie pour affronter un défi (examen, prise de parole).\n2. Le "mauvais" stress : lorsqu'il devient chronique, il épuise l'organisme et peut mener à l'anxiété ou au burn-out.\n\nReconnaître ses symptômes (cœur qui bat vite, mains moites, pensées qui s'emballe) est la première étape pour apprendre à le réguler.`
  },
  {
    id: 'art-fatigue-1',
    section: 'understand',
    type: 'Article',
    title: "Fatigue mentale : quand le cerveau sature",
    duration: '4 min',
    tags: ['fatigue'],
    isRead: false,
    content: `La fatigue mentale n'est pas juste "être fatigué". C'est un état d'épuisement cognitif qui survient après une période prolongée d'activité intellectuelle intense ou de stress émotionnel.\n\nSignes courants :\n- Difficulté à se concentrer\n- Irritabilité\n- Perte de motivation\n- Sommeil non réparateur\n\nPour récupérer, le repos ne suffit pas toujours. Il faut offrir à son cerveau de vraies pauses : marcher sans téléphone, regarder l'horizon, pratiquer une activité manuelle.`
  },
  {
    id: 'tem-marie',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Je pensais être seule",
    duration: '2 min',
    tags: ['isolement', 'anxiété'],
    isRead: false,
    author: 'Marie L.',
    age: 22,
    theme: 'Isolement',
    content: `Pendant longtemps, j'ai cru que j'étais la seule à ressentir ce vide. Je voyais mes amis sortir, rire, poster des stories, et je me sentais en décalage complet.\n\n"Pourquoi eux y arrivent et pas moi ?" C'était ma phrase boucle.\n\nUn jour, j'ai osé en parler à une amie proche. À ma grande surprise, elle a fondu en larmes. Elle vivait exactement la même chose mais le cachait aussi.\n\nCe jour-là, j'ai compris que l'isolement est souvent une illusion que notre anxiété construit.`
  },
  {
    id: 'tem-thomas',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Surmonter l'anxiété sociale",
    duration: '2 min',
    tags: ['anxiété', 'stress'],
    isRead: false,
    author: 'Thomas R.',
    age: 23,
    theme: 'Anxiété',
    content: `L'anxiété sociale me paralysait. Aller en cours était une épreuve. J'avais l'impression que tout le monde me jugeait.\n\nJ'ai commencé par des petits défis : demander l'heure à un inconnu, lever la main une fois en cours. C'était terrifiant au début.\n\nCe qui m'a aidé, c'est d'accepter que je ne serai jamais le plus extraverti de la bande, et que c'est OK. Aujourd'hui, j'ai toujours un peu le trac, mais il ne m'empêche plus de vivre.`
  },
  {
    id: 'tem-lea',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Retrouver confiance après un échec",
    duration: '2 min',
    tags: ['stress', 'confiance'],
    isRead: false,
    author: 'Léa M.',
    age: 20,
    theme: 'Confiance en soi',
    content: `J'ai redoublé ma L1. Pour moi, c'était la fin du monde. Mes parents étaient déçus, mes amis avançaient, et moi je restais sur place.\n\nPendant des semaines, je n'arrivais plus à ouvrir un bouquin. J'avais l'impression d'être nulle.\n\nC'est une prof qui m'a dit : "Échouer ne fait pas de toi une ratée. Ça fait de toi quelqu'un qui essaie." Cette phrase m'a débloquée.\n\nAujourd'hui, j'ai validé mon année avec mention. L'échec faisait partie du chemin.`
  },
  {
    id: 'tem-youssef',
    section: 'testimonials',
    type: 'Témoignage',
    title: "Apprendre à demander de l'aide",
    duration: '2 min',
    tags: ['stress', 'fatigue'],
    isRead: false,
    author: 'Youssef B.',
    age: 24,
    theme: 'Études',
    content: `En prépa, on m'a appris à tout gérer seul. Demander de l'aide, c'était un aveu de faiblesse. Résultat : burn-out en deuxième année.\n\nJ'ai fini par aller voir le médecin du campus. Il m'a dit une chose simple : "Tu n'es pas une machine." Ça m'a fait un bien fou.\n\nDepuis, j'ai appris que la vraie force, c'est de savoir quand on a besoin des autres. Et ça change tout.`
  },
  {
    id: 'aud-anx',
    section: 'podcasts',
    type: 'Podcast',
    title: "Gérer l'anxiété au quotidien",
    duration: '12 min',
    tags: ['anxiété', 'fatigue'],
    isRead: false,
    content: `(Podcast audio)\n\nDans cet épisode, nous explorons des techniques simples pour désamorcer une crise d'angoisse naissante. L'ancrage est une méthode puissante : nommez 5 objets que vous voyez, 4 que vous pouvez toucher, 3 que vous entendez...`
  },
  {
    id: 'pod-stress',
    section: 'podcasts',
    type: 'Podcast',
    title: "Comprendre et apprivoiser son stress",
    duration: '15 min',
    tags: ['stress'],
    isRead: false,
    content: `(Podcast audio)\n\nLe stress fait partie de la vie étudiante. Mais quand il devient envahissant, il faut apprendre à le reconnaître et à le canaliser.\n\nDans cet épisode, on explore les mécanismes du stress et des techniques concrètes pour retrouver le calme : cohérence cardiaque, visualisation, et micro-pauses.`
  },
  {
    id: 'aud-resp',
    section: 'breathing',
    type: 'Exercice',
    title: "Respiration guidée — Cohérence cardiaque",
    duration: '5 min',
    tags: ['stress', 'anxiété'],
    isRead: false,
    content: `(Audio en cours de lecture...)\n\nInstallez-vous confortablement. Fermez les yeux. Inspirez profondément par le nez en gonflant le ventre... 1, 2, 3, 4. Bloquez... 1, 2. Expirez doucement par la bouche... 1, 2, 3, 4, 5, 6.`
  },
  {
    id: 'ex-478',
    section: 'breathing',
    type: 'Exercice',
    title: "Technique 4-7-8 pour s'endormir",
    duration: '3 min',
    tags: ['stress', 'fatigue'],
    isRead: false,
    content: `La technique 4-7-8 est une méthode de respiration développée par le Dr Andrew Weil.\n\n1. Inspirez par le nez pendant 4 secondes\n2. Retenez votre souffle pendant 7 secondes\n3. Expirez lentement par la bouche pendant 8 secondes\n\nRépétez 3 à 4 cycles. Cette technique active le système nerveux parasympathique et favorise l'endormissement.`
  }
];

export const HELP_DATA = [
  {
    id: 'nightline',
    category: 'immediate',
    name: "Nightline",
    shortDesc: "Des étudiants formés pour t'écouter",
    fullDesc: "Nightline est un service d'écoute nocturne par et pour les étudiants. Tu peux parler de tout ce qui te préoccupe (stress, études, solitude, vie perso) à un autre étudiant formé à l'écoute active, dans un cadre bienveillant, confidentiel et sans jugement.",
    hours: "21h - 2h30",
    fullHours: "Ouvert tous les soirs de 21h à 2h30 du matin (sauf vacances universitaires).",
    badges: ["Tchat & Tel", "Anonyme", "Gratuit", "Étudiants"],
    whenToContact: "Quand tu te sens seul·e le soir, que tu as besoin de vider ton sac avant de dormir, ou que le stress des études t'empêche de trouver le sommeil.",
    phone: "01 88 32 12 32",
    website: "https://nightline.fr"
  },
  {
    id: '3114',
    category: 'immediate',
    name: "3114",
    shortDesc: "Numéro national de prévention suicide",
    fullDesc: "Le 3114 est le numéro national de prévention du suicide. Des professionnels de santé (infirmiers, psychologues) te répondent 24h/24 et 7j/7 pour t'écouter, évaluer la situation et t'orienter si nécessaire.",
    hours: "24h/24 • 7j/7",
    fullHours: "Disponible 24h/24 et 7j/7.",
    badges: ["Urgence", "Pro", "Gratuit", "Confidentiel"],
    whenToContact: "Si tu as des idées noires, que tu penses à la mort, ou que tu es inquiet·e pour un·e proche. C'est une ligne de crise professionnelle.",
    phone: "3114",
    website: "https://3114.fr"
  },
  {
    id: 'fil-sante',
    category: 'student',
    name: "Fil Santé Jeunes",
    shortDesc: "Information et écoute pour les 12-25 ans",
    fullDesc: "Fil Santé Jeunes est un service complet d'information et d'écoute. Ils abordent tous les sujets : santé mentale, sexualité, addictions, vie affective. Tu peux les contacter par téléphone, chat ou forum.",
    hours: "9h - 23h",
    fullHours: "Tous les jours de 9h à 23h.",
    badges: ["12-25 ans", "Généraliste", "Gratuit"],
    whenToContact: "Pour poser une question sur ta santé, comprendre ce qui t'arrive ou parler à un professionnel sans jugement.",
    phone: "0 800 235 236",
    website: "https://filsantejeunes.com"
  },
  {
    id: 'sante-psy',
    category: 'student',
    name: "Santé Psy Étudiant",
    shortDesc: "8 séances gratuites avec un psy",
    fullDesc: "Un dispositif gouvernemental qui permet à tout étudiant de bénéficier jusqu'à 8 séances gratuites avec un psychologue partenaire, sans avance de frais. Il suffit d'une ordonnance de ton médecin ou du service de santé universitaire.",
    hours: "Sur RDV",
    fullHours: "Selon les disponibilités des psychologues partenaires.",
    badges: ["Dispositif État", "Gratuit", "Suivi"],
    whenToContact: "Quand tu sens que tu as besoin d'un suivi régulier et structuré, au-delà d'une simple écoute ponctuelle.",
    phone: null,
    website: "https://santepsy.etudiant.gouv.fr"
  }
];

export type ContentItem = typeof CONTENT_DATA[number];
export type HelpResource = typeof HELP_DATA[number];
