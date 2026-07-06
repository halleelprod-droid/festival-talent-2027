export type TicketPassCategory =
  | "standard"
  | "premium"
  | "vip"
  | "partner"
  | "press"
  | "staff"
  | "artist"
  | "backstage";

export type TicketIconKey =
  | "ticket"
  | "sparkles"
  | "crown"
  | "handshake"
  | "newspaper"
  | "shield"
  | "mic"
  | "lock";

export type TicketPass = {
  id: TicketPassCategory;
  name: string;
  badge: string;
  description: string;
  benefits: string[];
  icon: TicketIconKey;
  color: "gold" | "white" | "red";
  ctaLabel: string;
  availability: "coming-soon" | "request-only" | "reserved";
  highlighted?: boolean;
};

export type TicketComparisonFeature = {
  label: string;
  standard: boolean;
  premium: boolean;
  vip: boolean;
};

export type TicketProcessStep = {
  title: string;
  description: string;
};

export type TicketPaymentMethod = {
  name: string;
  status: "coming-soon" | "planned";
  region: "local" | "international";
};

export type TicketAccountFeature = {
  title: string;
  description: string;
};

export type TicketFaqItem = {
  question: string;
  answer: string;
};

export type TicketFutureCapability = {
  title: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
};
