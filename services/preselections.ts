import "server-only";
import { count, eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { candidates, disciplines, preselectionRegistrations } from "@/src/db/schema";
import type { PreselectionAggregate } from "@/types/preselections";

export async function getPreselectionsCount() {
  const [result] = await getDb().select({ value: count() }).from(preselectionRegistrations);
  return result?.value ?? 0;
}

export async function getPreselectionsByDiscipline(): Promise<PreselectionAggregate[]> {
  const rows = await getDb().select({ label: disciplines.name, count: count() }).from(preselectionRegistrations)
    .innerJoin(disciplines, eq(disciplines.id, preselectionRegistrations.disciplineId)).groupBy(disciplines.name);
  return rows;
}

export async function getPreselectionsByCity(): Promise<PreselectionAggregate[]> {
  const rows = await getDb().select({ label: candidates.city, count: count() }).from(preselectionRegistrations)
    .innerJoin(candidates, eq(candidates.id, preselectionRegistrations.candidateId)).groupBy(candidates.city);
  return rows.filter((row): row is { label: string; count: number } => Boolean(row.label));
}
