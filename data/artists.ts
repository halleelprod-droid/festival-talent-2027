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
