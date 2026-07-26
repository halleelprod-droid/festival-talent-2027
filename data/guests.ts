// Invités (guests) liés au concert final du Festival Talent 2027.
// Volontairement séparés des artistes têtes d'affiche confirmés
// (Samba Peuzzi, Morijah, Cysoul) qui vivent dans `data/artists.ts`.

export type Guest = {
  name: string;
  fullName?: string;
  role: string;
  status: string;
  event: string;
  category?: string;
  image: string;
  objectPosition?: "center top" | "center center";
  instagram?: string;
  instagramHandle?: string;
  featured?: boolean;
};

export const finalConcertGuests: Guest[] = [
  {
    name: "Jarrah",
    role: "Artiste",
    status: "Invitée spéciale",
    event: "Concert final",
    category: "Musique",
    image: "/images/guests/jarrah.jpg",
    objectPosition: "center top",
    instagram: "https://www.instagram.com/jarrah_lofficiel/",
    instagramHandle: "@jarrah_lofficiel",
    featured: true,
  },
  {
    name: "Alex Danseur",
    fullName: "Moustapha Diop",
    role: "Danseur et chorégraphe",
    status: "Guest",
    event: "Concert final",
    category: "Danse",
    image: "/images/guests/alex-danseur.jpg",
    objectPosition: "center top",
    instagram: "https://www.instagram.com/alexdanseur/",
    instagramHandle: "@alexdanseur",
  },
  {
    name: "Bendo Dance",
    role: "Groupe de danse",
    status: "Guests",
    event: "Concert final",
    category: "Danse",
    image: "/images/guests/bendo-dance.jpg",
    objectPosition: "center center",
    instagram: "https://www.instagram.com/bendo_dance1_officiel/",
    instagramHandle: "@bendo_dance1_officiel",
  },
];
