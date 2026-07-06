export type SponsorPartner = {
  name: string;
  category: string;
  logo?: string;
};

export type SponsorPack = {
  name: string;
  level: string;
  description: string;
  benefits: string[];
};

export type SponsorImpactGoal = {
  value: number;
  label: string;
};

export const sponsorPartners: SponsorPartner[] = [
  { name: "Union Europeenne", category: "Institutionnel" },
  { name: "PIN EVENTS", category: "Production & relations institutionnelles", logo: "/images/partners/pin-events.png" },
  { name: "Agence Diassnor", category: "Pole Danse", logo: "/images/partners/agence-diassnor.png" },
  { name: "Centre Culturel Blaise Senghor", category: "Partenaire institutionnel danse", logo: "/images/partners/blaise-senghor.png" },
  { name: "Sen Influenceurs", category: "Media & influence" },
  { name: "Universal Selfcare", category: "Bien-etre & sante", logo: "/images/partners/universal.jpeg" },
  { name: "Mano Perfetto", category: "Construction & developpement", logo: "/images/partners/mano.jpeg" },
  { name: "H & Hair", category: "Beaute & lifestyle", logo: "/images/partners/h-hair.jpeg" },
];

export const sponsorImpactGoals: SponsorImpactGoal[] = [
  { value: 1000, label: "Talents" },
  { value: 14, label: "Regions" },
  { value: 100, label: "Coachs" },
  { value: 50, label: "Partenaires" },
  { value: 100000, label: "Visiteurs" },
];

export const sponsorPacks: SponsorPack[] = [
  {
    name: "Pack Bronze",
    level: "Emergence",
    description:
      "Un premier niveau de presence pour associer votre marque a l'impact culturel et jeunesse de Festival Talent.",
    benefits: ["Logo", "Reseaux sociaux", "Media", "Visibilite", "Telechargement dossier"],
  },
  {
    name: "Pack Argent",
    level: "Visibilite",
    description:
      "Un dispositif renforce pour les entreprises qui veulent une presence digitale et terrain plus identifiable.",
    benefits: ["Visibilite", "Stand", "Logo", "Reseaux sociaux", "Media", "Activation terrain"],
  },
  {
    name: "Pack Or",
    level: "Influence",
    description:
      "Une association forte avec les temps forts du festival, les publics, les talents et les partenaires.",
    benefits: ["Visibilite", "Stand", "Logo", "Reseaux sociaux", "Media", "VIP", "Hospitalite", "Activation terrain"],
  },
  {
    name: "Pack Platine",
    level: "Strategique",
    description:
      "Un partenariat premium pour les marques et institutions qui souhaitent construire un programme d'impact durable.",
    benefits: ["Visibilite", "Stand", "Logo", "Reseaux sociaux", "Media", "VIP", "Hospitalite", "Activation terrain", "Relations publiques"],
  },
];
