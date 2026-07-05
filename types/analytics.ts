export type AnalyticsProvider = "google-analytics" | "matomo" | "plausible";

export type AnalyticsEventName =
  | "cta_click"
  | "conversion"
  | "download"
  | "preselection_start"
  | "preselection_submit"
  | "partner_interest";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  provider?: AnalyticsProvider;
  route: string;
  label?: string;
  value?: string | number;
  metadata?: Record<string, string | number | boolean>;
};
