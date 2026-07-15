export type ImpactStatistic = {
  key: "talents" | "regions" | "partners" | "volunteers" | "coaches" | "visitors";
  value: number;
  label: string;
  suffix?: string;
};

export const platformImpactStatistics: ImpactStatistic[] = [
  { key: "talents", value: 1000, label: "Talents accompagnes" },
  { key: "regions", value: 14, label: "Regions representees" },
  { key: "partners", value: 50, label: "Partenaires" },
  { key: "volunteers", value: 500, label: "Benevoles" },
  { key: "coaches", value: 100, label: "Coachs" },
  { key: "visitors", value: 100000, label: "Visiteurs" },
];
