export type Destination = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  status: string;
};

export const internationalDestinations: Destination[] = [
  { slug: "senegal", name: "Sénégal", subtitle: "La naissance des talents", description: "Le Sénégal accueille les présélections, les battles, les castings, les formations et les premières grandes rencontres de l'édition.", status: "Présélections ouvertes" },
  { slug: "paris", name: "Paris", subtitle: "La connexion aux opportunités", description: "Paris devient une étape de visibilité, de rencontres professionnelles, de création, de mode, de musique et de connexion avec les diasporas et les industries culturelles.", status: "Événements 2027 en préparation" },
  { slug: "rome", name: "Rome", subtitle: "Le dialogue des cultures", description: "Rome accueille une expérience mêlant création, patrimoine, design, cinéma, gastronomie et collaborations artistiques entre l'Afrique et l'Europe.", status: "Programmation prochainement dévoilée" },
];

export const internationalDisciplines = [
  "Musique", "Danse", "Mode", "Cinéma & création visuelle", "Technologie & innovation", "Entrepreneuriat", "Automobile & culture moteur", "Gastronomie & patrimoine",
];

export const talentJourney = ["Candidater", "Être repéré", "Se former", "Se produire", "Se connecter", "Rayonner"];

export const internationalProgramme = internationalDestinations.map((destination) => ({
  destination: destination.name,
  phase: destination.slug === "senegal" ? "Phase de détection et de sélection" : destination.slug === "paris" ? "Phase de visibilité et de connexion" : "Phase culturelle et créative",
}));
