export { getPublicPlatformStats } from "@/services/statistics";

export const dashboardModule = {
  name: "dashboard",
  sensitivity: "protected",
  publicApi: false,
  status: "foundation",
} as const;
