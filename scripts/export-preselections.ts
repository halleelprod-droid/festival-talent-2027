import { existsSync, writeFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/src/db/schema";
import { candidateConsents, candidates, disciplines, preselectionRegistrations } from "@/src/db/schema";
import {
  buildCsv,
  buildSummary,
  parseExportArguments,
  resolveExportPaths,
  validateExportDatabaseUrl,
  type ExportRow,
} from "@/src/export/preselections";

// Generic, safe preselection export from PostgreSQL.
//   npm run export:preselections -- --dry-run
//   npm run export:preselections -- --output C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv
// The connection is read-only, remote hosts are refused by default, candidate
// values are never printed, and existing output files are never overwritten.

async function main() {
  const { dryRun, allowRemote, output } = parseExportArguments(process.argv.slice(2));
  const databaseUrl = process.env.DATABASE_URL;
  validateExportDatabaseUrl(databaseUrl, allowRemote);

  const paths = output ? resolveExportPaths(output, process.cwd()) : null;
  if (!dryRun && !paths) throw new Error("output_path_missing");
  if (paths && (existsSync(paths.csvPath) || existsSync(paths.summaryPath))) {
    throw new Error("output_already_exists");
  }

  const client = postgres(databaseUrl!, {
    max: 1,
    prepare: false,
    connection: {
      application_name: "festival_talent_preselection_export",
      default_transaction_read_only: true,
    },
  });
  const db = drizzle(client, { schema });

  try {
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

    // Granted consent type names only; never export ipHash or userAgent.
    const consents = await db
      .select({ candidateId: candidateConsents.candidateId, type: candidateConsents.consentType, granted: candidateConsents.granted })
      .from(candidateConsents);
    const consentMap = new Map<string, string[]>();
    for (const consent of consents) {
      if (!consent.granted) continue;
      const list = consentMap.get(consent.candidateId) ?? [];
      list.push(consent.type);
      consentMap.set(consent.candidateId, list);
    }

    const toIso = (value: unknown) => value instanceof Date
      ? value.toISOString()
      : value === null || value === undefined ? null : String(value);
    const rows: ExportRow[] = joined.map((row) => ({
      legacy_source_id: row.legacy_source_id ?? null,
      registration_status: row.registration_status ?? null,
      submitted_at: toIso(row.submitted_at),
      candidate_created_at: toIso(row.candidate_created_at),
      full_name: row.full_name ?? null,
      phone_raw: row.phone_raw ?? null,
      phone_valid: row.phone_valid ?? null,
      email: row.email ?? null,
      city: row.city ?? null,
      region: row.region ?? null,
      country_code: row.country_code ?? null,
      discipline: row.discipline ?? null,
      category: row.category ?? null,
      date_of_birth: row.date_of_birth ?? null,
      granted_consents: (consentMap.get(row.candidate_id) ?? []).sort().join("|") || null,
    }));

    const csv = buildCsv(rows);
    const summary = buildSummary(rows, csv, "postgres-local");

    if (dryRun) {
      console.log(JSON.stringify({ mode: "dry-run", rows: summary.rows, columns: summary.columns, source: summary.source }, null, 2));
      return;
    }

    writeFileSync(paths!.csvPath, csv, { encoding: "utf8", flag: "wx" });
    writeFileSync(paths!.summaryPath, JSON.stringify(summary, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
    console.log(JSON.stringify({
      mode: "export",
      rows: summary.rows,
      csv_file: paths!.csvPath,
      summary_file: paths!.summaryPath,
      sha256: summary.sha256,
    }, null, 2));
  } finally {
    await client.end({ timeout: 5 });
  }
}

main().catch(() => {
  // Raw errors may contain a connection URL or candidate value.
  console.error("preselection_export_failed");
  process.exitCode = 1;
});
