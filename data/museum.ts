export type MuseumTimelineEntry = {
  period: string;
  title: string;
  description: string;
};

export type MuseumExhibit = {
  title: string;
  description: string;
  image?: string;
  status: "disponible" | "a-venir";
};

export type MuseumVideo = {
  title: string;
  src: string;
};

// Frise chronologique — jalons reels du projet (alignes sur data/program.ts).
export const museumTimeline: MuseumTimelineEntry[] = [
  {
    period: "Origines",
    title: "Naissance du projet",
    description:
      "Zairah Diamant Noire initie Festival Talent : une plateforme de revelation, d'accompagnement et de valorisation des talents.",
  },
  {
    period: "2026",
    title: "Pre-selections officielles",
    description:
      "Detection des talents dans les disciplines danse, musique, mode, art, entrepreneuriat, technologie, culture urbaine et sports mecaniques.",
  },
  {
    period: "Janvier - Fevrier 2027",
    title: "Etape Paris",
    description:
      "Showcases des jeunes talents, panels culture et entrepreneuriat, rencontres partenaires et sessions media.",
  },
  {
    period: "Mars - Avril 2027",
    title: "Etape Rome",
    description:
      "Talent talks, coaching, performances selectionnees et networking international.",
  },
  {
    period: "Avril 2027",
    title: "Finalisation europeenne",
    description:
      "Mise en lumiere officielle des talents retenus et annonce des laureats de l'edition 2027.",
  },
  {
    period: "Apres 2027",
    title: "Alumni & editions suivantes",
    description:
      "Les laureats rejoignent le Hall of Fame et ouvrent la voie aux editions 2028, 2029 et au-dela.",
  },
];

// Affiches officielles — structure prete ; les visuels definitifs
// de l'edition 2027 seront ajoutes par l'equipe communication.
export const museumPosters: MuseumExhibit[] = [
  {
    title: "Affiche officielle 2027",
    description:
      "L'identite visuelle de la premiere edition europeenne : Paris, Rome, noir et or.",
    image: "/images/festival-talent-logo.png",
    status: "disponible",
  },
  {
    title: "Affiche Battle All Style",
    description:
      "Le visuel officiel des battles par zones sera expose ici.",
    status: "a-venir",
  },
  {
    title: "Affiche du concert final",
    description:
      "L'affiche du concert de cloture sera devoilee avec la billetterie.",
    status: "a-venir",
  },
];

// Selection de photos d'archives (editions passees, 42 disponibles en galerie complete sur /media).
export const museumPhotos: string[] = [
  "/images/previous/gallery/festival-passe-01.jpg",
  "/images/previous/gallery/festival-passe-05.jpg",
  "/images/previous/gallery/festival-passe-10.jpg",
  "/images/previous/gallery/festival-passe-18.jpg",
  "/images/previous/gallery/festival-passe-21.jpg",
  "/images/previous/gallery/festival-passe-24.jpg",
  "/images/previous/gallery/festival-passe-29.jpg",
  "/images/previous/gallery/festival-passe-37.jpg",
];

// Trophees et distinctions de l'edition 2027 — remis lors de la finale.
export const museumTrophies: MuseumExhibit[] = [
  {
    title: "Trophee Battle All Style",
    description:
      "500.000 FCFA et un voyage en Italie pour le gagnant ou le groupe gagnant.",
    status: "a-venir",
  },
  {
    title: "Trophees des disciplines",
    description:
      "Danse, musique, mode, art, influence, entrepreneuriat : un trophee par discipline officielle.",
    status: "a-venir",
  },
  {
    title: "Prix du Public & Prix du Jury",
    description:
      "Les deux distinctions transversales de l'edition, exposees ici apres la finale.",
    status: "a-venir",
  },
];

export const museumVideos: MuseumVideo[] = [
  { title: "Archives — ambiance", src: "/videos/reel4.mp4" },
  { title: "Archives — performances", src: "/videos/reel5.mp4" },
  { title: "Archives — coulisses", src: "/videos/reel8.mp4" },
];
