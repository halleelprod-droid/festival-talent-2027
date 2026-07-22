import { describe, expect, it } from "vitest";
import {
  EXPORT_COLUMNS,
  buildCsv,
  buildSummary,
  parseExportArguments,
  resolveExportPaths,
  sha256,
  validateExportDatabaseUrl,
  type ExportRow,
} from "@/src/export/preselections";

// SYNTHETIC rows only — never real candidate data.
const synthetic: ExportRow[] = [
  {
    legacy_source_id: "synthetic-0001",
    registration_status: "pending",
    submitted_at: "2027-01-02T10:00:00.000Z",
    candidate_created_at: "2027-01-01T09:00:00.000Z",
    full_name: "Candidat International Extraordinairement Long de Démonstration Locale",
    phone_raw: "+221 77 000 00 00",
    phone_valid: true,
    email: "candidat-mobile-extremement-long@example.invalid",
    city: "Ville, avec une virgule",
    region: "Région \"guillemets\"",
    country_code: "SN",
    discipline: "Création numérique immersive et technologies artistiques expérimentales",
    category: "danse",
    date_of_birth: "2005-02-28",
    granted_consents: "data|rules",
  },
  {
    legacy_source_id: null,
    registration_status: "pending",
    submitted_at: null,
    candidate_created_at: null,
    full_name: "Ligne\nmultiligne",
    phone_raw: null,
    phone_valid: false,
    email: null,
    city: null,
    region: null,
    country_code: "SN",
    discipline: null,
    category: null,
    date_of_birth: null, // missing DOB -> stays empty, never fabricated
    granted_consents: null,
  },
];

describe("preselection export (pure logic)", () => {
  it("never exports secret/sensitive columns", () => {
    const forbidden = ["password", "hash", "token", "secret", "ip_hash", "user_agent", "payload"];
    for (const col of EXPORT_COLUMNS) {
      for (const bad of forbidden) expect(col.includes(bad), `${col} must not contain ${bad}`).toBe(false);
    }
  });

  it("builds a CSV with a header and one line per row", () => {
    const csv = buildCsv(synthetic);
    const lines = csv.trimEnd().split("\r\n");
    expect(lines[0]).toBe(EXPORT_COLUMNS.join(","));
    expect(lines).toHaveLength(1 + synthetic.length);
  });

  it("escapes commas, quotes and newlines", () => {
    const csv = buildCsv(synthetic);
    expect(csv).toContain('"Ville, avec une virgule"');
    expect(csv).toContain('"Région ""guillemets"""');
    expect(csv).toContain('"Ligne\nmultiligne"');
  });

  it("leaves missing date_of_birth empty (never fabricated)", () => {
    const csv = buildCsv([synthetic[1]]);
    const cols = csv.trimEnd().split("\r\n")[1].split(",");
    const dobIndex = EXPORT_COLUMNS.indexOf("date_of_birth");
    expect(cols[dobIndex]).toBe("");
  });

  it("summary is anonymised (counts + hash only, no candidate data)", () => {
    const csv = buildCsv(synthetic);
    const summary = buildSummary(synthetic, csv, "postgres-local");
    expect(summary.rows).toBe(2);
    expect(summary.source).toBe("postgres-local");
    expect(summary.sha256).toBe(sha256(csv));
    const json = JSON.stringify(summary);
    expect(json).not.toContain("example.invalid");
    expect(json).not.toContain("Candidat International");
  });

  it("hash changes when content changes", () => {
    expect(sha256(buildCsv(synthetic))).not.toBe(sha256(buildCsv([synthetic[0]])));
  });

  it("accepts local PostgreSQL URLs and rejects remote hosts by default", () => {
    expect(validateExportDatabaseUrl("postgresql://user:synthetic@localhost:5432/festival_talent_test").hostname).toBe("localhost");
    expect(() => validateExportDatabaseUrl("postgresql://user:synthetic@database.example.invalid/festival_talent_test")).toThrow("remote_database_refused");
    expect(validateExportDatabaseUrl("postgresql://user:synthetic@database.example.invalid/festival_talent_test", true).hostname).toBe("database.example.invalid");
  });

  it("refuses repository outputs and derives an anonymised summary path", () => {
    const repository = "C:\\workspace\\festival-talent-2027";
    expect(() => resolveExportPaths("C:\\workspace\\festival-talent-2027\\private.csv", repository)).toThrow("repository_output_refused");
    expect(resolveExportPaths("C:\\FestivalTalentData\\exports-private\\safe.csv", repository).summaryPath).toBe("C:\\FestivalTalentData\\exports-private\\safe.summary.json");
    expect(() => resolveExportPaths("C:\\FestivalTalentData\\exports-private\\safe.json", repository)).toThrow("output_must_be_csv");
  });

  it("parses dry-run, output and explicit remote flags", () => {
    expect(parseExportArguments(["--dry-run"])).toEqual({ dryRun: true, allowRemote: false, output: undefined });
    expect(parseExportArguments(["--output", "C:\\private\\export.csv"])).toEqual({ dryRun: false, allowRemote: false, output: "C:\\private\\export.csv" });
    expect(parseExportArguments(["--output=C:\\private\\export.csv", "--allow-remote"])).toEqual({ dryRun: false, allowRemote: true, output: "C:\\private\\export.csv" });
    expect(() => parseExportArguments(["--output", "--dry-run"])).toThrow("output_path_missing");
  });
});
