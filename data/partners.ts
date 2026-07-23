export const partnersLogos = [
  { name: "Union Europeenne" },
  { name: "Sen Influenceurs" },
  { name: "SIDRA" },
  { name: "HALLEEL" },
  { name: "PIN EVENTS", image: "/images/partners/pin-events.png" },
  { name: "Agence Diassnor", image: "/images/partners/agence-diassnor.png" },
  { name: "Centre Culturel Blaise Senghor", image: "/images/partners/blaise-senghor.png" },
  { name: "Mano Perfetto", image: "/images/partners/mano.jpeg" },
  { name: "Val2Events", image: "/images/partners/val2events.jpeg" },
  { name: "H & Hair", image: "/images/partners/h-hair.jpeg" },
  { name: "Universal Selfcare", image: "/images/partners/universal.jpeg" },
  { name: "Keebaro Entertainment", image: "/images/partners/keebaro-entertainment.png" },
  { name: "XTREM JET SÉNÉGAL WATERSPORTS", image: "/images/partners/xtrem-jet-senegal-watersports.jpeg" },
  { name: "Collectif des Danseurs Urbains de Thiès", image: "/images/partners/cdut-thies.jpeg" },
  { name: "Maison des Cultures Urbaines de Dakar", image: "/images/partners/mcu-dakar.jpeg" },
];

// Source de vérité UNIQUE des partenaires. `group` pilote le regroupement de la
// page /partners ; `featured` met en avant un partenaire majeur sur l'accueil ;
// `whiteLogo` force une carte blanche pour un logo à fond blanc. Aucune autre
// surface ne doit redéclarer un tableau local de partenaires.
export type PartnerGroup =
  | "institutionnel" | "digital" | "media-comm" | "strategique" | "artistique"
  | "media-influence" | "lutte" | "nautique" | "lifestyle";

export type OfficialPartner = {
  name: string;
  label: string;
  category: string;
  group: PartnerGroup;
  description: string;
  image?: string;
  sector?: string;
  badge?: string;
  slug?: string;
  responsibility?: string;
  shortName?: string;
  featured?: boolean;
  whiteLogo?: boolean;
  // Texte alternatif dédié au logo (sinon `Logo {name}` par défaut). Indispensable
  // pour décrire précisément chaque logo à fond blanc.
  logoAlt?: string;
  website?: string | null;
  href?: string;
  contact?: { email: string; phone: string };
};

export const officialPartners: OfficialPartner[] = [
  {
    name: "Union Europeenne",
    label: "Partenaire Officiel Majeur",
    category: "Institutionnel",
    group: "institutionnel",
    featured: true,
    description:
      "Partenaire majeur du rayonnement international et de l'impact jeunesse de Festival Talent 2027.",
  },
  {
    name: "Sen Influenceurs",
    label: "Partenaire Media & Influence Officiel",
    category: "Media",
    group: "media-influence",
    description:
      "Partenaire media officiel pour la visibilite digitale, la couverture des annonces et la mise en avant des talents.",
  },
  {
    name: "PIN EVENTS",
    label: "Partenaire Evenementiel, Production & Relations Institutionnelles",
    category: "Production",
    group: "strategique",
    image: "/images/partners/pin-events.png",
    description:
      "Partenaire strategique pour la production evenementielle, les activations terrain, les partenariats et les relations institutionnelles.",
  },
  {
    name: "SIDRA",
    label: "Partenaire Digital Officiel",
    category: "Digital",
    group: "digital",
    sector: "Direction Digitale",
    badge: "Direction Digitale",
    description:
      "SIDRA accompagne Festival Talent dans la conception, le developpement, la maintenance, la securite, le referencement (SEO) et l'evolution de la plateforme numerique officielle.",
  },
  {
    name: "HALLEEL",
    label: "Partenaire Media & Communication",
    category: "Media",
    group: "media-comm",
    sector: "Direction Media & Communication",
    badge: "Direction Media & Communication",
    description:
      "HALLEEL est en charge de la strategie de communication, de la production audiovisuelle, des contenus digitaux, des reseaux sociaux et de la couverture mediatique officielle du Festival Talent.",
  },
  {
    name: "Agence Diassnor",
    slug: "diassnor",
    label: "Partenaire Danse",
    category: "Management artistique & Evenementiel",
    group: "artistique",
    sector: "Management artistique & Evenementiel",
    responsibility:
      "Responsable du Pole Danse : battles, preselections, organisation artistique et developpement des talents choregraphiques.",
    badge: "Responsable du Pole Danse",
    image: "/images/partners/agence-diassnor.png",
    description:
      "L'Agence Diassnor est une agence specialisee dans le management artistique et l'evenementiel. Dans le cadre de Festival Talent, elle pilote le Pole Danse et accompagne l'organisation des battles, des preselections et le developpement des talents choregraphiques.",
    contact: {
      email: "diassnor098@gmail.com",
      phone: "+221 75 632 43 94",
    },
    href: "/partners/diassnor",
  },
  {
    name: "Centre Culturel Blaise Senghor",
    label: "Partenaire Danse",
    category: "Partenaire Institutionnel",
    group: "institutionnel",
    sector: "Partenaire Institutionnel",
    responsibility:
      "Partenaire institutionnel et accompagnement du developpement de la danse.",
    badge: "Partenaire Danse",
    image: "/images/partners/blaise-senghor.png",
    description:
      "Le Centre Culturel Blaise Senghor accompagne Festival Talent dans le developpement du secteur Danse et contribue a la valorisation des arts choregraphiques ainsi qu'a l'encadrement des jeunes talents.",
  },
  {
    name: "Mano Perfetto",
    label: "Partenaire Construction & Developpement",
    category: "Developpement",
    group: "lifestyle",
    image: "/images/partners/mano.jpeg",
    description:
      "Partenaire associe au developpement, a la structuration et aux besoins operationnels du projet.",
  },
  {
    name: "H & Hair",
    label: "Partenaire Beaute & Lifestyle",
    category: "Lifestyle",
    group: "lifestyle",
    image: "/images/partners/h-hair.jpeg",
    description:
      "Partenaire lifestyle autour de l'image, de la beaute, des talents et des experiences public.",
  },
  {
    name: "Universal Selfcare",
    label: "Partenaire Bien-etre & Sante",
    category: "Bien-etre",
    group: "lifestyle",
    image: "/images/partners/universal.jpeg",
    description:
      "Partenaire dedie a l'accompagnement, au soin et au bien-etre dans l'ecosysteme Festival Talent.",
  },
  {
    name: "Val2Events",
    label: "Partenaire associe",
    category: "Evenementiel",
    group: "strategique",
    image: "/images/partners/val2events.jpeg",
    description:
      "Partenaire associe aux experiences evenementielles et a la dynamique terrain du festival.",
  },
  {
    name: "Keebaro Entertainment",
    label: "Partenaire Officiel Lutte",
    category: "Lutte",
    group: "lutte",
    sector: "Lutte Senegalaise",
    badge: "Partenaire Officiel Lutte",
    image: "/images/partners/keebaro-entertainment.png",
    description:
      "Keebaro Entertainment accompagne Festival Talent 2027 en tant que partenaire officiel du secteur Lutte, contribuant a l'organisation, la valorisation et l'encadrement des talents de la lutte senegalaise.",
  },
  {
    name: "XTREM JET SÉNÉGAL WATERSPORTS",
    shortName: "XTREM JET SÉNÉGAL",
    label: "Partenaire technique - Sports nautiques",
    category: "Sports nautiques",
    group: "nautique",
    sector: "Activites nautiques",
    badge: "Partenaire technique",
    image: "/images/partners/xtrem-jet-senegal-watersports.jpeg",
    whiteLogo: true,
    logoAlt: "Logo de XTREM JET SÉNÉGAL WATERSPORTS, partenaire technique des activités nautiques du Festival Talent",
    description:
      "Partenaire technique du Festival Talent pour la finale de Jet-Ski, la croisiere et les experiences nautiques organisees a Saly.",
    website: null,
  },
  {
    name: "Collectif des Danseurs Urbains de Thiès",
    shortName: "CDUT",
    label: "Partenaire danse — Thiès",
    category: "Danse et cultures urbaines",
    group: "artistique",
    sector: "Danse et cultures urbaines",
    badge: "Partenaire danse",
    image: "/images/partners/cdut-thies.jpeg",
    whiteLogo: true,
    logoAlt: "Logo du Collectif des Danseurs Urbains de Thiès, partenaire danse du Festival Talent",
    description:
      "Le Collectif des Danseurs Urbains de Thiès accompagne le Festival Talent dans la mobilisation et la valorisation des danseurs urbains.",
    website: null,
  },
  {
    name: "Maison des Cultures Urbaines de Dakar",
    shortName: "MCU Dakar",
    label: "Partenaire culturel — Dakar",
    category: "Cultures urbaines",
    group: "institutionnel",
    sector: "Cultures urbaines",
    badge: "Partenaire culturel",
    image: "/images/partners/mcu-dakar.jpeg",
    whiteLogo: true,
    logoAlt: "Logo de la Maison des Cultures Urbaines de Dakar, partenaire culturel du Festival Talent",
    description:
      "La Maison des Cultures Urbaines de Dakar accompagne le développement et la valorisation des cultures urbaines dans le cadre du Festival Talent.",
    website: null,
  },
];

export const partnerStats = [
  { value: "50K+", label: "Participants attendus" },
  { value: "3", label: "Artistes confirmes" },
  { value: "8", label: "Disciplines officielles" },
  { value: "Global", label: "Visibilite internationale" },
];

export const sponsorOpportunities = [
  "Naming",
  "Branding",
  "Experience VIP",
  "Media",
  "Innovation",
  "Impact jeunesse",
];
