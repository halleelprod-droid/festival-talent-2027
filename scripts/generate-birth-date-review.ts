// Génère un fichier de revue MASQUÉ des inscriptions historiques sans date de
// naissance valide. LECTURE SEULE : ne modifie aucune base, ne contacte personne,
// ne lance aucun import, n'affiche aucune donnée personnelle en clair.
//
//   npx tsx scripts/generate-birth-date-review.ts \
//     --source preselections-export.csv \
//     --output birth-date-review.csv \
//     --map birth-date-review-map.csv

import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { parseCsv, preparePreselections } from "@/src/import/preselections";
import {
  createCandidateReviewFingerprint,
  maskEmailAddress,
  maskFullName,
  maskPhoneNumber,
} from "@/src/lib/privacy-mask";
import { REVIEW_COLUMNS, REVIEW_MAP_COLUMNS, generateReviewId } from "@/src/lib/birth-date-review";

function arg(name: string, fallback: string): string {
  const match = process.argv.find((value) => value.startsWith(`--${name}=`) || value === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  const index = process.argv.indexOf(match);
  return process.argv[index + 1] ?? fallback;
}

function toCsv(header: readonly string[], rows: string[][]): string {
  const escape = (cell: string) => `"${cell.replaceAll('"', '""')}"`;
  return `﻿${[header, ...rows].map((row) => row.map(escape).join(",")).join("\n")}\n`;
}

function main() {
  const source = arg("source", join(homedir(), "Downloads", "preselections-export.csv"));
  const output = arg("output", "birth-date-review.csv");
  const mapOutput = arg("map", "birth-date-review-map.csv");

  const { prepared } = preparePreselections(parseCsv(readFileSync(source, "utf8")));
  // On ne collecte que les lignes sans date de naissance valide ; celles qui en ont
  // déjà une (importables) sont ignorées.
  const needingReview = prepared
    .map((item, index) => ({ item, sourceRow: index + 2 }))
    .filter(({ item }) => !item.dateOfBirth);

  const reviewRows = needingReview.map(({ item, sourceRow }, position) => [
    generateReviewId(position),
    String(sourceRow),
    maskFullName(item.fullName),
    maskPhoneNumber(item.phoneNormalized ?? item.phoneRaw),
    maskEmailAddress(item.email),
    item.discipline,
    item.historicalAge === null ? "" : String(item.historicalAge),
    "", // date_of_birth à compléter manuellement — jamais fabriquée
    "", // verification_method
    "pending",
    "",
  ]);

  const mapRows = needingReview.map(({ item, sourceRow }, position) => [
    generateReviewId(position),
    "", // candidate_id inexistant avant l'import
    "", // registration_id inexistant avant l'import
    String(sourceRow),
    createCandidateReviewFingerprint({ normalizedPhone: item.phoneNormalized, normalizedEmail: item.email, sourceRow }),
  ]);

  writeFileSync(output, toCsv(REVIEW_COLUMNS, reviewRows));
  writeFileSync(mapOutput, toCsv(REVIEW_MAP_COLUMNS, mapRows));

  // Compteurs uniquement — aucune donnée personnelle.
  console.log(JSON.stringify({
    totalRows: prepared.length,
    rowsWithMissingDate: needingReview.length,
    reviewRowsGenerated: reviewRows.length,
    fingerprintEnabled: Boolean(process.env.CANDIDATE_REVIEW_SECRET),
  }, null, 2));
}

try {
  main();
} catch {
  // Sortie volontairement générique : aucun chemin privé ni contenu CSV.
  console.error("birth_date_review_generation_failed");
  process.exitCode = 1;
}
