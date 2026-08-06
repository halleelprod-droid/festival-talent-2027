// Génère les fichiers PRIVÉS de revue humaine à partir de l'export Supabase.
// LECTURE SEULE : ne modifie aucune base, ne contacte personne, ne lance aucun
// import. N'affiche AUCUNE donnée personnelle dans le terminal (compteurs seuls).
//
// Les fichiers produits contiennent des données réelles nécessaires à la revue
// (nom, téléphone, e-mail) : ils sont écrits HORS dépôt et ne doivent JAMAIS être
// committés. Voir docs/PRESELECTION_HUMAN_REVIEW.md.
//
//   npx tsx scripts/generate-preselection-review.ts \
//     --source "C:/FestivalTalentData/exports-private/supabase-preselections-full-...csv" \
//     --out-dir "C:/FestivalTalentData/exports-private" \
//     --date 2026-07-22

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { parseCsv, preparePreselections } from "@/src/import/preselections";
import {
  DUPLICATE_REVIEW_COLUMNS,
  HUMAN_REVIEW_COLUMNS,
  INVALID_PHONE_COLUMNS,
  buildHumanReview,
} from "@/src/import/preselection-review";

function arg(name: string, fallback: string): string {
  const match = process.argv.find((value) => value.startsWith(`--${name}=`) || value === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  const index = process.argv.indexOf(match);
  return process.argv[index + 1] ?? fallback;
}

function toCsv(header: readonly string[], rows: string[][]): string {
  const escape = (cell: string) => `"${String(cell ?? "").replaceAll('"', '""')}"`;
  return `﻿${[header as readonly string[], ...rows].map((row) => row.map(escape).join(",")).join("\r\n")}\r\n`;
}

function main() {
  const source = arg("source", "");
  const outDir = arg("out-dir", "C:/FestivalTalentData/exports-private");
  const date = arg("date", new Date().toISOString().slice(0, 10));
  if (!source) throw new Error("missing_source");

  const { prepared, duplicateSignals } = preparePreselections(parseCsv(readFileSync(source, "utf8")));
  const build = buildHumanReview(prepared, duplicateSignals);

  const reviewPath = join(outDir, `preselections-human-review-${date}.csv`);
  const phonePath = join(outDir, `preselections-invalid-phones-${date}.csv`);
  const dupPath = join(outDir, `preselections-duplicate-review-${date}.csv`);
  const summaryPath = join(outDir, `preselections-human-review-${date}.summary.json`);

  const reviewCsv = toCsv(HUMAN_REVIEW_COLUMNS, build.reviewRows);
  writeFileSync(reviewPath, reviewCsv, "utf8");
  writeFileSync(phonePath, toCsv(INVALID_PHONE_COLUMNS, build.phoneRows), "utf8");
  writeFileSync(dupPath, toCsv(DUPLICATE_REVIEW_COLUMNS, build.duplicateRows), "utf8");

  const sha256 = createHash("sha256").update(readFileSync(reviewPath)).digest("hex");
  const summary = { generated_for: date, ...build.summary, review_file_sha256: sha256 };
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

  // Compteurs uniquement — aucune donnée personnelle.
  console.log(JSON.stringify({
    ...build.summary,
    files: {
      review: reviewPath.split(/[\\/]/).pop(),
      invalidPhones: phonePath.split(/[\\/]/).pop(),
      duplicates: dupPath.split(/[\\/]/).pop(),
      summary: summaryPath.split(/[\\/]/).pop(),
    },
    reviewFileSha256: sha256,
  }, null, 2));
}

try {
  main();
} catch {
  // Sortie volontairement générique : aucun chemin privé ni contenu CSV.
  console.error("preselection_review_generation_failed");
  process.exitCode = 1;
}
