// Valide les fichiers de revue humaine complétés. LECTURE SEULE : n'écrit aucune
// base, ne lance aucun import. N'affiche AUCUNE donnée personnelle (compteurs
// seuls). Produit un rapport JSON anonymisé.
//
//   npm run preselections:validate-review -- \
//     --file "C:/FestivalTalentData/exports-private/preselections-human-review-2026-07-22.csv" \
//     --phones "C:/.../preselections-invalid-phones-2026-07-22.csv" \
//     --duplicates "C:/.../preselections-duplicate-review-2026-07-22.csv"
//
// Le fichier import-ready n'est produit QUE si toutes les lignes sont résolues
// (aucune ligne unresolved) et nécessite --source (export d'origine) pour
// réassembler les colonnes requises par l'import. Il n'est jamais committé.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";

import { parseCsv } from "@/src/import/preselections";
import {
  HUMAN_REVIEW_COLUMNS,
  validateDuplicateReviewRows,
  validateHumanReviewRows,
  validatePhoneReviewRows,
} from "@/src/import/preselection-review";

function arg(name: string, fallback: string): string {
  const match = process.argv.find((value) => value.startsWith(`--${name}=`) || value === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  const index = process.argv.indexOf(match);
  return process.argv[index + 1] ?? fallback;
}

const IMPORT_COLUMNS = [
  "id", "full_name", "phone", "email", "date_of_birth", "city", "discipline",
  "experience", "portfolio_link", "message", "created_at",
] as const;

function toCsv(header: readonly string[], rows: string[][]): string {
  const escape = (cell: string) => `"${String(cell ?? "").replaceAll('"', '""')}"`;
  return `﻿${[header as readonly string[], ...rows].map((row) => row.map(escape).join(",")).join("\r\n")}\r\n`;
}

function main() {
  const file = arg("file", "");
  const phonesFile = arg("phones", "");
  const duplicatesFile = arg("duplicates", "");
  const sourceFile = arg("source", "");
  if (!file) throw new Error("missing_file");

  const rows = parseCsv(readFileSync(file, "utf8"));
  const missingColumns = HUMAN_REVIEW_COLUMNS.filter((column) => rows.length && !(column in rows[0]));
  if (missingColumns.length) {
    console.log(JSON.stringify({ error: "missing_columns", columns: missingColumns }, null, 2));
    process.exit(1);
  }

  const { results, counters } = validateHumanReviewRows(rows);

  const phones = phonesFile && existsSync(phonesFile)
    ? validatePhoneReviewRows(parseCsv(readFileSync(phonesFile, "utf8"))).counters : null;
  const duplicates = duplicatesFile && existsSync(duplicatesFile)
    ? validateDuplicateReviewRows(parseCsv(readFileSync(duplicatesFile, "utf8"))).counters : null;

  // Une ligne est « non résolue » si elle n'est ni prête (approved sans blocage)
  // ni intentionnellement écartée (rejected/hold).
  const unresolved = results.filter((r) => !r.ready && r.decision !== "rejected" && r.decision !== "hold").length;
  const readyCount = counters.ready;

  // Génération conditionnelle du fichier import-ready.
  let importReady: { file: string; rows: number; sha256: string } | null = null;
  const canEmit = unresolved === 0 && readyCount > 0 && Boolean(sourceFile) && existsSync(sourceFile);
  if (canEmit) {
    const source = parseCsv(readFileSync(sourceFile, "utf8"));
    const byId = new Map(source.map((r) => [(r.id ?? "").trim(), r]));
    const dobByReview = new Map(rows.map((r) => [(r.source_id ?? "").trim(), r]));
    const approvedIds = new Set(results.filter((r) => r.ready).map((r) => r.sourceId));

    const importRows: string[][] = [];
    for (const [sourceId, reviewRow] of dobByReview) {
      if (!approvedIds.has(sourceId)) continue;
      const src = byId.get(sourceId);
      if (!src) continue;
      const phoneStatus = (reviewRow.phone_status ?? "").trim();
      const phone = phoneStatus === "corrected"
        ? (reviewRow.phone_normalized ?? "").trim()
        : (src.phone ?? "").trim();
      importRows.push([
        sourceId, (src.full_name ?? "").trim(), phone, (src.email ?? "").trim(),
        (reviewRow.date_of_birth ?? "").trim(), (src.city ?? "").trim(),
        (reviewRow.discipline ?? src.discipline ?? "").trim(),
        (src.experience ?? "").trim(), (src.portfolio_link ?? "").trim(),
        (src.message ?? "").trim(), (src.created_at ?? "").trim(),
      ]);
    }
    if (importRows.length) {
      const date = arg("date", new Date().toISOString().slice(0, 10));
      const outPath = join(dirname(file), `preselections-import-ready-${date}.csv`);
      const csv = toCsv(IMPORT_COLUMNS, importRows);
      writeFileSync(outPath, csv, "utf8");
      importReady = {
        file: outPath.split(/[\\/]/).pop()!,
        rows: importRows.length,
        sha256: createHash("sha256").update(readFileSync(outPath)).digest("hex"),
      };
    }
  }

  const report = {
    generated_at: new Date().toISOString(),
    human_review: counters,
    phone_review: phones,
    duplicate_review: duplicates,
    unresolved,
    import_ready_emitted: Boolean(importReady),
    import_ready: importReady,
    decision: unresolved === 0 && readyCount > 0 ? "READY_FOR_LOCAL_IMPORT" : "PENDING_HUMAN_INPUT",
  };

  const reportPath = join(dirname(file), "preselections-review-validation.report.json");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(JSON.stringify(report, null, 2));
}

try {
  main();
} catch {
  // Sortie volontairement générique : aucun chemin privé ni contenu CSV.
  console.error("preselection_review_validation_failed");
  process.exitCode = 1;
}
