// Fixtures SYNTHÉTIQUES pour les tests Playwright de l'interface de revue.
// Aucune donnée réelle. Écrites dans un dossier temporaire, jamais committées.

import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const FIXTURE_DIR = join(tmpdir(), "ft-review-ui-e2e");
export const REVIEW_FILE = join(FIXTURE_DIR, "preselections-human-review-e2e.csv");
export const SOURCE_FILE = join(FIXTURE_DIR, "supabase-preselections-full-e2e.csv");

const REVIEW_COLUMNS = [
  "review_id", "source_id", "full_name", "phone_original", "phone_normalized", "phone_status",
  "email", "age_legacy", "date_of_birth", "discipline", "created_at",
  "duplicate_group_id", "duplicate_reason", "review_status", "review_decision", "review_notes",
];

const SOURCE_COLUMNS = [
  "id", "full_name", "phone", "email", "age", "city", "discipline",
  "experience", "portfolio_link", "message", "created_at",
];

function toCsv(columns: string[], rows: string[][]): string {
  const escape = (c: string) => `"${String(c ?? "").replaceAll('"', '""')}"`;
  const header = columns.map(escape).join(",");
  const body = rows.map((r) => r.map(escape).join(",")).join("\r\n");
  return `﻿${header}\r\n${body}\r\n`;
}

// 4 lignes synthétiques : DOB manquante, téléphone invalide, groupe de doublons.
const REVIEW_ROWS: string[][] = [
  ["FT-PSR-0001", "s1", "Alpha Synthetique", "+221771111111", "+221771111111", "valid", "a@example.test", "26", "", "Danse", "2026-06-01T00:00:00.000Z", "", "", "pending_birth_date", "", ""],
  ["FT-PSR-0002", "s2", "Beta Synthetique", "12345", "", "invalid", "b@example.test", "30", "", "Musique", "2026-07-19T00:00:00.000Z", "", "", "multiple_issues", "", ""],
  ["FT-PSR-0003", "s3", "Gamma Synthetique", "+221772222222", "+221772222222", "valid", "g@example.test", "22", "", "Art", "2026-07-05T00:00:00.000Z", "DUP-0001", "phone_identical", "multiple_issues", "", ""],
  ["FT-PSR-0004", "s4", "Delta Synthetique", "+221772222222", "+221772222222", "valid", "g@example.test", "22", "", "Art", "2026-07-06T00:00:00.000Z", "DUP-0001", "phone_identical", "multiple_issues", "", ""],
];

const SOURCE_ROWS: string[][] = [
  ["s1", "Alpha Synthetique", "+221771111111", "a@example.test", "26", "Dakar", "Danse", "", "", "", "2026-06-01T00:00:00.000Z"],
  ["s2", "Beta Synthetique", "12345", "b@example.test", "30", "Thies", "Musique", "", "", "", "2026-07-19T00:00:00.000Z"],
  ["s3", "Gamma Synthetique", "+221772222222", "g@example.test", "22", "Mbour", "Art", "", "", "", "2026-07-05T00:00:00.000Z"],
  ["s4", "Delta Synthetique", "+221772222222", "g@example.test", "22", "Mbour", "Art", "", "", "", "2026-07-06T00:00:00.000Z"],
];

export function writeFixtures(): void {
  mkdirSync(FIXTURE_DIR, { recursive: true });
  writeFileSync(REVIEW_FILE, toCsv(REVIEW_COLUMNS, REVIEW_ROWS), "utf8");
  writeFileSync(SOURCE_FILE, toCsv(SOURCE_COLUMNS, SOURCE_ROWS), "utf8");
}
