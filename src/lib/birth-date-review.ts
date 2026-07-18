// Logique pure du flux de collecte des dates de naissance historiques.
// Aucune I/O, aucune connexion base : entièrement testable.

import {
  calculateAgeOnDate,
  currentCivilDateUtc,
  isCandidateAgeEligible,
  isDateOfBirthInFuture,
  isValidCivilDate,
} from "@/src/lib/candidate-date-of-birth";
import { currentEdition } from "@/src/config/edition";

export const REVIEW_COLUMNS = [
  "review_id", "source_row", "masked_name", "masked_phone", "masked_email",
  "discipline", "historical_age", "date_of_birth", "verification_method",
  "verification_status", "review_notes",
] as const;

export const REVIEW_MAP_COLUMNS = [
  "review_id", "candidate_id", "registration_id", "source_row", "source_fingerprint",
] as const;

export const ALLOWED_VERIFICATION_METHODS = [
  "candidate_confirmation", "identity_document", "parent_or_guardian_confirmation",
  "registration_form", "other_verified_source",
] as const;

export const ALLOWED_VERIFICATION_STATUSES = [
  "pending", "verified", "rejected", "needs_follow_up",
] as const;

// Raisons qui empêchent une ligne d'être « prête » pour la mise à jour.
const BLOCKING_REASONS = new Set([
  "unknown_review_id", "duplicate_review_id", "duplicate_candidate_target",
  "invalid_status", "missing_verification_method", "invalid_verification_method",
  "missing_date_of_birth", "invalid_date_of_birth", "future_date_of_birth",
  "candidate_age_not_eligible", "verification_not_verified",
]);

export type ReviewRow = Record<string, string>;

export type ReviewRowResult = {
  reviewId: string;
  sourceRow: string;
  ready: boolean;
  reasonCodes: string[];
};

export function generateReviewId(index: number): string {
  return `FT-DOB-${String(index + 1).padStart(4, "0")}`;
}

export function validateReviewRows(
  rows: ReviewRow[],
  options: { knownIds?: Set<string>; referenceDate?: string; today?: string } = {},
) {
  const referenceDate = options.referenceDate ?? currentEdition.ageReferenceDate;
  const today = options.today ?? currentCivilDateUtc();
  const seenIds = new Set<string>();
  const seenTargets = new Set<string>();

  const counters = {
    total: rows.length, pending: 0, verified: 0, validDates: 0, invalidDates: 0,
    futureDates: 0, unknownIds: 0, duplicateIds: 0, missingMethods: 0,
    invalidStatuses: 0, historicalMismatch: 0, eligible: 0, notEligible: 0,
    ready: 0, blocked: 0,
  };

  const results: ReviewRowResult[] = rows.map((row) => {
    const reasonCodes: string[] = [];
    const reviewId = (row.review_id ?? "").trim();
    const sourceRow = (row.source_row ?? "").trim();
    const status = (row.verification_status ?? "").trim();
    const method = (row.verification_method ?? "").trim();
    const dob = (row.date_of_birth ?? "").trim();
    const historicalAge = (row.historical_age ?? "").trim();

    if (options.knownIds && !options.knownIds.has(reviewId)) { reasonCodes.push("unknown_review_id"); counters.unknownIds += 1; }
    if (reviewId) {
      if (seenIds.has(reviewId)) { reasonCodes.push("duplicate_review_id"); counters.duplicateIds += 1; }
      else seenIds.add(reviewId);
    }
    // Deux lignes ciblant la même inscription source = même candidat visé.
    if (sourceRow) {
      if (seenTargets.has(sourceRow)) reasonCodes.push("duplicate_candidate_target");
      else seenTargets.add(sourceRow);
    }

    if (!ALLOWED_VERIFICATION_STATUSES.includes(status as (typeof ALLOWED_VERIFICATION_STATUSES)[number])) {
      reasonCodes.push("invalid_status"); counters.invalidStatuses += 1;
    } else if (status === "pending") {
      counters.pending += 1;
    } else if (status === "verified") {
      counters.verified += 1;
    }
    if (status && status !== "verified") reasonCodes.push("verification_not_verified");

    if (method && !ALLOWED_VERIFICATION_METHODS.includes(method as (typeof ALLOWED_VERIFICATION_METHODS)[number])) {
      reasonCodes.push("invalid_verification_method");
    }
    if (status === "verified" && !method) { reasonCodes.push("missing_verification_method"); counters.missingMethods += 1; }

    if (!dob) {
      // Une ligne « verified » sans date est incohérente ; sinon simplement en attente.
      if (status === "verified") reasonCodes.push("missing_date_of_birth");
    } else if (!isValidCivilDate(dob)) {
      reasonCodes.push("invalid_date_of_birth"); counters.invalidDates += 1;
    } else if (isDateOfBirthInFuture(dob, today)) {
      reasonCodes.push("future_date_of_birth"); counters.futureDates += 1;
    } else {
      counters.validDates += 1;
      if (isCandidateAgeEligible({ dateOfBirth: dob, referenceDate })) counters.eligible += 1;
      else { reasonCodes.push("candidate_age_not_eligible"); counters.notEligible += 1; }
      // Cohérence avec l'âge historique : signal non bloquant.
      if (historicalAge && Number.isInteger(Number(historicalAge))) {
        const age = calculateAgeOnDate(dob, referenceDate);
        if (age !== null && age !== Number(historicalAge)) {
          reasonCodes.push("historical_age_mismatch"); counters.historicalMismatch += 1;
        }
      }
    }

    const hasBlocking = reasonCodes.some((code) => BLOCKING_REASONS.has(code));
    const ready = status === "verified" && !hasBlocking;
    if (ready) counters.ready += 1; else counters.blocked += 1;

    return { reviewId, sourceRow, ready, reasonCodes };
  });

  return { results, counters };
}

// Idempotence de la mise à jour d'une date de naissance en base.
export function classifyUpdate(currentDateOfBirth: string | null, newDateOfBirth: string):
  "would_update" | "already_up_to_date" | "conflict" {
  if (!currentDateOfBirth) return "would_update";
  if (currentDateOfBirth === newDateOfBirth) return "already_up_to_date";
  return "conflict";
}

// Écriture réelle uniquement si les DEUX options explicites sont présentes.
export function resolveExecutionMode(args: Iterable<string>): "dry-run" | "execute" {
  const set = new Set(args);
  const execute = set.has("--execute");
  const confirm = set.has("--confirm-birth-date-update");
  if (execute && confirm) return "execute";
  if (execute || confirm) throw new Error("both_flags_required: --execute et --confirm-birth-date-update sont requis ensemble.");
  return "dry-run";
}

// Entrée d'audit SANS date de naissance en clair.
export function buildBirthDateAuditEntry(input: {
  candidateId: string; reviewId: string; verificationMethod: string; source: string; adminUserId: string;
}) {
  return {
    action: "candidate_birth_date_verified" as const,
    entityType: "candidate" as const,
    entityId: input.candidateId,
    metadata: {
      reviewId: input.reviewId,
      verificationMethod: input.verificationMethod,
      source: input.source,
      adminUserId: input.adminUserId,
      changedFields: ["date_of_birth"],
    },
  };
}

export function validateReviewMapRows(rows: ReviewRow[], reviewRows: ReviewRow[] = []) {
  const missingColumns = REVIEW_MAP_COLUMNS.filter((column) => rows.length === 0 || !(column in rows[0]));
  const knownIds = new Set<string>();
  const targets = new Set<string>();
  const errors: string[] = missingColumns.map((column) => `missing_map_column:${column}`);
  const mapByReviewId = new Map<string, ReviewRow>();

  rows.forEach((row) => {
    const reviewId = (row.review_id ?? "").trim();
    const candidateId = (row.candidate_id ?? "").trim();
    const sourceRow = (row.source_row ?? "").trim();
    if (!reviewId) errors.push("missing_map_review_id");
    else if (knownIds.has(reviewId)) errors.push(`duplicate_map_review_id:${reviewId}`);
    else {
      knownIds.add(reviewId);
      mapByReviewId.set(reviewId, row);
    }
    if (!/^\d+$/.test(sourceRow) || Number(sourceRow) < 2) errors.push(`invalid_map_source_row:${reviewId || "unknown"}`);
    const target = candidateId ? `candidate:${candidateId}` : sourceRow ? `source:${sourceRow}` : "";
    if (!target) errors.push(`missing_map_target:${reviewId || "unknown"}`);
    else if (targets.has(target)) errors.push(`duplicate_map_target:${reviewId || "unknown"}`);
    else targets.add(target);
  });

  reviewRows.forEach((reviewRow) => {
    const reviewId = (reviewRow.review_id ?? "").trim();
    const reviewSourceRow = (reviewRow.source_row ?? "").trim();
    const mapRow = mapByReviewId.get(reviewId);
    if (mapRow && (mapRow.source_row ?? "").trim() !== reviewSourceRow) {
      errors.push(`map_source_row_mismatch:${reviewId || "unknown"}`);
    }
  });

  return { errors, knownIds, mapByReviewId };
}
