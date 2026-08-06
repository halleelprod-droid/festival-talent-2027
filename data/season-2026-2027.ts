export type SeasonEvent = {
  id: string;
  date: string;
  title: string;
  discipline: string;
  location: string;
  withSamba?: boolean;
  note?: string;
  partner?: string;
  partners?: string[];
};

export const seasonEvents: SeasonEvent[] = [
  { id: "battle-danse", date: "26 septembre 2026", title: "Finale nationale du Battle de danse", discipline: "Danse", location: "Monument de la Renaissance Africaine", withSamba: true },
  { id: "finale-peintres", date: "24 octobre 2026", title: "Finale nationale des peintres", discipline: "Peinture", location: "Centre culturel Douta Seck", withSamba: true },
  { id: "villa-influenceurs", date: "Début novembre 2026", title: "Villa des influenceurs", discipline: "Création digitale", location: "Lieu annoncé prochainement", note: "Une semaine de compétition entre créateurs de contenu." },
  { id: "lutte-traditionnelle", date: "22 novembre 2026", title: "Finale de lutte traditionnelle", discipline: "Lutte", location: "Plage de Malibu", withSamba: true, note: "Sous réserve de l’encadrement officiel de la Fédération Sénégalaise de Lutte." },
  { id: "showcase-influenceurs", date: "Fin novembre 2026", title: "Showcase des influenceurs", discipline: "Création digitale", location: "Grand Théâtre National" },
  { id: "mega-concert", date: "26 décembre 2026", title: "Méga concert", discipline: "Musique", location: "Esplanade du Grand Théâtre", withSamba: true, note: "Guests annoncés : Samba Peuzzi et Ibro Nadio." },
  { id: "karting-saly", date: "Janvier 2027", title: "Compétition de karting", discipline: "Karting", location: "Saly" },
  { id: "jet-ski-saly", date: "Février 2027", title: "Finale de Jet-Ski et croisière", discipline: "Sports nautiques", location: "Saly", note: "Croisière prévue dans l’après-midi.", partner: "XTREM JET SÉNÉGAL WATERSPORTS" },
  { id: "battle-saly", date: "Date à confirmer", title: "Battles de danse à Saly", discipline: "Danse", location: "Plage du Royal Saly, Saly", note: "Étape de danse organisée à Saly. Date à confirmer.", partners: ["CDUT", "MCU Dakar"] },
];

export const sambaJourneyEvents = seasonEvents.filter((event) => event.withSamba);
