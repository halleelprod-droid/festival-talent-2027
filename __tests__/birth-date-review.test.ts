import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  createCandidateReviewFingerprint,
  maskEmailAddress,
  maskFullName,
  maskPhoneNumber,
} from "@/src/lib/privacy-mask";
import {
  buildBirthDateAuditEntry,
  classifyUpdate,
  generateReviewId,
  resolveExecutionMode,
  validateReviewRows,
  type ReviewRow,
} from "@/src/lib/birth-date-review";

const baseRow = (over: Partial<ReviewRow> = {}): ReviewRow => ({
  review_id: "FT-DOB-0001", source_row: "2", masked_name: "A*** D**",
  masked_phone: "******1234", masked_email: "a***@example.com", discipline: "Danse",
  historical_age: "", date_of_birth: "2009-05-12", verification_method: "candidate_confirmation",
  verification_status: "verified", review_notes: "", ...over,
});

describe("masquage des données personnelles", () => {
  it("3. masque le téléphone en ne gardant que les 4 derniers chiffres", () => {
    expect(maskPhoneNumber("+221781948606")).toBe("********8606");
    expect(maskPhoneNumber(null)).toBe("—");
  });

  it("4. masque l'e-mail en conservant le domaine", () => {
    expect(maskEmailAddress("ibrahima@domaine.com")).toBe("i***@domaine.com");
  });

  it("5. masque le nom complet", () => {
    expect(maskFullName("Ibrahima Fall")).toBe("I******* F***");
  });

  it("empreinte HMAC stable et vide sans secret", () => {
    const parts = { normalizedPhone: "+221771234567", normalizedEmail: "a@b.com", sourceRow: 2 };
    expect(createCandidateReviewFingerprint(parts, undefined)).toBe("");
    const a = createCandidateReviewFingerprint(parts, "secret-de-revue");
    const b = createCandidateReviewFingerprint(parts, "secret-de-revue");
    expect(a).toBe(b);
    expect(a).not.toContain("221771234567");
  });
});

describe("identifiant de revue", () => {
  it("1. génère un review_id opaque et stable", () => {
    expect(generateReviewId(0)).toBe("FT-DOB-0001");
    expect(generateReviewId(30)).toBe("FT-DOB-0031");
  });
});

describe("validation du fichier de revue", () => {
  it("6. détecte une date invalide", () => {
    const { results } = validateReviewRows([baseRow({ date_of_birth: "2005-02-31" })]);
    expect(results[0].reasonCodes).toContain("invalid_date_of_birth");
    expect(results[0].ready).toBe(false);
  });

  it("7. détecte une date future", () => {
    const { results } = validateReviewRows([baseRow({ date_of_birth: "2999-01-01" })], { today: "2027-12-20" });
    expect(results[0].reasonCodes).toContain("future_date_of_birth");
  });

  it("8. détecte un statut invalide", () => {
    const { results } = validateReviewRows([baseRow({ verification_status: "maybe" })]);
    expect(results[0].reasonCodes).toContain("invalid_status");
  });

  it("9. détecte une méthode manquante quand vérifié", () => {
    const { results } = validateReviewRows([baseRow({ verification_method: "" })]);
    expect(results[0].reasonCodes).toContain("missing_verification_method");
  });

  it("9b. détecte une méthode de vérification invalide (valeur non reconnue)", () => {
    const { results } = validateReviewRows([baseRow({ verification_method: "some_bogus_method" })]);
    expect(results[0].reasonCodes).toContain("invalid_verification_method");
    expect(results[0].ready).toBe(false);
  });

  it("10. détecte un review_id inconnu", () => {
    const { results } = validateReviewRows([baseRow({ review_id: "FT-DOB-9999" })], { knownIds: new Set(["FT-DOB-0001"]) });
    expect(results[0].reasonCodes).toContain("unknown_review_id");
  });

  it("11. détecte un doublon de review_id", () => {
    const { results } = validateReviewRows([baseRow(), baseRow({ source_row: "3" })]);
    expect(results[1].reasonCodes).toContain("duplicate_review_id");
  });

  it("12. détecte deux lignes ciblant le même candidat", () => {
    const { results } = validateReviewRows([baseRow(), baseRow({ review_id: "FT-DOB-0002" })]);
    expect(results[1].reasonCodes).toContain("duplicate_candidate_target");
  });

  it("13. signale l'incohérence avec l'âge historique sans bloquer", () => {
    // 2005-04-17 → 21 ans au 2027-01-01 ; historique 30 → incohérent.
    const { results } = validateReviewRows([baseRow({ date_of_birth: "2005-04-17", historical_age: "30" })]);
    expect(results[0].reasonCodes).toContain("historical_age_mismatch");
    expect(results[0].ready).toBe(true); // non bloquant
  });

  it("une ligne complète et vérifiée est prête", () => {
    const { results, counters } = validateReviewRows([baseRow()]);
    expect(results[0].ready).toBe(true);
    expect(counters.ready).toBe(1);
  });
});

describe("idempotence de la mise à jour", () => {
  it("14. conflit avec une date déjà présente différente", () => {
    expect(classifyUpdate("2000-01-01", "2005-04-17")).toBe("conflict");
  });

  it("15. date identique déjà présente → déjà à jour", () => {
    expect(classifyUpdate("2005-04-17", "2005-04-17")).toBe("already_up_to_date");
  });

  it("date absente → mise à jour potentielle", () => {
    expect(classifyUpdate(null, "2005-04-17")).toBe("would_update");
  });
});

describe("gardes d'exécution", () => {
  it("16. dry-run par défaut sans option", () => {
    expect(resolveExecutionMode([])).toBe("dry-run");
  });

  it("17. refuse --execute seul", () => {
    expect(() => resolveExecutionMode(["--execute"])).toThrow(/both_flags_required/);
  });

  it("18. refuse --confirm-birth-date-update seul", () => {
    expect(() => resolveExecutionMode(["--confirm-birth-date-update"])).toThrow(/both_flags_required/);
  });

  it("19. accepte les deux options ensemble", () => {
    expect(resolveExecutionMode(["--execute", "--confirm-birth-date-update"])).toBe("execute");
  });
});

describe("audit sans donnée en clair", () => {
  it("20. l'entrée d'audit ne contient pas la date de naissance", () => {
    const entry = buildBirthDateAuditEntry({
      candidateId: "cand-1", reviewId: "FT-DOB-0001",
      verificationMethod: "candidate_confirmation", source: "birth-date-review", adminUserId: "admin-1",
    });
    expect(entry.action).toBe("candidate_birth_date_verified");
    const serialized = JSON.stringify(entry);
    expect(serialized).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(serialized).not.toContain("dateOfBirth\":\"2");
    expect(serialized).not.toContain("@");
  });
});

describe("confidentialité des scripts", () => {
  it("2 & 20. les scripts n'impriment aucune donnée complète, seulement des compteurs/références", () => {
    const generate = readFileSync("scripts/generate-birth-date-review.ts", "utf8");
    const validate = readFileSync("scripts/validate-birth-date-review.ts", "utf8");
    // Les colonnes du fichier de revue sont masquées.
    expect(generate).toContain("maskFullName");
    expect(generate).toContain("maskPhoneNumber");
    expect(generate).toContain("maskEmailAddress");
    // Aucun console.log de nom/téléphone/email/date bruts.
    for (const source of [generate, validate]) {
      expect(source).not.toMatch(/console\.log\([^)]*fullName/);
      expect(source).not.toMatch(/console\.log\([^)]*phoneRaw/);
      expect(source).not.toMatch(/console\.log\([^)]*dateOfBirth/);
    }
    // Le fichier d'erreurs ne contient que review_id, source_row, reason_code.
    expect(validate).toContain('"review_id", "source_row", "reason_code"');
  });

  it("les fichiers privés de revue sont ignorés par Git", () => {
    const gitignore = readFileSync(".gitignore", "utf8");
    for (const file of ["birth-date-review.csv", "birth-date-review-map.csv", "birth-date-review-errors.csv"]) {
      expect(gitignore).toContain(file);
    }
  });
});
