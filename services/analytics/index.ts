import type { AnalyticsEvent } from "@/types/analytics";

export function createAnalyticsEvent(event: AnalyticsEvent) {
  return {
    ...event,
    timestamp: new Date().toISOString(),
  };
}

export function getAnalyticsProviders() {
  return ["google-analytics", "matomo", "plausible"] as const;
}
