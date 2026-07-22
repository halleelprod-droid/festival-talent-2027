import { createHash } from "node:crypto";
import { extname, relative, resolve, sep } from "node:path";

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

const LOCAL_DATABASE_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

export function validateExportDatabaseUrl(rawUrl: string | undefined, allowRemote = false) {
  if (!rawUrl) throw new Error("database_url_missing");

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("database_url_invalid");
  }

  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("database_protocol_invalid");
  }
  if (!allowRemote && !LOCAL_DATABASE_HOSTS.has(url.hostname.toLowerCase())) {
    throw new Error("remote_database_refused");
  }
  if (!url.pathname || url.pathname === "/") throw new Error("database_name_missing");

  return url;
}

function isInside(parent: string, candidate: string) {
  const rel = relative(resolve(parent), resolve(candidate));
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== "..");
}

export function resolveExportPaths(outputPath: string, repositoryRoot: string) {
  const csvPath = resolve(outputPath);
  if (extname(csvPath).toLowerCase() !== ".csv") throw new Error("output_must_be_csv");
  if (isInside(repositoryRoot, csvPath)) throw new Error("repository_output_refused");

  return {
    csvPath,
    summaryPath: csvPath.replace(/\.csv$/i, ".summary.json"),
  };
}

export function parseExportArguments(args: string[]) {
  const dryRun = args.includes("--dry-run");
  const allowRemote = args.includes("--allow-remote");
  const inline = args.find((arg) => arg.startsWith("--output=") || arg.startsWith("--out="));
  const outputIndex = args.findIndex((arg) => arg === "--output" || arg === "--out");
  const output = inline?.slice(inline.indexOf("=") + 1) || (outputIndex >= 0 ? args[outputIndex + 1] : undefined);

  if (outputIndex >= 0 && (!output || output.startsWith("--"))) throw new Error("output_path_missing");
  return { dryRun, allowRemote, output };
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
