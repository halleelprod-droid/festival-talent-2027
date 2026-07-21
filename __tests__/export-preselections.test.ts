import { describe, expect, it } from "vitest";
import { EXPORT_COLUMNS, buildCsv, buildSummary, sha256, type ExportRow } from "@/src/export/preselections";

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
});
