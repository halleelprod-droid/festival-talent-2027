export const confirmedArtists = [
  {
    slug: "youssou-ndour",
    name: "Youssou Ndour",
    category: "Mbalax Legend",
    country: "Senegal",
    image: "/images/youssou.jpg",
    description:
      "Youssou Ndour rejoint la programmation officielle de Festival Talent 2027.",
  },
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
    slug: "sidiki-diabate",
    name: "Sidiki Diabate",
    category: "Afro / Mandingue",
    country: "Mali",
    image: "/images/sidiki.jpg",
    description:
      "Sidiki Diabate apporte une signature afro-mandingue a l'experience FT2027.",
  },
  {
    slug: "soprano",
    name: "Soprano",
    category: "International Rap",
    country: "France",
    image: "/images/soprano.jpg",
    description:
      "Soprano complete la dimension internationale de Festival Talent 2027.",
  },
  {
    slug: "amadeus",
    name: "Amadeus",
    category: "Live Performance",
    country: "International",
    image: "/images/amadeus.jpg",
    description:
      "Amadeus rejoint les artistes confirmes pour une performance live premium.",
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
      "Le festival se deroule principalement entre Dakar et Saly, avec une vision internationale.",
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
  "4 Jours Immersifs",
  "5 Artistes Confirmes",
  "Dakar + Saly",
  "Afrique - Europe",
];

export const festivalStats = [
  { value: "50K+", label: "Participants attendus" },
  { value: "4 jours", label: "Experience immersive" },
  { value: "5", label: "Artistes confirmes" },
  { value: "Global", label: "Audience internationale" },
];

export const partnerStats = [
  { value: "50K+", label: "Participants attendus" },
  { value: "5", label: "Artistes confirmes" },
  { value: "4 jours", label: "Experience immersive" },
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

export const partnersLogos = [
  { name: "Union Europeenne" },
  { name: "Mano Perfetto", image: "/partners/mano.jpeg" },
  { name: "Val2Events", image: "/partners/val2events.jpeg" },
  { name: "H & Hair", image: "/partners/h-hair.jpeg" },
  { name: "Universal Selfcare", image: "/partners/universal.jpeg" },
];

export const officialSchedule = [
  {
    day: "Jour 1",
    date: "10 juillet 2027",
    city: "Dakar",
    theme: "L'aiguille et le micro",
    color: "#C9A84C",
    events: [
      "Ceremonie d'ouverture",
      "Defile jeunes createurs",
      "Live painting",
      "Concerts d'ouverture",
    ],
  },
  {
    day: "Jour 2",
    date: "11 juillet 2027",
    city: "Dakar",
    theme: "Couleurs et sons",
    color: "#ff7b00",
    events: [
      "Village Talents",
      "Concours stylisme live",
      "Masterclass musique",
      "Scene ouverte",
    ],
  },
  {
    day: "Jour 3",
    date: "12 juillet 2027",
    city: "Saly",
    theme: "Moteurs et adrenaline",
    color: "#00c2ff",
    events: [
      "Village plage",
      "Experiences jeunesse",
      "Finales sportives",
      "Sunset concert",
    ],
  },
  {
    day: "Jour 4",
    date: "13 juillet 2027",
    city: "Dakar",
    theme: "Le Senegal de demain",
    color: "#9b5cff",
    events: [
      "Finale peinture",
      "Fashion week finale",
      "Grande parade",
      "Concert de cloture",
    ],
  },
];

export const festivalLocations = [
  {
    name: "Place du Souvenir",
    city: "Dakar",
    description: "Defiles, concerts et ceremonies officielles.",
  },
  {
    name: "Monument Renaissance",
    city: "Dakar",
    description: "Live painting, masterclass et village creatif.",
  },
  {
    name: "Circuit Saly",
    city: "Saly",
    description: "Experiences jeunesse, sport et adrenaline.",
  },
  {
    name: "Plage de Saly",
    city: "Saly",
    description: "Sunset concerts, DJ sets et village plage.",
  },
];
