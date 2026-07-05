export type FestivalEventKind =
  | "battle"
  | "concert"
  | "karting"
  | "jet-ski"
  | "masterclass"
  | "defile"
  | "conference"
  | "projection"
  | "networking";

export type FestivalEventStatus =
  | "draft"
  | "announced"
  | "open"
  | "sold-out"
  | "completed"
  | "cancelled";

export type FestivalEvent = {
  id: string;
  editionId: string;
  slug: string;
  kind: FestivalEventKind;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  images: string[];
  sponsors: string[];
  partners: string[];
  cta: {
    label: string;
    href: string;
  };
  status: FestivalEventStatus;
};
