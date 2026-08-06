export type DestinationStatus = "Confirmé" | "En préparation" | "En cours de structuration";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  code: string;
  subtitle: string;
  signature: string;
  description: string;
  status: DestinationStatus;
  statusLabel: string;
  role: string;
  priorityDisciplines: string[];
  formats: string[];
  audiences: string[];
  opportunities: string[];
  partnerNeeds: string[];
  preparation: string[];
  toConfirm: string[];
  timeline: { label: string; status: "En cours" | "En préparation" | "À venir" }[];
  collaborationAudience: string[];
  seoDescription: string;
};

const sharedTimeline: Destination["timeline"] = [
  { label: "Structuration", status: "En cours" },
  { label: "Partenariats", status: "En cours" },
  { label: "Programmation", status: "En préparation" },
  { label: "Annonce officielle", status: "À venir" },
  { label: "Inscriptions ou invitations", status: "À venir" },
  { label: "Déroulement", status: "À venir" },
];

export const internationalDestinations: Destination[] = [
  {
    slug: "senegal",
    name: "Sénégal",
    country: "Sénégal",
    code: "SN",
    subtitle: "La naissance des talents",
    signature: "Détecter et révéler.",
    description: "Le Sénégal accueille les présélections, les battles, les castings, les formations et les premières grandes rencontres de l'édition.",
    status: "Confirmé",
    statusLabel: "Présélections ouvertes",
    role: "Détection, présélections, ancrage local et premières expériences.",
    priorityDisciplines: ["Musique", "Danse", "Mode", "Création visuelle"],
    formats: ["Présélections", "Formations", "Rencontres", "Scènes et battles"],
    audiences: ["Talents", "Mentors", "Public local", "Professionnels"],
    opportunities: ["Candidater", "Être repéré", "Se former", "Se produire"],
    partnerNeeds: ["Structures culturelles", "Médias", "Lieux", "Accompagnement"],
    preparation: ["Coordination des équipes", "Préparation des contenus", "Organisation des présélections"],
    toConfirm: ["Calendrier détaillé", "Lieux de chaque format", "Programmation complémentaire"],
    timeline: sharedTimeline,
    collaborationAudience: ["Institutions", "Médias", "Structures culturelles", "Professionnels"],
    seoDescription: "Le Sénégal, point d'ancrage et de détection des talents de Festival Talent 2027.",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    code: "FR",
    subtitle: "La connexion aux opportunités",
    signature: "Connecter et rendre visible.",
    description: "Paris représente l'une des passerelles internationales de Festival Talent 2027. Cette étape a vocation à rapprocher les talents, les diasporas, les professionnels, les médias, les marques et les industries créatives autour de formats de rencontre, de visibilité et de collaboration.",
    status: "En préparation",
    statusLabel: "Étape en préparation",
    role: "Visibilité, mise en réseau, diaspora et connexion professionnelle.",
    priorityDisciplines: ["Mode", "Musique", "Médias", "Industries culturelles"],
    formats: ["Showcase", "Rencontre professionnelle", "Présentation de talents", "Mode et création", "Networking", "Média et contenu", "Échange avec la diaspora", "Atelier ou masterclass"],
    audiences: ["Talents", "Diasporas", "Professionnels", "Médias", "Marques"],
    opportunities: ["Visibilité", "Rencontres professionnelles", "Création", "Développement de réseau"],
    partnerNeeds: ["Institutions culturelles", "Diasporas", "Médias", "Marques", "Agences", "Écoles", "Studios", "Salles"],
    preparation: ["Identification des formats", "Recherche de lieux", "Structuration des partenariats", "Préparation des contenus"],
    toConfirm: ["Dates", "Lieux", "Intervenants", "Conditions de participation", "Partenaires", "Calendrier public"],
    timeline: sharedTimeline,
    collaborationAudience: ["Institutions culturelles", "Diasporas", "Médias", "Marques", "Agences", "Écoles", "Studios", "Professionnels de la mode et de la musique"],
    seoDescription: "Festival Talent 2027 prépare une étape à Paris dédiée aux talents, aux diasporas, à la mode, à la musique, aux médias et aux rencontres professionnelles.",
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italie",
    code: "IT",
    subtitle: "Le dialogue des cultures",
    signature: "Créer et dialoguer.",
    description: "Rome incarne la dimension culturelle et créative de Festival Talent 2027. Cette étape est pensée comme un espace de rencontre entre talents africains, patrimoine européen, création contemporaine, design, cinéma, mode et gastronomie.",
    status: "En préparation",
    statusLabel: "Étape en préparation",
    role: "Dialogue culturel, création, patrimoine et collaborations artistiques.",
    priorityDisciplines: ["Création artistique", "Cinéma", "Design", "Mode", "Gastronomie"],
    formats: ["Rencontre culturelle", "Performance", "Création audiovisuelle", "Mode et design", "Cinéma", "Gastronomie", "Exposition", "Collaboration artistique", "Contenu éditorial", "Expérience patrimoniale"],
    audiences: ["Talents", "Créateurs", "Producteurs", "Institutions", "Publics culturels"],
    opportunities: ["Dialogue culturel", "Création", "Production de contenu", "Collaboration Afrique–Europe"],
    partnerNeeds: ["Institutions culturelles", "Studios", "Producteurs", "Designers", "Structures de mode", "Lieux culturels", "Associations Afrique–Italie"],
    preparation: ["Identification des formats", "Recherche de lieux", "Structuration des partenariats", "Préparation des contenus"],
    toConfirm: ["Programmation", "Lieux", "Intervenants", "Partenaires", "Calendrier public", "Conditions de participation"],
    timeline: sharedTimeline,
    collaborationAudience: ["Institutions culturelles", "Studios", "Producteurs", "Cinéma", "Designers", "Mode", "Gastronomie", "Lieux culturels", "Associations Afrique–Italie"],
    seoDescription: "Festival Talent 2027 prépare une étape à Rome dédiée à la création, au cinéma, au design, au patrimoine, à la gastronomie et aux collaborations Afrique–Europe.",
  },
];

export const internationalDisciplines = ["Musique", "Danse", "Mode", "Cinéma & création visuelle", "Technologie & innovation", "Entrepreneuriat", "Automobile & culture moteur", "Gastronomie & patrimoine"];
export const talentJourney = ["Candidater", "Être repéré", "Se former", "Se produire", "Se connecter", "Rayonner"];
export const internationalProgramme = internationalDestinations.map((destination) => ({ destination: destination.name, phase: destination.role }));
