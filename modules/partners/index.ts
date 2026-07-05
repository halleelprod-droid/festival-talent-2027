export { getOfficialPartners, getOfficialPartnersCount } from "@/services/partners";
export { officialPartners, partnersLogos, partnerStats, sponsorOpportunities } from "@/data/partners";

export const partnersModule = {
  name: "partners",
  sensitivity: "public",
  publicApi: true,
  status: "active",
} as const;
