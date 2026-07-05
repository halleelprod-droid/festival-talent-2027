export { getConfirmedArtists, getConfirmedArtistsCount } from "@/services/artists";
export { confirmedArtists, artistsData, featuredArtists } from "@/data/artists";

export const artistsModule = {
  name: "artists",
  sensitivity: "public",
  publicApi: true,
  status: "active",
} as const;
