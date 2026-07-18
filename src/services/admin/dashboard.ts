import "server-only";

import { and, count, countDistinct, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { getDb } from "@/src/db";
import { candidateDuplicateReviews, candidates, disciplines, messageLogs, preselectionRegistrations } from "@/src/db/schema";
import { maskPhone } from "@/src/lib/security";
import { calculateAgeOnDate } from "@/src/lib/candidate-date-of-birth";
import { currentEdition } from "@/src/config/edition";
import { summarizeConfirmationStatuses } from "@/src/services/messaging/status-summary";

export type CandidateFilters = { page?: string; q?: string; status?: string; discipline?: string; city?: string };
const PAGE_SIZE = 20;

export async function getDashboardData(filters: CandidateFilters) {
  const db = getDb();
  const page = Math.max(1, Number.parseInt(filters.page || "1", 10) || 1);
  const conditions: SQL[] = [];
  if (filters.q?.trim()) conditions.push(or(ilike(candidates.fullName, `%${filters.q.trim()}%`), ilike(candidates.city, `%${filters.q.trim()}%`))!);
  if (filters.status) conditions.push(eq(preselectionRegistrations.status, filters.status as typeof preselectionRegistrations.status.enumValues[number]));
  if (filters.discipline) conditions.push(eq(disciplines.slug, filters.discipline));
  if (filters.city) conditions.push(eq(candidates.city, filters.city));
  const where = conditions.length ? and(...conditions) : undefined;

  const base = db.select({
    id: candidates.id, name: candidates.fullName, phone: candidates.phoneNormalized, phoneValid: candidates.phoneValid,
    dateOfBirth: candidates.dateOfBirth, city: candidates.city, discipline: disciplines.name,
    status: preselectionRegistrations.status, submittedAt: preselectionRegistrations.submittedAt,
  }).from(preselectionRegistrations)
    .innerJoin(candidates, eq(candidates.id, preselectionRegistrations.candidateId))
    .leftJoin(disciplines, eq(disciplines.id, preselectionRegistrations.disciplineId));

  const [rows, [totalRow], [candidateCount], [registrationCount], [cityCount], [disciplineCount], [validCount], [invalidCount], [duplicateCount], messageStatuses, statuses, cities, disciplineOptions] = await Promise.all([
    base.where(where).orderBy(desc(preselectionRegistrations.submittedAt)).limit(PAGE_SIZE).offset((page - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(preselectionRegistrations).innerJoin(candidates, eq(candidates.id, preselectionRegistrations.candidateId)).leftJoin(disciplines, eq(disciplines.id, preselectionRegistrations.disciplineId)).where(where),
    db.select({ value: count() }).from(candidates),
    db.select({ value: count() }).from(preselectionRegistrations),
    db.select({ value: countDistinct(candidates.city) }).from(candidates),
    db.select({ value: count() }).from(disciplines).where(eq(disciplines.active, true)),
    db.select({ value: count() }).from(candidates).where(eq(candidates.phoneValid, true)),
    db.select({ value: count() }).from(candidates).where(eq(candidates.phoneValid, false)),
    db.select({ value: count() }).from(candidateDuplicateReviews).where(eq(candidateDuplicateReviews.status, "pending")),
    db.select({ status: messageLogs.status, value: count() }).from(messageLogs).groupBy(messageLogs.status),
    db.select({ status: preselectionRegistrations.status, value: count() }).from(preselectionRegistrations).groupBy(preselectionRegistrations.status),
    db.selectDistinct({ city: candidates.city }).from(candidates).orderBy(candidates.city),
    db.select({ slug: disciplines.slug, name: disciplines.name }).from(disciplines).where(eq(disciplines.active, true)).orderBy(disciplines.name),
  ]);

  // Route admin protégée (session + rôle) : la date de naissance complète peut être
  // exposée ici, accompagnée de l'âge calculé (jamais persisté) et d'un indicateur
  // de revue quand la date manque. Les routes publiques ne l'exposent jamais.
  const referenceDate = currentEdition.ageReferenceDate;
  return {
    page, pageSize: PAGE_SIZE, total: totalRow?.value ?? 0, ageReferenceDate: referenceDate,
    candidates: rows.map((row) => ({
      ...row,
      phone: maskPhone(row.phone),
      calculatedAge: row.dateOfBirth ? calculateAgeOnDate(row.dateOfBirth, referenceDate) : null,
      requiresBirthDateReview: !row.dateOfBirth,
    })),
    stats: {
      candidates: candidateCount?.value ?? 0, registrations: registrationCount?.value ?? 0,
      cities: cityCount?.value ?? 0, disciplines: disciplineCount?.value ?? 0,
      validPhones: validCount?.value ?? 0, invalidPhones: invalidCount?.value ?? 0,
      duplicates: duplicateCount?.value ?? 0,
      ...summarizeConfirmationStatuses(messageStatuses),
    },
    statuses, cities: cities.map((item) => item.city).filter(Boolean) as string[], disciplineOptions,
  };
}
