import "server-only";

import type { PreselectionAggregate } from "@/types/preselections";

/**
 * V6 preparatory service.
 *
 * These functions intentionally do not query Supabase yet. The admin route is
 * not authenticated, so returning real preselection data here would expose
 * private candidate information. Future versions should call Supabase only from
 * authenticated server code after admin roles and RLS are in place.
 */

export async function getPreselectionsCount(): Promise<number> {
  return 0;
}

export async function getPreselectionsByDiscipline(): Promise<
  PreselectionAggregate[]
> {
  return [];
}

export async function getPreselectionsByCity(): Promise<
  PreselectionAggregate[]
> {
  return [];
}
