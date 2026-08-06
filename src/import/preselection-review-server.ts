// Logique PURE et testable du serveur local de revue. Aucune I/O réseau ici :
// le serveur (scripts/preselection-review-server.ts) branche ces fonctions sur
// node:http et le système de fichiers. Aucune donnée personnelle n'est jamais
// journalisée : ce module ne fait que transformer des chaînes/objets.

import { createHash } from "node:crypto";
import { resolve } from "node:path";

import { parseCsv } from "@/src/import/preselections";
import {
  HUMAN_REVIEW_COLUMNS,
  validateHumanReviewRows,
  type ReviewRow,
} from "@/src/import/preselection-review";
import {
  calculateAgeOnDate,
  isValidDateOfBirthForRegistration,
} from "@/src/lib/candidate-date-of-birth";
import { currentEdition } from "@/src/config/edition";

export const REVIEW_UI_HOST = "127.0.0.1";
export const REVIEW_UI_PORT = 4317;

// Seuls ces champs sont modifiables par l'interface. Tout le reste (identité,
// téléphone d'origine, source_id…) est en lecture seule.
export const EDITABLE_FIELDS = [
  "date_of_birth", "phone_status", "phone_normalized", "review_decision", "review_notes",
] as const;

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store, max-age=0",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), interest-cohort=()",
};

// CSP stricte : aucune ressource distante, scripts/styles inline uniquement via
// nonce. connect-src 'self' pour l'API locale ; img data: pour d'éventuelles
// icônes inline. Aucun CDN, aucune police distante.
export function buildCsp(nonce: string): string {
  return [
    "default-src 'none'",
    `script-src 'nonce-${nonce}'`,
    `style-src 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "connect-src 'self'",
    "form-action 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join("; ");
}

// --- Gardes environnement / réseau -------------------------------------------

export function isProductionEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.NODE_ENV === "production" || Boolean(env.VERCEL) || Boolean(env.VERCEL_URL);
}

// N'autorise que localhost / 127.0.0.1 (avec ou sans port). Refuse 0.0.0.0, une
// IP réseau, un hostname public.
export function isAllowedHost(hostHeader: string | undefined): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.trim().toLowerCase();
  const withoutPort = host.replace(/:\d+$/, "");
  return withoutPort === "127.0.0.1" || withoutPort === "localhost" || withoutPort === "[::1]";
}

// --- Confinement des chemins -------------------------------------------------

// Empêche toute sortie du dossier autorisé (aucun path traversal). Canonicalise
// d'abord les chemins (résolution des « .. ») avant comparaison.
export function isPathWithin(target: string, dir: string): boolean {
  const norm = (p: string) => resolve(p).replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
  const t = norm(target);
  const d = norm(dir);
  return t === d || t.startsWith(d + "/");
}

// --- CSV round-trip ----------------------------------------------------------

export type ParsedReview = { columns: string[]; rows: ReviewRow[] };

export function parseReviewContent(content: string): ParsedReview {
  const rows = parseCsv(content) as ReviewRow[];
  const firstLine = content.replace(/^﻿/, "").split(/\r?\n/)[0] ?? "";
  const columns = firstLine
    ? splitCsvLine(firstLine).map((c) => c.replace(/^﻿/, "").trim())
    : [...HUMAN_REVIEW_COLUMNS];
  return { columns, rows };
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cell = "", quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"' && quoted && line[i + 1] === '"') { cell += '"'; i += 1; }
    else if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) { out.push(cell); cell = ""; }
    else cell += ch;
  }
  out.push(cell);
  return out;
}

export function serializeReviewContent(columns: string[], rows: ReviewRow[]): string {
  const escape = (cell: string) => `"${String(cell ?? "").replaceAll('"', '""')}"`;
  const header = columns.map(escape).join(",");
  const body = rows.map((row) => columns.map((col) => escape(row[col] ?? "")).join(",")).join("\r\n");
  return `﻿${header}\r\n${body}${rows.length ? "\r\n" : ""}`;
}

// --- Application des modifications (par review_id) ----------------------------

export type EditMap = Record<string, Partial<Record<(typeof EDITABLE_FIELDS)[number], string>>>;

export type ApplyResult = { rows: ReviewRow[]; applied: number; unknownIds: string[]; rejectedFields: string[] };

export function applyEdits(rows: ReviewRow[], edits: EditMap): ApplyResult {
  const byId = new Map(rows.map((r) => [(r.review_id ?? "").trim(), r]));
  const unknownIds: string[] = [];
  const rejectedFields: string[] = [];
  let applied = 0;

  // Copie profonde superficielle (nouvelle référence par ligne modifiée).
  const nextRows = rows.map((r) => ({ ...r }));
  const nextById = new Map(nextRows.map((r) => [(r.review_id ?? "").trim(), r]));

  for (const [reviewId, patch] of Object.entries(edits)) {
    const target = nextById.get(reviewId.trim());
    if (!byId.has(reviewId.trim()) || !target) { unknownIds.push(reviewId); continue; }
    let touched = false;
    for (const [field, value] of Object.entries(patch)) {
      if (!EDITABLE_FIELDS.includes(field as (typeof EDITABLE_FIELDS)[number])) {
        rejectedFields.push(field);
        continue;
      }
      target[field] = String(value ?? "");
      touched = true;
    }
    if (touched) applied += 1;
  }

  return { rows: nextRows, applied, unknownIds, rejectedFields };
}

// --- Version / concurrence ---------------------------------------------------

export function computeVersion(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function hasVersionConflict(expected: string | undefined, current: string): boolean {
  // Une version attendue absente = première écriture tolérée (pas de conflit).
  if (!expected) return false;
  return expected !== current;
}

// --- Sauvegardes horodatées --------------------------------------------------

export function backupFileName(base: string, at: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const stamp = `${at.getFullYear()}-${p(at.getMonth() + 1)}-${p(at.getDate())}_${p(at.getHours())}-${p(at.getMinutes())}-${p(at.getSeconds())}`;
  return `${base}-${stamp}.csv`;
}

// Retourne les noms de backups à SUPPRIMER pour ne garder que `max` plus récents.
// Le tri lexicographique du nom horodaté (…YYYY-MM-DD_HH-mm-ss.csv) suit l'ordre
// chronologique.
export function planBackupDeletions(existing: string[], max = 20): string[] {
  const sorted = [...existing].sort(); // ancien -> récent
  if (sorted.length <= max) return [];
  return sorted.slice(0, sorted.length - max);
}

// --- Tableau de bord ---------------------------------------------------------

export function computeDashboard(
  rows: ReviewRow[],
  options: { referenceDate?: string; today?: string } = {},
) {
  const { counters } = validateHumanReviewRows(rows, options);
  const duplicateGroups = new Set(
    rows.map((r) => (r.duplicate_group_id ?? "").trim()).filter(Boolean),
  ).size;
  const total = counters.total || 1;
  const progressPct = Math.round(((counters.approved + counters.rejected + counters.hold) / total) * 100);
  return {
    total: counters.total,
    dobRemaining: counters.pendingDob,
    validDob: counters.validDob,
    invalidDob: counters.invalidDob,
    ageMismatch: counters.ageMismatch,
    phonesToReview: counters.phoneUnresolved + counters.phoneUnknownStatus,
    phoneUnresolved: counters.phoneUnresolved,
    duplicateGroups,
    duplicatePending: counters.duplicatePending,
    approved: counters.approved,
    rejected: counters.rejected,
    hold: counters.hold,
    ready: counters.ready,
    blocked: counters.blocked,
    progressPct,
  };
}

// --- Import de réponses manuelles (clé = review_id) ---------------------------

export const RESPONSE_COLUMNS = ["review_id", "date_of_birth", "phone_corrected", "review_notes"] as const;

export type ResponsePreview = {
  applicable: EditMap;
  applicableCount: number;
  unknownIds: number;
  invalidDob: number;
  invalidPhone: number;
};

export function previewResponses(
  responseRows: ReviewRow[],
  knownReviewIds: Set<string>,
  validatePhone: (value: string) => boolean,
  options: { today?: string } = {},
): ResponsePreview {
  const today = options.today;
  const applicable: EditMap = {};
  let unknownIds = 0, invalidDob = 0, invalidPhone = 0, applicableCount = 0;

  for (const row of responseRows) {
    const reviewId = (row.review_id ?? "").trim();
    // La clé DOIT être review_id (jamais nom ni téléphone seul).
    if (!reviewId || !knownReviewIds.has(reviewId)) { unknownIds += 1; continue; }
    const patch: EditMap[string] = {};
    const dob = (row.date_of_birth ?? "").trim();
    const phone = (row.phone_corrected ?? "").trim();
    const notes = (row.review_notes ?? "").trim();
    let ok = false;

    if (dob) {
      if (!isValidDateOfBirthForRegistration(dob, today)) { invalidDob += 1; continue; }
      patch.date_of_birth = dob; ok = true;
    }
    if (phone) {
      if (!validatePhone(phone)) { invalidPhone += 1; continue; }
      patch.phone_status = "corrected"; patch.phone_normalized = phone; ok = true;
    }
    if (notes) { patch.review_notes = notes; ok = true; }

    if (ok) { applicable[reviewId] = patch; applicableCount += 1; }
  }

  return { applicable, applicableCount, unknownIds, invalidDob, invalidPhone };
}

// --- Mode contact ------------------------------------------------------------

export function needsContact(row: ReviewRow): boolean {
  const dob = (row.date_of_birth ?? "").trim();
  const phoneStatus = (row.phone_status ?? "").trim();
  const decision = (row.review_decision ?? "").trim();
  return !dob || phoneStatus === "needs_contact" || (!decision);
}

export function buildContactMessage(fullName: string): string {
  const name = (fullName || "").trim() || "Candidat(e)";
  return [
    `Bonjour ${name},`,
    "",
    "Dans le cadre de la mise à jour de votre inscription aux présélections du Festival Talent 2027, nous devons confirmer votre date de naissance complète.",
    "",
    "Merci de nous répondre avec votre date de naissance au format jour/mois/année.",
    "",
    "Cette demande sert uniquement à vérifier votre éligibilité et à compléter votre dossier.",
    "",
    "Festival Talent 2027",
  ].join("\n");
}

// Âge recalculé à la date de référence de l'édition (pour l'affichage UI ; la
// validation autoritative reste côté serveur via validateHumanReviewRows).
export function recomputedAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) return null;
  return calculateAgeOnDate(dateOfBirth, currentEdition.ageReferenceDate);
}

// --- Assemblage import-ready --------------------------------------------------

export const IMPORT_READY_COLUMNS = [
  "id", "full_name", "phone", "email", "date_of_birth", "city", "discipline",
  "experience", "portfolio_link", "message", "created_at",
] as const;

// Construit les lignes import-ready à partir des lignes de revue APPROUVÉES et
// de l'export source (pour les colonnes absentes du fichier de revue, ex. city).
// N'inclut que les lignes prêtes (approved + sans blocage) résolues côté serveur.
export function buildImportReadyRows(
  reviewRows: ReviewRow[],
  sourceRows: ReviewRow[],
  readySourceIds: Set<string>,
): string[][] {
  const sourceById = new Map(sourceRows.map((r) => [(r.id ?? "").trim(), r]));
  const out: string[][] = [];
  for (const review of reviewRows) {
    const sourceId = (review.source_id ?? "").trim();
    if (!readySourceIds.has(sourceId)) continue;
    const src = sourceById.get(sourceId);
    if (!src) continue;
    const phoneStatus = (review.phone_status ?? "").trim();
    const phone = phoneStatus === "corrected"
      ? (review.phone_normalized ?? "").trim()
      : (src.phone ?? "").trim();
    out.push([
      sourceId, (src.full_name ?? "").trim(), phone, (src.email ?? "").trim(),
      (review.date_of_birth ?? "").trim(), (src.city ?? "").trim(),
      (review.discipline ?? src.discipline ?? "").trim(),
      (src.experience ?? "").trim(), (src.portfolio_link ?? "").trim(),
      (src.message ?? "").trim(), (src.created_at ?? "").trim(),
    ]);
  }
  return out;
}
