export type StaffIconKey =
  | "briefcase"
  | "crown"
  | "gem"
  | "handshake"
  | "megaphone"
  | "monitor"
  | "music"
  | "radio"
  | "rocket";

export type StaffMember = {
  name: string;
  role: string;
  subtitle?: string;
  department: string;
  description: string;
  icon: StaffIconKey;
  initials: string;
  image?: string;
  logo?: {
    src: string;
    alt: string;
  };
  achievements?: string[];
  featured?: boolean;
};

export const staffMembers: StaffMember[] = [
  {
    name: "Zairah Diamant Noire",
    role: "Fondatrice & Présidente",
    department: "Direction Générale",
    description:
      "Porte la vision fondatrice de Festival Talent 2027 et incarne l'ambition de reveler les talents, d'inspirer la jeunesse et de construire un evenement culturel majeur.",
    icon: "gem",
    image: "/images/staff/zairah-diamant-noire.jpg",
    initials: "ZDN",
    featured: true,
  },
  {
    name: "Ibrahima Khalilou Danso",
    role: "Directeur Executif",
    department: "Direction",
    description:
      "Assure la coordination generale, le pilotage operationnel et le suivi des grandes orientations du festival.",
    icon: "briefcase",
    initials: "IKD",
  },
  {
    name: "Masseck Sy",
    role: "Cofondateur",
    department: "Direction",
    description:
      "Participe a la vision strategique, au developpement institutionnel et a la construction globale de Festival Talent 2027.",
    icon: "crown",
    image: "/images/staff/masseck-sy.jpg",
    initials: "MS",
  },
  {
    name: "Pierre Ndiaye",
    role: "Directeur des Partenariats et Relations Institutionnelles",
    subtitle: "CEO de PIN EVENTS • Fondateur de DUNYA",
    department: "Partenariats",
    description:
      "Entrepreneur senegalais specialise dans l'evenementiel, la communication, l'influence digitale, les relations institutionnelles et le developpement de partenariats. Pierre Ndiaye accompagne Festival Talent 2027 dans la structuration des collaborations strategiques, la coordination evenementielle et le rayonnement institutionnel du projet.",
    icon: "handshake",
    image: "/images/staff/pierre-ndiaye.jpg",
    logo: {
      src: "/images/partners/pin-events.png",
      alt: "Logo PIN EVENTS",
    },
    initials: "PN",
    achievements: [
      "CEO PIN EVENTS",
      "Fondateur DUNYA",
      "Festival KeuMeuFeu Wake UP",
      "Senegal TikTok Awards",
      "Gala Des Etoiles",
      "Management artistique",
      "Relations institutionnelles",
    ],
  },
  {
    name: "Mamadou Ngom",
    role: "Responsable Pole Regie",
    department: "Organisation",
    description:
      "Coordonne la regie, l'organisation technique, les besoins terrain et la fluidite operationnelle des differentes activites.",
    icon: "radio",
    image: "/images/staff/mamadou-ngom.jpg",
    initials: "MN",
  },
  {
    name: "Ibrahima Fall",
    role: "Developpeur Web / Conception Digitale",
    department: "Digital",
    description:
      "Responsable de la conception, du deploiement et de l'experience digitale du site officiel Festival Talent 2027.",
    icon: "monitor",
    initials: "IF",
  },
  {
    name: "Babacar Ndour",
    role: "Responsable Communication",
    department: "Communication",
    description:
      "Pilote la communication, l'image publique, les annonces officielles, les medias et la visibilite digitale du festival.",
    icon: "megaphone",
    image: "/images/staff/babacar-ndour.jpg",
    initials: "BN",
  },
  {
    name: "Abdourahmane Ndiaye",
    role: "Responsable Pole Entrepreneuriat",
    department: "Entrepreneuriat",
    description:
      "Coordonne le pole entrepreneuriat, accompagne les porteurs de projets et participe a la valorisation des jeunes entrepreneurs.",
    icon: "rocket",
    image: "/images/staff/abdourahmane-ndiaye.jpg",
    initials: "AN",
  },
  {
    name: "DJ You",
    role: "Directeur Artistique",
    department: "Artistique",
    description:
      "Assure la direction artistique, accompagne la programmation creative et participe a la coherence musicale, scenique et culturelle de l'evenement.",
    icon: "music",
    image: "/images/staff/dj-you.jpg",
    initials: "DY",
  },
];
