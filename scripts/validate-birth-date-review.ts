// Valide un fichier de revue complété. LECTURE SEULE : n'écrit aucune base.
// Ne recopie jamais la date complète dans le rapport ni dans le fichier d'erreurs.
//
//   npx tsx scripts/validate-birth-date-review.ts \
//     --input birth-date-review.csv \
//     --map birth-date-review-map.csv

import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { parseCsv } from "@/src/import/preselections";
import { REVIEW_COLUMNS, validateReviewMapRows, validateReviewRows } from "@/src/lib/birth-date-review";

function arg(name: string, fallback: string): string {
  const match = process.argv.find((value) => value.startsWith(`--${name}=`) || value === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  const index = process.argv.indexOf(match);
  return process.argv[index + 1] ?? fallback;
}

function main() {
  const input = arg("input", "birth-date-review.csv");
  const mapFile = arg("map", "birth-date-review-map.csv");
  const errorsOut = arg("errors-out", "birth-date-review-errors.csv");

  const rows = parseCsv(readFileSync(input, "utf8"));
  const missingColumns = REVIEW_COLUMNS.filter((column) => rows.length && !(column in rows[0]));
  if (missingColumns.length) {
    console.log(JSON.stringify({ error: "missing_columns", columns: missingColumns }, null, 2));
    process.exit(1);
  }

  if (!existsSync(mapFile)) throw new Error("mapping_file_missing");
  const mapValidation = validateReviewMapRows(parseCsv(readFileSync(mapFile, "utf8")), rows);
  if (mapValidation.errors.length) throw new Error(`mapping_file_invalid:${mapValidation.errors.length}`);

  const { results, counters } = validateReviewRows(rows, { knownIds: mapValidation.knownIds });

  const errorRows = results
    .filter((result) => result.reasonCodes.length)
    .map((result) => [result.reviewId, result.sourceRow, result.reasonCodes.join("|")]);
  if (errorRows.length) {
    const escape = (cell: string) => `"${cell.replaceAll('"', '""')}"`;
    writeFileSync(errorsOut, `﻿${[["review_id", "source_row", "reason_code"], ...errorRows].map((row) => row.map(escape).join(",")).join("\n")}\n`);
  }

  console.log(JSON.stringify({
    total: counters.total,
    pending: counters.pending,
    verified: counters.verified,
    validDates: counters.validDates,
    invalidDates: counters.invalidDates,
    futureDates: counters.futureDates,
    unknownIds: counters.unknownIds,
    duplicateIds: counters.duplicateIds,
    missingMethods: counters.missingMethods,
    invalidStatuses: counters.invalidStatuses,
    historicalMismatch: counters.historicalMismatch,
    eligible: counters.eligible,
    notEligible: counters.notEligible,
    readyForUpdate: counters.ready,
    blocked: counters.blocked,
    errorsFileCreated: errorRows.length > 0,
  }, null, 2));
}

try {
  main();
} catch {
  // Sortie volontairement générique : aucun chemin privé ni contenu CSV.
  console.error("birth_date_review_validation_failed");
  process.exitCode = 1;
}
