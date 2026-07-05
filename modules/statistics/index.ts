export { getPublicPlatformStats } from "@/services/statistics";
export { getFestivalEventsCount } from "@/services/events";
export { createAnalyticsEvent, getAnalyticsProviders } from "@/services/analytics";
export type { AnalyticsEvent, AnalyticsEventName } from "@/types/analytics";

export const statisticsModule = {
  name: "statistics",
  sensitivity: "public",
  publicApi: true,
  status: "foundation",
} as const;
