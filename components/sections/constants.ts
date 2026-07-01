export const confirmedArtists = [
  {
    slug: "samba-peuzzi",
    name: "Samba Peuzzi",
    category: "Urban Senegal",
    country: "Senegal",
    image: "/images/samba.jpg",
    description:
      "Samba Peuzzi porte l'energie urbaine senegalaise sur la scene FT2027.",
  },
  {
    slug: "morijah",
    name: "Morijah",
    category: "Musique inspiration",
    country: "Cote d'Ivoire",
    image: "/images/artists/morijah.jpg",
    description:
      "Morijah rejoint officiellement Festival Talent 2027 avec une presence forte autour de la musique, de l'inspiration et de la jeunesse.",
  },
  {
    slug: "cysoul",
    name: "Cysoul",
    category: "Musique internationale",
    country: "Cameroun",
    image: "/images/artists/cysoul.jpg",
    description:
      "Cysoul rejoint officiellement Festival Talent 2027 et apporte une dimension musicale internationale au projet.",
  },
];

export const artistsData = confirmedArtists.map((artist) => ({
  ...artist,
  cover: artist.image,
  performances: [
    "Performance officielle FT2027",
    "Festival Talent Live Experience",
    "Showcase confirme",
  ],
  socials: {},
}));

export const featuredArtists = confirmedArtists.map((artist) => ({
  slug: artist.slug,
  name: artist.name,
  category: artist.category,
  image: artist.image,
}));

export const navigationLinks = [
  { label: "Accueil", href: "/fr" },
  { label: "Programme", href: "/programme" },
  { label: "Activites", href: "/activites" },
  { label: "Pre-selections", href: "/preselections" },
  { label: "Artistes", href: "/artists" },
  { label: "Partenaires", href: "/partners" },
  { label: "Tickets", href: "/tickets" },
  { label: "Media", href: "/media" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const faqItems = [
  {
    question: "Ou se deroule FT2027 ?",
    answer:
      "Festival Talent 2027 prepare une tournee europeenne entre Paris et Rome, de janvier a avril 2027, precedee par des pre-selections officielles.",
  },
  {
    question: "Comment reserver ?",
    answer: "La billetterie officielle est disponible via la page Tickets.",
  },
  {
    question: "Comment devenir partenaire ?",
    answer:
      "Les partenaires peuvent contacter l'equipe via la page Partenaires.",
  },
];

export const liveStats = [
  "50K+ Participants",
  "Janvier - Avril 2027",
  "3 Artistes Confirmes",
  "Paris + Rome",
  "Afrique - Europe",
];

export const festivalStats = [
  { value: "50K+", label: "Participants attendus" },
  { value: "4 mois", label: "Tournee europeenne" },
  { value: "3", label: "Artistes confirmes" },
  { value: "Global", label: "Audience internationale" },
];

export const stats = festivalStats;

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

export const experienceHighlights = [
  {
    title: "Pre-selections officielles",
    text: "Avant janvier 2027, les talents sont identifies en danse, musique, mode, art, entrepreneuriat, technologie, culture urbaine et sports mecaniques.",
  },
  {
    title: "Paris",
    text: "Une etape europeenne dediee aux showcases, rencontres partenaires, panels et sessions media.",
  },
  {
    title: "Rome",
    text: "Une phase consacree au leadership, au coaching, aux performances selectionnees et au networking international.",
  },
];

export const partnersLogos = [
  { name: "Union Europeenne" },
  { name: "Mano Perfetto", image: "/partners/mano.jpeg" },
  { name: "Val2Events", image: "/partners/val2events.jpeg" },
  { name: "H & Hair", image: "/partners/h-hair.jpeg" },
  { name: "Universal Selfcare", image: "/partners/universal.jpeg" },
];

export const officialSchedule = [
  {
    day: "Pre-selections",
    date: "Avant janvier 2027",
    city: "Officiel",
    theme: "Detection des talents",
    color: "#C9A84C",
    events: [
      "Danse et musique",
      "Mode et art",
      "Entrepreneuriat et technologie",
      "Culture urbaine et sports mecaniques",
    ],
  },
  {
    day: "Etape Paris",
    date: "Janvier - fevrier 2027",
    city: "Paris",
    theme: "Showcases et rencontres",
    color: "#ff7b00",
    events: [
      "Showcases jeunes talents",
      "Panels culture et entrepreneuriat",
      "Rencontres partenaires",
      "Sessions media",
    ],
  },
  {
    day: "Etape Rome",
    date: "Mars - avril 2027",
    city: "Rome",
    theme: "Leadership et excellence",
    color: "#00c2ff",
    events: [
      "Talent talks",
      "Coaching et motivation",
      "Performances selectionnees",
      "Networking international",
    ],
  },
  {
    day: "Finalisation",
    date: "Avril 2027",
    city: "Europe",
    theme: "Mise en lumiere officielle",
    color: "#9b5cff",
    events: [
      "Annonce des talents retenus",
      "Accompagnement des profils",
      "Preparation media",
      "Prochaines etapes Festival Talent",
    ],
  },
];

export const festivalLocations = [
  {
    name: "Pre-selections officielles",
    city: "Avant janvier 2027",
    description:
      "Detection des talents dans les disciplines danse, musique, mode, art, entrepreneuriat, technologie, culture urbaine et sports mecaniques.",
  },
  {
    name: "Etape Paris",
    city: "Paris",
    description:
      "Showcases, rencontres partenaires, panels et sessions media pour ouvrir la tournee europeenne.",
  },
  {
    name: "Etape Rome",
    city: "Rome",
    description:
      "Leadership, coaching, performances selectionnees et networking international.",
  },
  {
    name: "Finalisation europeenne",
    city: "Avril 2027",
    description:
      "Mise en lumiere officielle des talents retenus et preparation des prochaines etapes.",
  },
];

export const locations = festivalLocations;
