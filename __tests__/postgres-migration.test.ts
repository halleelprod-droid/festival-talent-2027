import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { parseCsv, preparePreselections } from "@/src/import/preselections";
import { preselectionInputSchema } from "@/src/validation/preselection";

// date_of_birth = source de vérité ; l'ancienne colonne age n'est plus persistée.
const csv = `id,full_name,phone,email,date_of_birth,age,city,discipline,created_at
1,Personne A,770000001,a@example.test,2005-04-17,21,Dakar,Musique,2026-01-01T00:00:00Z
2,Personne B,+221770000001,invalid,2030-05-01,,dakar,Musique,2026-01-02T00:00:00Z
3,Personne C,1234,,,18,Thies,Danse,2026-01-03T00:00:00Z`;

describe("PostgreSQL preselection migration", () => {
  it("parses deterministically and preserves every raw row", () => {
    const first = preparePreselections(parseCsv(csv));
    const second = preparePreselections(parseCsv(csv));
    expect(first.prepared).toHaveLength(3);
    expect(second.report).toEqual(first.report);
    expect(first.prepared[0].raw.full_name).toBe("Personne A");
  });

  it("handles date_of_birth cases, blocks incomplete rows, never fabricates dates", () => {
    const result = preparePreselections(parseCsv(csv));
    expect(result.report).toMatchObject({
      total: 3, validDob: 1, invalidDob: 0, missingDob: 1, futureDob: 1,
      ageOutOfRange: 0, historicalAgeOnly: 1, ageDobMismatch: 0, validPhones: 2, invalidPhones: 1,
      invalidEmails: 1, duplicateRows: 1, uniqueContactable: 1, reviewSignals: 2,
      candidatesImportable: 1, candidatesBlocked: 2, registrationsImportable: 1,
    });
    // Aucune date n'est inventée : la ligne sans date reste à null et bloquée.
    expect(result.prepared[2].dateOfBirth).toBeNull();
    expect(result.prepared[2].importable).toBe(false);
    expect(result.prepared[2].reviewFlags).toContain("manual_birth_date_review_required");
    expect(result.prepared[0].dateOfBirth).toBe("2005-04-17");
    expect(result.prepared[0].importable).toBe(true);
    expect(result.duplicateSignals.some((signal) => signal.reason === "phone")).toBe(true);
  });

  it("validates the public payload with dateOfBirth and rejects the legacy age field", () => {
    const payload = { submission_key: "5f802f98-dc58-4e24-9998-5aba68e0b7a2", full_name: "Personne Test", phone: "770000001", email: "", dateOfBirth: "2005-04-17", city: "Dakar", discipline: "Musique", experience: "", portfolio_link: "", message: "", message_consent: false, privacy_consent: true, website: "" };
    expect(preselectionInputSchema.safeParse(payload).success).toBe(true);
    expect(preselectionInputSchema.safeParse({ ...payload, website: "bot" }).success).toBe(false);
    expect(preselectionInputSchema.safeParse({ ...payload, submission_key: "invalid" }).success).toBe(false);
    expect(preselectionInputSchema.safeParse({ ...payload, dateOfBirth: "17/04/2005" }).success).toBe(false);
    // Un payload sans dateOfBirth (ou ne portant qu'un ancien `age`) est rejeté.
    const { dateOfBirth, ...withoutDob } = payload; void dateOfBirth;
    expect(preselectionInputSchema.safeParse(withoutDob).success).toBe(false);
    expect(preselectionInputSchema.safeParse({ ...withoutDob, age: 22 }).success).toBe(false);
    expect(preselectionInputSchema.safeParse({ ...payload, age: 22 }).success).toBe(false);
  });

  it("removes the persisted age column and keeps guarded scripts", () => {
    const schema = readFileSync("src/db/schema/index.ts", "utf8");
    const migration = readFileSync("drizzle/0003_candidate-date-of-birth.sql", "utf8");
    const core = readFileSync("drizzle/0000_festival-talent-core.sql", "utf8");
    const backup = readFileSync("scripts/backup-database.sh", "utf8");
    const restore = readFileSync("scripts/restore-database.sh", "utf8");
    expect(schema).toContain('date("date_of_birth"');
    expect(schema).not.toContain('integer("age")');
    expect(migration).toContain("date_of_birth");
    expect(migration).toContain('DROP COLUMN "age"');
    const corrective = readFileSync("drizzle/0004_candidate-date-of-birth-constraint.sql", "utf8");
    expect(corrective).toContain("date_of_birth");
    expect(corrective).not.toContain("2100-01-01");
    expect(core).toContain("message_logs_success_once_idx");
    expect(backup).toContain("DATABASE_URL");
    expect(restore).toContain("--confirm-restore");
  });
});
