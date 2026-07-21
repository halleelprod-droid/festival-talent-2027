import { existsSync, writeFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/connection";
import { candidateConsents, candidates, disciplines, preselectionRegistrations } from "@/src/db/schema";
import { buildCsv, buildSummary, type ExportRow } from "@/src/export/preselections";

// Generic, SAFE preselection export from the LOCAL PostgreSQL.
//   npm run export:preselections -- --dry-run
//   npm run export:preselections -- --out=C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv
// Read-only (SELECT only). Never inserts/updates/deletes, never messages/SMS,
// never uses Supabase, never prints candidate data (only counts + paths + hash),
// and refuses to overwrite an existing file.

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const outArg = args.find((a) => a.startsWith("--out="));
  const db = getDb();

  const joined = await db
    .select({
      legacy_source_id: preselectionRegistrations.legacySourceId,
      registration_status: preselectionRegistrations.status,
      submitted_at: preselectionRegistrations.submittedAt,
      candidate_created_at: candidates.createdAt,
      full_name: candidates.fullName,
      phone_raw: candidates.phoneRaw,
      phone_valid: candidates.phoneValid,
      email: candidates.email,
      city: candidates.city,
      region: candidates.region,
      country_code: candidates.countryCode,
      discipline: disciplines.name,
      category: preselectionRegistrations.category,
      date_of_birth: candidates.dateOfBirth,
      candidate_id: candidates.id,
    })
    .from(preselectionRegistrations)
    .innerJoin(candidates, eq(preselectionRegistrations.candidateId, candidates.id))
    .leftJoin(disciplines, eq(preselectionRegistrations.disciplineId, disciplines.id));

  // Granted consent TYPE names only (never ipHash / userAgent).
  const consents = await db
    .select({ candidateId: candidateConsents.candidateId, type: candidateConsents.consentType, granted: candidateConsents.granted })
    .from(candidateConsents);
  const consentMap = new Map<string, string[]>();
  for (const c of consents) {
    if (!c.granted) continue;
    const list = consentMap.get(c.candidateId) ?? [];
    list.push(c.type);
    consentMap.set(c.candidateId, list);
  }

  const toIso = (v: unknown) => (v instanceof Date ? v.toISOString() : v === null || v === undefined ? null : String(v));
  const rows: ExportRow[] = joined.map((r) => ({
    legacy_source_id: r.legacy_source_id ?? null,
    registration_status: r.registration_status ?? null,
    submitted_at: toIso(r.submitted_at),
    candidate_created_at: toIso(r.candidate_created_at),
    full_name: r.full_name ?? null,
    phone_raw: r.phone_raw ?? null,
    phone_valid: r.phone_valid ?? null,
    email: r.email ?? null,
    city: r.city ?? null,
    region: r.region ?? null,
    country_code: r.country_code ?? null,
    discipline: r.discipline ?? null,
    category: r.category ?? null,
    date_of_birth: r.date_of_birth ?? null,
    granted_consents: (consentMap.get(r.candidate_id) ?? []).join("|") || null,
  }));

  const csv = buildCsv(rows);
  const summary = buildSummary(rows, csv, "postgres-local");

  if (dryRun) {
    // Counts only — no candidate data, no file written.
    console.log(JSON.stringify({ mode: "dry-run", rows: summary.rows, columns: summary.columns, source: summary.source }, null, 2));
    return;
  }

  if (!outArg) throw new Error("missing --out=PATH (keep the destination OUTSIDE the repo)");
  const out = outArg.slice("--out=".length);
  const summaryPath = out.replace(/\.csv$/i, "") + ".summary.json";
  if (existsSync(out) || existsSync(summaryPath)) throw new Error("refusing to overwrite an existing file");

  writeFileSync(out, csv, "utf8");
  writeFileSync(summaryPath, JSON.stringify({ ...summary, csv_file: out }, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({ mode: "export", rows: summary.rows, csv_file: out, summary_file: summaryPath, sha256: summary.sha256 }, null, 2));
}

main().catch(() => {
  // Never print the raw error — it may contain a connection URL or a source value.
  console.error("preselection_export_failed");
  process.exitCode = 1;
});
