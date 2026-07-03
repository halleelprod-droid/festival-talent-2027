import { getConfirmedArtistsCount } from "@/services/artists";
import { getFestivalActivitiesCount } from "@/services/activities";
import { getOfficialPartnersCount } from "@/services/partners";

export function getPublicPlatformStats() {
  return {
    expectedTalents: "50K+",
    disciplines: "8+",
    zones: "12",
    activities: String(getFestivalActivitiesCount()),
    partners: String(getOfficialPartnersCount()),
    confirmedArtists: String(getConfirmedArtistsCount()),
  };
}
