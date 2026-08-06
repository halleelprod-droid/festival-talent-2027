// Logique pure du flux de revue humaine des inscriptions historiques avant
// import local. Aucune I/O, aucune connexion base : entièrement testable.
//
// Ce flux prépare trois volets de décision humaine :
//   1. date de naissance manquante (la table historique ne stocke qu'un `age`) ;
//   2. téléphones invalides ;
//   3. doublons potentiels.
//
// Règle cardinale : aucune date de naissance n'est jamais fabriquée ni dérivée
// de l'âge. Aucune fusion de doublon automatique. Aucune correction de téléphone
// automatique. Toutes les valeurs corrigées sont saisies par un humain.

import {
  calculateAgeOnDate,
  currentCivilDateUtc,
  isCandidateAgeEligible,
  isDateOfBirthInFuture,
  isValidDateOfBirthForRegistration,
} from "@/src/lib/candidate-date-of-birth";
import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
import { PRESELECTION_DISCIPLINES } from "@/src/validation/preselection";
import { currentEdition } from "@/src/config/edition";
import type { PreparedPreselection } from "@/src/import/preselections";

// --- Colonnes des fichiers privés (hors Git) ---------------------------------

export const HUMAN_REVIEW_COLUMNS = [
  "review_id", "source_id", "full_name", "phone_original", "phone_normalized", "phone_status",
  "email", "age_legacy", "date_of_birth", "discipline", "created_at",
  "duplicate_group_id", "duplicate_reason", "review_status", "review_decision", "review_notes",
] as const;

export const INVALID_PHONE_COLUMNS = [
  "review_id", "source_id", "phone_original", "phone_status", "suggested_format",
  "review_decision", "review_notes",
] as const;

export const DUPLICATE_REVIEW_COLUMNS = [
  "duplicate_group_id", "review_id", "source_id", "match_type", "match_strength",
  "created_at", "review_decision", "review_notes",
] as const;

// --- Vocabulaires de décision ------------------------------------------------

// Statut initial d'une ligne de revue (jamais « approved » d'emblée).
export const INITIAL_REVIEW_STATUSES = [
  "pending_birth_date", "invalid_phone", "duplicate_review", "multiple_issues",
] as const;

// Décision globale d'une ligne (colonne review_decision du fichier maître).
export const ROW_REVIEW_DECISIONS = ["approved", "rejected", "hold"] as const;

// Décisions autorisées pour un téléphone invalide.
export const PHONE_DECISIONS = [
  "confirmed_valid", "corrected", "unreachable", "invalid", "needs_contact",
] as const;

// Statut téléphone acceptable pour un import (après décision humaine).
const PHONE_STATUS_OK = new Set(["valid", "confirmed_valid", "corrected"]);

// Décisions autorisées pour un doublon.
export const DUPLICATE_DECISIONS = [
  "same_person_keep_oldest", "same_person_keep_latest", "same_person_merge_manually",
  "distinct_people", "invalid_duplicate", "unresolved",
] as const;

// Un doublon est considéré résolu (non bloquant) pour ces décisions.
const DUPLICATE_RESOLVED = new Set([
  "same_person_keep_oldest", "same_person_keep_latest", "same_person_merge_manually",
  "distinct_people", "invalid_duplicate",
]);

// Tolérance documentée entre l'âge recalculé (date de référence) et l'âge
// historique. L'âge historique a pu être saisi à un instant antérieur à la date
// de référence : un écart de 1 an est plausible. Au-delà, on marque `age_mismatch`
// et on EXIGE une revue humaine — jamais de correction silencieuse de la date.
export const AGE_MISMATCH_TOLERANCE_YEARS = 1;

const RECOGNIZED_DISCIPLINES = new Set<string>(PRESELECTION_DISCIPLINES as readonly string[]);

// Date de bascule ancien/nouveau : les inscriptions créées après cette date sont
// les « nouvelles » (postérieures à l'export local des 31).
export const NEW_REGISTRATION_CUTOFF = "2026-07-17";

export type ReviewRow = Record<string, string>;

export function generateReviewId(index: number): string {
  return `FT-PSR-${String(index + 1).padStart(4, "0")}`;
}

function generateDuplicateGroupId(index: number): string {
  return `DUP-${String(index + 1).padStart(4, "0")}`;
}

const MATCH_TYPE_BY_REASON: Record<string, string> = {
  phone: "phone_identical",
  email: "email_identical",
  name_city: "name_and_city",
};

// --- Regroupement des doublons (union-find) ----------------------------------

type DuplicateSignal = { first: number; second: number; reason: string; score: number };

export function buildDuplicateGroups(size: number, signals: DuplicateSignal[]) {
  const parent = Array.from({ length: size }, (_, i) => i);
  const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const union = (a: number, b: number) => { parent[find(a)] = find(b); };
  const reasonsByPair = new Map<string, { reasons: Set<string>; score: number }>();

  for (const signal of signals) {
    union(signal.first, signal.second);
    for (const idx of [signal.first, signal.second]) {
      const key = String(idx);
      const entry = reasonsByPair.get(key) ?? { reasons: new Set<string>(), score: 0 };
      entry.reasons.add(signal.reason);
      entry.score = Math.max(entry.score, signal.score);
      reasonsByPair.set(key, entry);
    }
  }

  // Indices réellement impliqués dans au moins un signal.
  const involved = new Set<number>();
  for (const signal of signals) { involved.add(signal.first); involved.add(signal.second); }

  const rootToGroup = new Map<number, string>();
  let counter = 0;
  const groupIdByIndex = new Map<number, string>();
  const matchTypeByIndex = new Map<number, string>();
  const scoreByIndex = new Map<number, number>();

  for (const idx of [...involved].sort((a, b) => a - b)) {
    const root = find(idx);
    if (!rootToGroup.has(root)) rootToGroup.set(root, generateDuplicateGroupId(counter++));
    groupIdByIndex.set(idx, rootToGroup.get(root)!);
    const meta = reasonsByPair.get(String(idx));
    const reasons = meta ? [...meta.reasons].sort() : [];
    matchTypeByIndex.set(idx, reasons.map((r) => MATCH_TYPE_BY_REASON[r] ?? r).join("|"));
    scoreByIndex.set(idx, meta?.score ?? 0);
  }

  return {
    groupCount: rootToGroup.size,
    involvedCount: involved.size,
    groupIdByIndex,
    matchTypeByIndex,
    scoreByIndex,
  };
}

// --- Construction des fichiers de revue --------------------------------------

export type HumanReviewBuild = {
  reviewRows: string[][];
  phoneRows: string[][];
  duplicateRows: string[][];
  summary: {
    total: number;
    missingDob: number;
    invalidPhones: number;
    duplicateGroups: number;
    rowsInDuplicateGroups: number;
    duplicateSignals: number;
    multipleIssues: number;
    newRegistrations: number;
    rowsReady: number;
    rowsBlocked: number;
  };
};

export function buildHumanReview(
  prepared: PreparedPreselection[],
  duplicateSignals: DuplicateSignal[],
): HumanReviewBuild {
  const groups = buildDuplicateGroups(prepared.length, duplicateSignals);

  let missingDob = 0, invalidPhones = 0, multipleIssues = 0, newRegistrations = 0;

  const reviewRows: string[][] = [];
  const phoneRows: string[][] = [];
  const duplicateRows: string[][] = [];

  prepared.forEach((item, index) => {
    const reviewId = generateReviewId(index);
    const createdAtIso = item.createdAt instanceof Date && !Number.isNaN(item.createdAt.getTime())
      ? item.createdAt.toISOString()
      : "";
    const dupGroupId = groups.groupIdByIndex.get(index) ?? "";
    const matchType = groups.matchTypeByIndex.get(index) ?? "";
    const phoneOk = item.phoneValid;

    // Problèmes détectés (la date manquante est toujours présente sur ce jeu).
    const problems: string[] = [];
    if (!item.dateOfBirth) { problems.push("birth_date"); missingDob += 1; }
    if (!phoneOk) { problems.push("phone"); invalidPhones += 1; }
    if (dupGroupId) problems.push("duplicate");

    let reviewStatus: string;
    if (problems.length > 1) { reviewStatus = "multiple_issues"; multipleIssues += 1; }
    else if (problems[0] === "phone") reviewStatus = "invalid_phone";
    else if (problems[0] === "duplicate") reviewStatus = "duplicate_review";
    else reviewStatus = "pending_birth_date";

    if (createdAtIso && createdAtIso.slice(0, 10) > NEW_REGISTRATION_CUTOFF) newRegistrations += 1;

    reviewRows.push([
      reviewId,
      item.legacyId,
      item.fullName,
      item.phoneRaw,
      item.phoneNormalized ?? "",
      phoneOk ? "valid" : "invalid",
      item.email ?? "",
      item.historicalAge === null ? "" : String(item.historicalAge),
      "",                       // date_of_birth — saisie humaine, jamais fabriquée
      item.discipline,
      createdAtIso,
      dupGroupId,
      matchType,
      reviewStatus,
      "",                       // review_decision — vide au départ
      "",                       // review_notes — vide au départ
    ]);

    if (!phoneOk) {
      phoneRows.push([reviewId, item.legacyId, item.phoneRaw, "invalid", "", "", ""]);
    }

    if (dupGroupId) {
      duplicateRows.push([
        dupGroupId, reviewId, item.legacyId, matchType,
        String(groups.scoreByIndex.get(index) ?? 0), createdAtIso, "", "",
      ]);
    }
  });

  // Tri du fichier doublons par groupe puis date, pour faciliter la revue.
  duplicateRows.sort((a, b) => (a[0] === b[0] ? a[5].localeCompare(b[5]) : a[0].localeCompare(b[0])));

  return {
    reviewRows,
    phoneRows,
    duplicateRows,
    summary: {
      total: prepared.length,
      missingDob,
      invalidPhones,
      duplicateGroups: groups.groupCount,
      rowsInDuplicateGroups: groups.involvedCount,
      duplicateSignals: duplicateSignals.length,
      multipleIssues,
      newRegistrations,
      rowsReady: 0,          // aucune ligne prête tant que la revue n'est pas faite
      rowsBlocked: prepared.length,
    },
  };
}

// --- Validation du fichier de revue complété ---------------------------------

export type ReviewRowResult = {
  reviewId: string;
  sourceId: string;
  decision: string;
  ready: boolean;
  reasonCodes: string[];
};

export function validateHumanReviewRows(
  rows: ReviewRow[],
  options: { referenceDate?: string; today?: string } = {},
) {
  const referenceDate = options.referenceDate ?? currentEdition.ageReferenceDate;
  const today = options.today ?? currentCivilDateUtc();
  const seenReviewIds = new Set<string>();
  const seenSourceIds = new Set<string>();

  const counters = {
    total: rows.length,
    missingRequired: 0, duplicateReviewIds: 0, duplicateSourceIds: 0, unrecognizedDiscipline: 0,
    pendingDob: 0, validDob: 0, invalidDob: 0, futureDob: 0, ageMismatch: 0, notEligible: 0,
    phoneOk: 0, phoneUnresolved: 0, phoneUnknownStatus: 0,
    duplicatePending: 0,
    unknownDecision: 0, approved: 0, rejected: 0, hold: 0,
    ready: 0, blocked: 0,
  };

  const results: ReviewRowResult[] = rows.map((row) => {
    const reasonCodes: string[] = [];
    const reviewId = (row.review_id ?? "").trim();
    const sourceId = (row.source_id ?? "").trim();
    const discipline = (row.discipline ?? "").trim();
    const phoneStatus = (row.phone_status ?? "").trim();
    const phoneNormalized = (row.phone_normalized ?? "").trim();
    const dob = (row.date_of_birth ?? "").trim();
    const ageLegacyRaw = (row.age_legacy ?? "").trim();
    const dupGroupId = (row.duplicate_group_id ?? "").trim();
    const decision = (row.review_decision ?? "").trim();

    // Champs obligatoires.
    if (!reviewId || !sourceId) { reasonCodes.push("missing_required_field"); counters.missingRequired += 1; }

    // Unicité review_id / source_id.
    if (reviewId) {
      if (seenReviewIds.has(reviewId)) { reasonCodes.push("duplicate_review_id"); counters.duplicateReviewIds += 1; }
      else seenReviewIds.add(reviewId);
    }
    if (sourceId) {
      if (seenSourceIds.has(sourceId)) { reasonCodes.push("duplicate_source_id"); counters.duplicateSourceIds += 1; }
      else seenSourceIds.add(sourceId);
    }

    // Discipline reconnue.
    if (!discipline || !RECOGNIZED_DISCIPLINES.has(discipline)) {
      reasonCodes.push("unrecognized_discipline"); counters.unrecognizedDiscipline += 1;
    }

    // Date de naissance.
    if (!dob) {
      reasonCodes.push("pending_birth_date"); counters.pendingDob += 1;
    } else if (!isValidDateOfBirthForRegistration(dob, today)) {
      // Couvre : format invalide, date impossible, année < 1900 (limite technique),
      // et date future.
      if (isDateOfBirthInFuture(dob, today)) { reasonCodes.push("future_date_of_birth"); counters.futureDob += 1; }
      else { reasonCodes.push("invalid_date_of_birth"); counters.invalidDob += 1; }
    } else {
      counters.validDob += 1;
      if (!isCandidateAgeEligible({ dateOfBirth: dob, referenceDate })) {
        reasonCodes.push("candidate_age_not_eligible"); counters.notEligible += 1;
      }
      // Cohérence avec l'âge historique (tolérance documentée). Jamais de
      // correction : au-delà de la tolérance, on exige une revue humaine explicite.
      if (ageLegacyRaw && Number.isInteger(Number(ageLegacyRaw))) {
        const recomputed = calculateAgeOnDate(dob, referenceDate);
        if (recomputed !== null && Math.abs(recomputed - Number(ageLegacyRaw)) > AGE_MISMATCH_TOLERANCE_YEARS) {
          counters.ageMismatch += 1;
          // Non bloquant UNIQUEMENT si l'humain a explicitement approuvé la ligne
          // (décision approved) — sinon la ligne reste à revoir.
          if (decision !== "approved") reasonCodes.push("age_mismatch");
        }
      }
    }

    // Téléphone.
    if (!phoneStatus) {
      reasonCodes.push("missing_phone_status"); counters.phoneUnknownStatus += 1;
    } else if (phoneStatus !== "valid" && !PHONE_DECISIONS.includes(phoneStatus as (typeof PHONE_DECISIONS)[number])) {
      reasonCodes.push("unknown_phone_status"); counters.phoneUnknownStatus += 1;
    } else if (PHONE_STATUS_OK.has(phoneStatus)) {
      if (phoneStatus === "corrected" && !normalizeSenegalPhone(phoneNormalized).valid) {
        reasonCodes.push("corrected_phone_invalid"); counters.phoneUnresolved += 1;
      } else {
        counters.phoneOk += 1;
      }
    } else {
      // unreachable | invalid | needs_contact => non importable.
      reasonCodes.push("phone_unresolved"); counters.phoneUnresolved += 1;
    }

    // Doublon : une ligne dans un groupe doit être arbitrée (décision non vide).
    if (dupGroupId && !decision) { reasonCodes.push("duplicate_unresolved"); counters.duplicatePending += 1; }

    // Décision globale.
    if (decision && !ROW_REVIEW_DECISIONS.includes(decision as (typeof ROW_REVIEW_DECISIONS)[number])) {
      reasonCodes.push("unknown_review_decision"); counters.unknownDecision += 1;
    }
    if (decision === "approved") counters.approved += 1;
    else if (decision === "rejected") counters.rejected += 1;
    else if (decision === "hold") counters.hold += 1;

    const ready = decision === "approved" && reasonCodes.length === 0;
    if (ready) counters.ready += 1; else counters.blocked += 1;

    return { reviewId, sourceId, decision, ready, reasonCodes };
  });

  return { results, counters };
}

// --- Validation des fichiers focalisés (téléphones, doublons) -----------------

export function validatePhoneReviewRows(rows: ReviewRow[]) {
  const counters = { total: rows.length, resolved: 0, unresolved: 0, unknownDecision: 0, correctedMissingFormat: 0 };
  const results = rows.map((row) => {
    const reasonCodes: string[] = [];
    const decision = (row.review_decision ?? "").trim();
    const suggested = (row.suggested_format ?? "").trim();
    if (!decision) { reasonCodes.push("unresolved"); counters.unresolved += 1; }
    else if (!PHONE_DECISIONS.includes(decision as (typeof PHONE_DECISIONS)[number])) {
      reasonCodes.push("unknown_phone_decision"); counters.unknownDecision += 1;
    } else if (decision === "corrected" && !normalizeSenegalPhone(suggested).valid) {
      reasonCodes.push("corrected_format_invalid"); counters.correctedMissingFormat += 1;
    } else {
      counters.resolved += 1;
    }
    return { reviewId: (row.review_id ?? "").trim(), reasonCodes };
  });
  return { results, counters };
}

export function validateDuplicateReviewRows(rows: ReviewRow[]) {
  const counters = {
    total: rows.length, groups: 0, resolved: 0, unresolved: 0, unknownDecision: 0, incoherentGroups: 0,
  };
  const decisionsByGroup = new Map<string, Set<string>>();

  const results = rows.map((row) => {
    const reasonCodes: string[] = [];
    const group = (row.duplicate_group_id ?? "").trim();
    const decision = (row.review_decision ?? "").trim();
    if (!decision || decision === "unresolved") { reasonCodes.push("unresolved"); counters.unresolved += 1; }
    else if (!DUPLICATE_DECISIONS.includes(decision as (typeof DUPLICATE_DECISIONS)[number])) {
      reasonCodes.push("unknown_duplicate_decision"); counters.unknownDecision += 1;
    } else if (DUPLICATE_RESOLVED.has(decision)) {
      counters.resolved += 1;
    }
    if (group) {
      const set = decisionsByGroup.get(group) ?? new Set<string>();
      if (decision) set.add(decision);
      decisionsByGroup.set(group, set);
    }
    return { reviewId: (row.review_id ?? "").trim(), group, reasonCodes };
  });

  counters.groups = decisionsByGroup.size;
  // Cohérence : un même groupe ne doit pas mélanger « distinct_people » avec une
  // décision « same_person_* ».
  for (const [, set] of decisionsByGroup) {
    const hasDistinct = set.has("distinct_people");
    const hasSame = [...set].some((d) => d.startsWith("same_person"));
    if (hasDistinct && hasSame) counters.incoherentGroups += 1;
  }
  return { results, counters };
}

// Sélection des lignes prêtes à l'import (toutes approuvées et sans blocage).
export function selectImportReady(results: ReviewRowResult[]): ReviewRowResult[] {
  return results.filter((r) => r.ready);
}
