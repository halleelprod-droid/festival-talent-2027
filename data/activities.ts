export type ActivityIconKey =
  | "car"
  | "crown"
  | "dumbbell"
  | "mic"
  | "palette"
  | "plane"
  | "shirt"
  | "theater"
  | "trophy"
  | "users"
  | "waves";

export type FestivalActivity = {
  title: string;
  date: string;
  location: string;
  info: string;
  meta: string[];
  icon: ActivityIconKey;
  accent: string;
};

export const festivalActivities: FestivalActivity[] = [
  {
    title: "Battle All Style",
    date: "A partir de septembre 2026",
    location: "Par zones",
    info:
      "Solos, groupes, tous styles, selection finale autour du Monument de la Renaissance.",
    meta: ["Frais : 2.000 FCFA", "Cagnotte : 500.000 FCFA", "Prix : voyage en Italie"],
    icon: "trophy",
    accent: "from-red-500/20 to-yellow-400/10",
  },
  {
    title: "Peintres / Designer",
    date: "Octobre 2026",
    location: "Centre Culturel Douta Seck",
    info:
      "Mise en lumiere, integration dans le festival, opportunites et rencontres.",
    meta: ["Ateliers", "Masterclass", "Selection creative"],
    icon: "palette",
    accent: "from-yellow-400/20 to-white/5",
  },
  {
    title: "Jet Ski",
    date: "Novembre 2026",
    location: "Plage de Saly, Senegal",
    info:
      "Demonstrations, initiations, animations nautiques et village partenaires.",
    meta: ["Duree : 1 semaine strategique", "Animations", "Nautisme"],
    icon: "waves",
    accent: "from-cyan-400/15 to-yellow-400/10",
  },
  {
    title: "Karting",
    date: "Mars 2027",
    location: "Saly, Senegal",
    info:
      "Courses, exposition de karts, innovations, animations, stands et cadeaux.",
    meta: ["Entree gratuite", "Exposition", "Sports mecaniques"],
    icon: "car",
    accent: "from-red-500/20 to-white/5",
  },
  {
    title: "Fashion Week",
    date: "Decembre 2026",
    location: "Senegal",
    info:
      "Castings, ateliers design, defiles et selection de createurs.",
    meta: ["Mode", "Design", "Defiles"],
    icon: "shirt",
    accent: "from-pink-400/15 to-yellow-400/10",
  },
  {
    title: "Musique",
    date: "Janvier 2027",
    location: "Regions & scenes partenaires",
    info:
      "Castings regionaux, bootcamps, concerts de preselection et selection d'artistes.",
    meta: ["Bootcamps", "Showcases", "Artistes"],
    icon: "mic",
    accent: "from-yellow-400/20 to-red-500/10",
  },
  {
    title: "Influenceurs",
    date: "Novembre 2026",
    location: "Digital & terrain",
    info:
      "Formations, creation de contenu, showcases et selection d'influenceurs.",
    meta: ["Contenu", "Formation", "Influence"],
    icon: "users",
    accent: "from-white/10 to-yellow-400/10",
  },
  {
    title: "Lutte senegalaise",
    date: "Mars 2027",
    location: "Senegal",
    info:
      "Tournois regionaux, demi-finales, finales et valorisation des champions.",
    meta: ["Tournois", "Finales", "Champions"],
    icon: "dumbbell",
    accent: "from-red-500/20 to-yellow-400/10",
  },
  {
    title: "Theatre & Peinture",
    date: "Fevrier 2027",
    location: "Espaces culturels",
    info:
      "Castings, ateliers theatre, creation, exposition et selection.",
    meta: ["Theatre", "Exposition", "Creation"],
    icon: "theater",
    accent: "from-yellow-400/20 to-white/5",
  },
  {
    title: "Italie",
    date: "Mars 2027",
    location: "Italie",
    info:
      "Voyage, installation de la delegation et participation au Festival Talent en Italie.",
    meta: ["Delegation", "Networking", "International"],
    icon: "plane",
    accent: "from-green-400/15 to-yellow-400/10",
  },
  {
    title: "Concert Final",
    date: "15 mai 2027",
    location: "Casino de Paris",
    info:
      "Concert final, celebration des talents et cloture officielle.",
    meta: ["Casino de Paris", "Cloture", "Celebration"],
    icon: "crown",
    accent: "from-yellow-400/25 to-red-500/10",
  },
];
