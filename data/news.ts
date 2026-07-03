export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "festival-talent-2027-devoile-ses-activites",
    title: "Festival Talent 2027 devoile ses activites",
    date: "2026-07-03",
    category: "Activites",
    excerpt:
      "Battle All Style, mode, musique, entrepreneuriat, technologie, culture urbaine et sports mecaniques structurent la nouvelle plateforme Festival Talent.",
    body:
      "La programmation s'etend au-dela d'une vitrine evenementielle pour installer un ecosysteme durable de detection, d'accompagnement et de mise en lumiere des talents.",
    ctaLabel: "Voir les activites",
    ctaHref: "/activites",
    featured: true,
  },
  {
    slug: "preselections-plusieurs-secteurs",
    title: "Les pre-selections s'etendent a plusieurs secteurs",
    date: "2026-07-02",
    category: "Pre-selections",
    excerpt:
      "Les appels a talents couvrent la danse, la musique, la mode, l'art, l'entrepreneuriat, la technologie, la culture urbaine et les sports mecaniques.",
    body:
      "Festival Talent 2027 prepare une detection progressive par secteurs afin d'identifier des profils solides avant les etapes internationales.",
    ctaLabel: "S'inscrire",
    ctaHref: "/preselections",
  },
  {
    slug: "samba-peuzzi-morijah-cysoul-confirmes",
    title: "Samba Peuzzi, Morijah et Cysoul confirmes",
    date: "2026-07-01",
    category: "Artistes",
    excerpt:
      "Trois artistes confirmes portent l'energie musicale officielle de Festival Talent 2027.",
    body:
      "Samba Peuzzi, Morijah et Cysoul rejoignent officiellement l'aventure, avec une programmation qui continuera d'evoluer par annonces validees.",
    ctaLabel: "Voir les artistes",
    ctaHref: "/artists",
  },
  {
    slug: "pin-events-rejoint-aventure",
    title: "PIN EVENTS rejoint l'aventure",
    date: "2026-06-30",
    category: "Partenaires",
    excerpt:
      "PIN EVENTS accompagne Festival Talent 2027 sur la production evenementielle, les partenariats et les relations institutionnelles.",
    body:
      "Sous l'impulsion de Pierre Ndiaye, PIN EVENTS renforce la structuration terrain et institutionnelle du projet.",
    ctaLabel: "Decouvrir les partenaires",
    ctaHref: "/partners",
  },
  {
    slug: "sen-influenceurs-partenaire-media-officiel",
    title: "Sen Influenceurs partenaire media officiel",
    date: "2026-06-29",
    category: "Media",
    excerpt:
      "Sen Influenceurs devient partenaire media officiel pour amplifier les annonces, les contenus et la visibilite des talents.",
    body:
      "Ce partenariat installe une couverture digitale continue autour des temps forts, des pre-selections, des partenaires et des talents.",
    ctaLabel: "Voir les medias",
    ctaHref: "/media",
  },
];
