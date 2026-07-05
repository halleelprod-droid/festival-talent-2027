export {
  getPreselectionsByCity,
  getPreselectionsByDiscipline,
  getPreselectionsCount,
} from "@/services/preselections";
export type {
  PreselectionAggregate,
  PreselectionCandidate,
} from "@/types/preselections";

export const preselectionsModule = {
  name: "preselections",
  sensitivity: "private",
  publicApi: false,
  status: "foundation",
} as const;
