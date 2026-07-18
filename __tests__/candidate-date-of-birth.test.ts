import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  calculateAgeOnDate,
  compareCivilDates,
  isCandidateAgeEligible,
  isDateOfBirthInFuture,
  isValidCivilDate,
  parseCivilDate,
} from "@/src/lib/candidate-date-of-birth";
import { normalizeImportedDateOfBirth, parseCsv, preparePreselections, sanitizeLegacyPayload } from "@/src/import/preselections";
import { buildPreselectionConfirmation } from "@/src/services/messaging/confirmation-message";

const REF = "2027-12-20"; // date de référence fixe et déterministe
const csvHeader = "id,full_name,phone,email,date_of_birth,age,city,discipline,created_at";

describe("validation de date civile", () => {
  it.each([
    ["2004-02-29", true],
    ["2005-02-29", false],
    ["2000-01-01", true],
    ["1999-12-31", true],
    ["2005-04-17", true],
    ["2027-04-31", false],
    ["2027-13-01", false],
    ["2027-13-20", false],
    ["2027-00-20", false],
    ["2027-01-00", false],
    ["abcd-01-01", false],
    ["17/04/2005", false],
    ["2005-4-7", false],
    ["", false],
  ])("%s → %s", (value, expected) => {
    expect(isValidCivilDate(value)).toBe(expected);
  });

  it("parseCivilDate retourne des composants ou null", () => {
    expect(parseCivilDate("2004-09-23")).toEqual({ year: 2004, month: 9, day: 23 });
    expect(parseCivilDate("2027-02-30")).toBeNull();
  });

  it("compareCivilDates ordonne correctement", () => {
    expect(compareCivilDates("2004-01-01", "2005-01-01")).toBe(-1);
    expect(compareCivilDates("2005-01-01", "2004-01-01")).toBe(1);
    expect(compareCivilDates("2005-06-15", "2005-06-15")).toBe(0);
    expect(compareCivilDates("2005-06-15", "invalide")).toBeNull();
  });
});

describe("calcul d'âge à une date de référence", () => {
  it.each([
    ["2009-12-20", 18],
    ["2009-12-21", 17],
    ["2009-12-19", 18],
  ])("%s → %d ans au %s", (dob, expected) => {
    expect(calculateAgeOnDate(dob, REF)).toBe(expected);
  });

  it("convention 29 février : anniversaire au 1er mars en année non bissextile", () => {
    // 2027 n'est pas bissextile.
    expect(calculateAgeOnDate("2004-02-29", "2027-02-28")).toBe(22); // veille → pas encore
    expect(calculateAgeOnDate("2004-02-29", "2027-03-01")).toBe(23); // atteint
    expect(calculateAgeOnDate("2004-02-29", REF)).toBe(23);
  });

  it("retourne null pour une date invalide", () => {
    expect(calculateAgeOnDate("2005-02-29", REF)).toBeNull();
  });
});

describe("éligibilité métier", () => {
  // Bornes par défaut 6..100, référence édition 2027-01-01.
  it("exactement à l'âge minimum et un jour avant", () => {
    expect(isCandidateAgeEligible({ dateOfBirth: "2021-01-01" })).toBe(true); // 6 ans
    expect(isCandidateAgeEligible({ dateOfBirth: "2021-01-02" })).toBe(false); // 5 ans (veille)
  });

  it("exactement à l'âge maximum et un jour après", () => {
    expect(isCandidateAgeEligible({ dateOfBirth: "1927-01-01" })).toBe(true); // 100 ans
    expect(isCandidateAgeEligible({ dateOfBirth: "1926-01-01" })).toBe(false); // 101 ans
  });

  it("refuse une date future et une date extrêmement ancienne", () => {
    expect(isCandidateAgeEligible({ dateOfBirth: "2030-01-01", referenceDate: REF })).toBe(false);
    expect(isCandidateAgeEligible({ dateOfBirth: "1500-01-01" })).toBe(false);
    expect(isDateOfBirthInFuture("2030-01-01", REF)).toBe(true);
  });

  it("bornes désactivées quand null", () => {
    expect(isCandidateAgeEligible({ dateOfBirth: "2021-01-01", minimumAge: null, maximumAge: null })).toBe(true);
    expect(isCandidateAgeEligible({ dateOfBirth: "1900-01-01", minimumAge: null, maximumAge: null })).toBe(true);
  });
});

describe("import CSV — cas date de naissance", () => {
  const run = (line: string) => preparePreselections(parseCsv(`${csvHeader}\n${line}`));

  it("date_of_birth valide → importable", () => {
    const { prepared, report } = run("1,Aaa,770000001,,2006-06-15,,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.validDob).toBe(1);
    expect(prepared[0].importable).toBe(true);
    expect(prepared[0].dateOfBirth).toBe("2006-06-15");
  });

  it("alias dateOfBirth et date_de_naissance reconnus", () => {
    const camel = preparePreselections(parseCsv(`id,full_name,phone,email,dateOfBirth,city,discipline,created_at\n1,Bbb,770000001,,2006-06-15,Dakar,Danse,2026-01-01T00:00:00Z`));
    const fr = preparePreselections(parseCsv(`id,full_name,phone,email,date_de_naissance,city,discipline,created_at\n1,Ccc,770000001,,2006-06-15,Dakar,Danse,2026-01-01T00:00:00Z`));
    expect(camel.report.validDob).toBe(1);
    expect(fr.report.validDob).toBe(1);
  });

  it("normalise les formats historiques documentés sans les accepter dans l'API", () => {
    expect(normalizeImportedDateOfBirth("17/04/2005")).toBe("2005-04-17");
    expect(normalizeImportedDateOfBirth("17-04-2005")).toBe("2005-04-17");
    expect(normalizeImportedDateOfBirth("2005/04/17")).toBe("2005-04-17");
    expect(normalizeImportedDateOfBirth("03/04/2005")).toBe("2005-04-03");
  });

  it("âge seul → date manquante, bloquée, aucune fabrication", () => {
    const { prepared, report } = run("1,Ddd,770000001,,,18,Thies,Musique,2026-01-01T00:00:00Z");
    expect(report.missingDob).toBe(1);
    expect(report.historicalAgeOnly).toBe(1);
    expect(report.candidatesBlocked).toBe(1);
    expect(prepared[0].dateOfBirth).toBeNull();
    expect(prepared[0].importable).toBe(false);
    expect(prepared[0].reviewFlags).toContain("manual_birth_date_review_required");
  });

  it("date invalide → bloquée", () => {
    const { report, prepared } = run("1,Eee,770000001,,2027-02-31,,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.invalidDob).toBe(1);
    expect(prepared[0].reviewFlags).toContain("invalid_date_of_birth");
    expect(prepared[0].importable).toBe(false);
  });

  it("date future → bloquée et signalée", () => {
    const { report, prepared } = run("1,Fff,770000001,,2030-05-01,,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.futureDob).toBe(1);
    expect(prepared[0].reviewFlags).toContain("future_date_of_birth");
    expect(prepared[0].importable).toBe(false);
  });

  it("hors limites métier → bloquée", () => {
    const { report, prepared } = run("1,Fff,770000001,,1900-01-01,,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.ageOutOfRange).toBe(1);
    expect(prepared[0].importable).toBe(false);
  });

  it("ne persiste pas l'âge historique dans le payload legacy", () => {
    const payload = sanitizeLegacyPayload({ id: "1", age: "18", candidate_age: "18", date_of_birth: "2005-04-17", message: "ok" });
    expect(payload).toEqual({ id: "1", message: "ok" });
  });

  it("âge et date cohérents → pas de signal d'incohérence", () => {
    // 2005-04-17 au 2027-01-01 → 21 ans.
    const { report } = run("1,Ggg,770000001,,2005-04-17,21,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.ageDobMismatch).toBe(0);
    expect(report.validDob).toBe(1);
  });

  it("âge et date incohérents → signalé sans correction", () => {
    const { report, prepared } = run("1,Hhh,770000001,,2005-04-17,30,Dakar,Danse,2026-01-01T00:00:00Z");
    expect(report.ageDobMismatch).toBe(1);
    expect(prepared[0].dateOfBirth).toBe("2005-04-17");
    expect(prepared[0].reviewFlags).toContain("age_date_of_birth_mismatch");
  });

  it("doublon avec dates différentes → signal doublon, dates préservées", () => {
    const { prepared, duplicateSignals } = preparePreselections(parseCsv(`${csvHeader}\n1,Iii,770000001,,2005-04-17,,Dakar,Danse,2026-01-01T00:00:00Z\n2,Iii,+221770000001,,2006-06-15,,Dakar,Danse,2026-01-02T00:00:00Z`));
    expect(duplicateSignals.some((s) => s.reason === "phone")).toBe(true);
    expect(prepared[0].dateOfBirth).toBe("2005-04-17");
    expect(prepared[1].dateOfBirth).toBe("2006-06-15");
  });
});

describe("confidentialité", () => {
  it("la date de naissance n'apparaît pas dans le SMS de confirmation", () => {
    const message = buildPreselectionConfirmation("Awa Ndiaye");
    expect(message).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(message).not.toMatch(/naissance/i);
  });

  it("la route publique de comptage n'expose aucune date de naissance", () => {
    const route = readFileSync("app/api/public/preselection-count/route.ts", "utf8");
    expect(route).not.toContain("dateOfBirth");
    expect(route).not.toContain("date_of_birth");
  });

  it("la réponse publique d'inscription ne renvoie pas la date de naissance", () => {
    const route = readFileSync("app/api/preselections/route.ts", "utf8");
    // La réponse ne contient que { ok: ... } — jamais le candidat ni sa date.
    expect(route).not.toMatch(/NextResponse\.json\(\{[^}]*dateOfBirth/);
    expect(route).toContain("NextResponse.json({ ok: true }");
  });

  it("l'export admin est protégé et calcule l'âge à l'export", () => {
    const route = readFileSync("app/api/admin/candidates/export/route.ts", "utf8");
    expect(route).toContain("requireAdmin(exportRoles)");
    expect(route).toContain("status: 403");
    expect(route).toContain("writeAuditLog");
    for (const col of ["date_of_birth", "calculated_age", "age_reference_date", "birth_date_review_required"]) {
      expect(route).toContain(col);
    }
    // calculated_age n'est pas lu depuis la base : il est calculé à l'export.
    expect(route).toContain("calculateAgeOnDate");
  });

  it("les anciennes migrations ne sont pas modifiées rétroactivement", () => {
    const legacy = readFileSync("drizzle/0001_candidate-age-constraint.sql", "utf8");
    expect(legacy).toContain("candidates_age_reasonable"); // historique préservé
    const current = readFileSync("drizzle/0003_candidate-date-of-birth.sql", "utf8");
    expect(current).toContain('DROP COLUMN "age"');
  });
});
