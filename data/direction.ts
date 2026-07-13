export type DirectionMember = {
  name: string;
  role: string;
  subtitles?: string[];
  biography: string;
  expertise: string[];
  experience?: string[];
  initials: string;
  image?: string;
};

export const directionMembers: DirectionMember[] = [
  {
    name: "Zairah Diamant Noire",
    role: "Fondatrice & Présidente",
    biography:
      "Initiatrice du Festival Talent et porteuse de la vision du projet.",
    expertise: ["Vision", "Leadership", "Culture"],
    initials: "ZDN",
    image: "/images/staff/zairah-diamant-noire.jpg",
  },
  {
    name: "Pierre Ndiaye",
    role: "Directeur des Partenariats & Relations Institutionnelles",
    subtitles: ["CEO PIN EVENTS"],
    biography:
      "Développe les partenariats stratégiques, les relations institutionnelles et les collaborations nationales et internationales.",
    expertise: ["Partenariats", "Institutions", "International"],
    initials: "PN",
    image: "/images/staff/pierre-ndiaye.jpg",
  },
  {
    name: "Ibrahima Fall",
    role: "Directeur Digital & Innovation",
    subtitles: ["Fondateur de SIDRA Technologies", "Fondateur de HALLEEL Media"],
    biography:
      "Conçoit et pilote l'écosystème numérique de Festival Talent, l'innovation, les plateformes digitales, l'intelligence artificielle, l'expérience utilisateur et la stratégie technologique.",
    expertise: ["Digital", "Innovation", "IA", "Plateformes", "UX", "SEO"],
    initials: "IF",
  },
  {
    name: "Jocelyne Vickie BITEKE",
    role: "Directrice des Ressources Humaines",
    biography:
      "Pilote la gestion des ressources humaines, la coordination des équipes et l'organisation administrative du Festival Talent.",
    expertise: ["RH", "Management", "Coordination", "Organisation"],
    experience: [
      "5 ans à la Fondation Saint Martin",
      "2 ans dans un cabinet de financement",
      "1 an Responsable Logistique dans le BTP",
    ],
    initials: "JB",
  },
];

export const directionMemberNames = new Set(
  directionMembers.map((member) => member.name),
);

export const governanceSteps = [
  "Vision",
  "Organisation",
  "Innovation",
  "Partenariats",
  "Ressources Humaines",
  "Production",
  "Festival",
] as const;
