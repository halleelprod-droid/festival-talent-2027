export { getFestivalActivities, getFestivalActivitiesCount } from "@/services/activities";
export { festivalActivities } from "@/data/activities";

export const activitiesModule = {
  name: "activities",
  sensitivity: "public",
  publicApi: true,
  status: "active",
} as const;
