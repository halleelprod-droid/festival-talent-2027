import { createHash } from "node:crypto";

// One row per preselection registration. NON-sensitive columns only:
// no secrets, tokens, password hashes, ipHash, userAgent or raw legacy payload.
export const EXPORT_COLUMNS = [
  "legacy_source_id",
  "registration_status",
  "submitted_at",
  "candidate_created_at",
  "full_name",
  "phone_raw",
  "phone_valid",
  "email",
  "city",
  "region",
  "country_code",
  "discipline",
  "category",
  "date_of_birth",
  "granted_consents",
] as const;

export interface ExportRow {
  legacy_source_id: string | null;
  registration_status: string | null;
  submitted_at: string | null;
  candidate_created_at: string | null;
  full_name: string | null;
  phone_raw: string | null;
  phone_valid: boolean | null;
  email: string | null;
  city: string | null;
  region: string | null;
  country_code: string | null;
  discipline: string | null;
  category: string | null;
  date_of_birth: string | null; // YYYY-MM-DD or null
  granted_consents: string | null; // consent type names joined by "|"
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /["\n\r,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Build the CSV text (CRLF line endings, quoted header). Deterministic. */
export function buildCsv(rows: ExportRow[]): string {
  const header = EXPORT_COLUMNS.join(",");
  const lines = rows.map((r) => EXPORT_COLUMNS.map((c) => csvEscape(r[c])).join(","));
  return [header, ...lines].join("\r\n") + "\r\n";
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export interface ExportSummary {
  exported_at: string;
  rows: number;
  columns: readonly string[];
  source: string;
  sha256: string;
  csv_file?: string;
}

/** Anonymised summary — counts and hash only, never candidate data. */
export function buildSummary(rows: ExportRow[], csv: string, source: string, exportedAt = new Date()): ExportSummary {
  return {
    exported_at: exportedAt.toISOString(),
    rows: rows.length,
    columns: EXPORT_COLUMNS,
    source,
    sha256: sha256(csv),
  };
}
