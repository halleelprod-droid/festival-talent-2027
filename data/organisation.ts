export type OrganisationPoleIconKey =
  | "crown"
  | "handshake"
  | "laptop"
  | "camera"
  | "music"
  | "landmark"
  | "users";

export type OrganisationPole = {
  title: string;
  holder: string;
  role: string;
  description: string;
  icon: OrganisationPoleIconKey;
  logo?: { src: string; alt: string };
  level: "direction-generale" | "direction";
};

// Organigramme officiel Festival Talent — Direction Générale au sommet,
// puis les directions et partenaires de pôle.
export const organisationPoles: OrganisationPole[] = [
  {
    title: "Direction Générale",
    holder: "Zairah Diamant Noire",
    role: "Fondatrice & Présidente",
    description:
      "Porte la vision fondatrice de Festival Talent et préside l'ensemble des orientations stratégiques, artistiques et institutionnelles du projet.",
    icon: "crown",
    level: "direction-generale",
  },
  {
    title: "Direction des Partenariats & Relations Institutionnelles",
    holder: "Pierre Ndiaye",
    role: "CEO PIN EVENTS",
    description:
      "Structure les collaborations stratégiques, la coordination événementielle et le rayonnement institutionnel du festival.",
    icon: "handshake",
    logo: { src: "/images/partners/pin-events.png", alt: "Logo PIN EVENTS" },
    level: "direction",
  },
  {
    title: "Direction Digitale",
    holder: "SIDRA",
    role: "Partenaire Digital Officiel",
    description:
      "SIDRA accompagne Festival Talent dans la conception, le développement, la maintenance, la sécurité, le référencement (SEO) et l'évolution de la plateforme numérique officielle.",
    icon: "laptop",
    level: "direction",
  },
  {
    title: "Direction des Ressources Humaines",
    holder: "Jocelyne Vickie BITEKE",
    role: "Directrice des Ressources Humaines",
    description:
      "Structure les ressources humaines, coordonne les équipes, accompagne les collaborateurs et organise les processus administratifs internes de Festival Talent.",
    icon: "users",
    level: "direction",
  },
  {
    title: "Direction Média & Communication",
    holder: "HALLEEL",
    role: "Partenaire Média & Communication",
    description:
      "HALLEEL est en charge de la stratégie de communication, de la production audiovisuelle, des contenus digitaux, des réseaux sociaux et de la couverture médiatique officielle du Festival Talent.",
    icon: "camera",
    level: "direction",
  },
  {
    title: "Direction Danse",
    holder: "Agence Diassnor",
    role: "Responsable du Pôle Danse",
    description:
      "Pilote le Pôle Danse : battles, pré-sélections, organisation artistique et développement des talents chorégraphiques.",
    icon: "music",
    logo: {
      src: "/images/partners/agence-diassnor.png",
      alt: "Logo Agence Diassnor",
    },
    level: "direction",
  },
  {
    title: "Partenaire Institutionnel Danse",
    holder: "Centre Culturel Blaise Senghor",
    role: "Partenaire Institutionnel",
    description:
      "Accompagne le développement du secteur Danse et contribue à la valorisation des arts chorégraphiques et à l'encadrement des jeunes talents.",
    icon: "landmark",
    logo: {
      src: "/images/partners/blaise-senghor.png",
      alt: "Logo Centre Culturel Blaise Senghor",
    },
    level: "direction",
  },
];
