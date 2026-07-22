import { describe, expect, it } from "vitest";

import type { PreparedPreselection } from "@/src/import/preselections";
import {
  buildDuplicateGroups,
  buildHumanReview,
  generateReviewId,
  HUMAN_REVIEW_COLUMNS,
  selectImportReady,
  validateDuplicateReviewRows,
  validateHumanReviewRows,
  validatePhoneReviewRows,
  type ReviewRow,
} from "@/src/import/preselection-review";

// Toutes les données de test sont SYNTHÉTIQUES. Aucune donnée réelle.
const OPTS = { referenceDate: "2027-01-01", today: "2026-07-22" };

// Ligne de revue « propre » : DOB valide, éligible, téléphone valide, approuvée.
function reviewRow(overrides: Partial<Record<(typeof HUMAN_REVIEW_COLUMNS)[number], string>> = {}): ReviewRow {
  const base: ReviewRow = {
    review_id: "FT-PSR-0001", source_id: "src-1", full_name: "Test Person",
    phone_original: "+221771234567", phone_normalized: "+221771234567", phone_status: "valid",
    email: "person@example.com", age_legacy: "26", date_of_birth: "2000-05-15",
    discipline: "Danse", created_at: "2026-06-01T00:00:00.000Z",
    duplicate_group_id: "", duplicate_reason: "", review_status: "pending_birth_date",
    review_decision: "approved", review_notes: "",
  };
  return { ...base, ...overrides };
}

function prep(overrides: Partial<PreparedPreselection> = {}): PreparedPreselection {
  return {
    legacyId: "src-1", fullName: "Test Person", phoneRaw: "+221771234567",
    phoneNormalized: "+221771234567", phoneValid: true, email: "person@example.com",
    dateOfBirth: null, city: "Dakar", discipline: "Danse",
    createdAt: new Date("2026-06-01T00:00:00.000Z"), historicalAge: 26,
    importable: false, reviewFlags: ["manual_birth_date_review_required"], raw: {},
    ...overrides,
  };
}

describe("validateHumanReviewRows - date of birth", () => {
  it("accepts a clean approved row as import-ready", () => {
    const { results, counters } = validateHumanReviewRows([reviewRow()], OPTS);
    expect(results[0].ready).toBe(true);
    expect(results[0].reasonCodes).toEqual([]);
    expect(counters.ready).toBe(1);
    expect(selectImportReady(results)).toHaveLength(1);
  });

  it("blocks a pending (empty) date of birth", () => {
    const { results, counters } = validateHumanReviewRows([reviewRow({ date_of_birth: "", review_decision: "" })], OPTS);
    expect(results[0].reasonCodes).toContain("pending_birth_date");
    expect(results[0].ready).toBe(false);
    expect(counters.pendingDob).toBe(1);
  });

  it("rejects an impossible date (31 February)", () => {
    const { results } = validateHumanReviewRows([reviewRow({ date_of_birth: "2000-02-31" })], OPTS);
    expect(results[0].reasonCodes).toContain("invalid_date_of_birth");
    expect(results[0].ready).toBe(false);
  });

  it("rejects a false 29 February (non-leap year)", () => {
    const { results } = validateHumanReviewRows([reviewRow({ date_of_birth: "2001-02-29" })], OPTS);
    expect(results[0].reasonCodes).toContain("invalid_date_of_birth");
  });

  it("accepts a real 29 February (leap year)", () => {
    const { results } = validateHumanReviewRows([reviewRow({ date_of_birth: "2000-02-29", age_legacy: "26" })], OPTS);
    expect(results[0].reasonCodes).toEqual([]);
    expect(results[0].ready).toBe(true);
  });

  it("rejects a future date of birth", () => {
    const { results, counters } = validateHumanReviewRows([reviewRow({ date_of_birth: "2030-01-01" })], OPTS);
    expect(results[0].reasonCodes).toContain("future_date_of_birth");
    expect(counters.futureDob).toBe(1);
  });

  it("flags an age mismatch beyond tolerance when not explicitly approved", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow({ age_legacy: "20", review_decision: "hold" })], OPTS,
    );
    expect(results[0].reasonCodes).toContain("age_mismatch");
    expect(counters.ageMismatch).toBe(1);
    expect(results[0].ready).toBe(false);
  });

  it("counts the mismatch but allows it when a human explicitly approves", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow({ age_legacy: "20", review_decision: "approved" })], OPTS,
    );
    expect(counters.ageMismatch).toBe(1);
    expect(results[0].reasonCodes).not.toContain("age_mismatch");
    expect(results[0].ready).toBe(true);
  });
});

describe("validateHumanReviewRows - phone", () => {
  it("accepts a corrected phone with a valid normalized value", () => {
    const { results } = validateHumanReviewRows(
      [reviewRow({ phone_status: "corrected", phone_normalized: "+221781112233" })], OPTS,
    );
    expect(results[0].ready).toBe(true);
  });

  it("blocks a corrected phone with an invalid value", () => {
    const { results } = validateHumanReviewRows(
      [reviewRow({ phone_status: "corrected", phone_normalized: "123" })], OPTS,
    );
    expect(results[0].reasonCodes).toContain("corrected_phone_invalid");
    expect(results[0].ready).toBe(false);
  });

  it("blocks an unresolved phone decision", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow({ phone_status: "needs_contact" })], OPTS,
    );
    expect(results[0].reasonCodes).toContain("phone_unresolved");
    expect(counters.phoneUnresolved).toBe(1);
  });

  it("rejects an unknown phone status", () => {
    const { results } = validateHumanReviewRows([reviewRow({ phone_status: "banana" })], OPTS);
    expect(results[0].reasonCodes).toContain("unknown_phone_status");
  });
});

describe("validateHumanReviewRows - uniqueness & required", () => {
  it("detects duplicate review_id", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow(), reviewRow({ source_id: "src-2" })], OPTS,
    );
    expect(results[1].reasonCodes).toContain("duplicate_review_id");
    expect(counters.duplicateReviewIds).toBe(1);
  });

  it("detects duplicate source_id", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow(), reviewRow({ review_id: "FT-PSR-0002" })], OPTS,
    );
    expect(results[1].reasonCodes).toContain("duplicate_source_id");
    expect(counters.duplicateSourceIds).toBe(1);
  });

  it("flags missing required fields", () => {
    const { results } = validateHumanReviewRows([reviewRow({ review_id: "", source_id: "" })], OPTS);
    expect(results[0].reasonCodes).toContain("missing_required_field");
  });

  it("rejects an unrecognized discipline", () => {
    const { results, counters } = validateHumanReviewRows([reviewRow({ discipline: "Cuisine" })], OPTS);
    expect(results[0].reasonCodes).toContain("unrecognized_discipline");
    expect(counters.unrecognizedDiscipline).toBe(1);
  });

  it("rejects an unknown review decision", () => {
    const { results } = validateHumanReviewRows([reviewRow({ review_decision: "maybe" })], OPTS);
    expect(results[0].reasonCodes).toContain("unknown_review_decision");
  });
});

describe("validateHumanReviewRows - duplicates", () => {
  it("blocks a row in a duplicate group with no decision", () => {
    const { results, counters } = validateHumanReviewRows(
      [reviewRow({ duplicate_group_id: "DUP-0001", review_decision: "" })], OPTS,
    );
    expect(results[0].reasonCodes).toContain("duplicate_unresolved");
    expect(counters.duplicatePending).toBe(1);
    expect(results[0].ready).toBe(false);
  });
});

describe("validatePhoneReviewRows", () => {
  it("resolves confirmed_valid and corrected(valid), flags unresolved and unknown", () => {
    const rows: ReviewRow[] = [
      { review_id: "A", review_decision: "confirmed_valid", suggested_format: "" },
      { review_id: "B", review_decision: "corrected", suggested_format: "+221781112233" },
      { review_id: "C", review_decision: "", suggested_format: "" },
      { review_id: "D", review_decision: "corrected", suggested_format: "999" },
      { review_id: "E", review_decision: "banana", suggested_format: "" },
    ];
    const { counters } = validatePhoneReviewRows(rows);
    expect(counters.resolved).toBe(2);
    expect(counters.unresolved).toBe(1);
    expect(counters.correctedMissingFormat).toBe(1);
    expect(counters.unknownDecision).toBe(1);
  });
});

describe("validateDuplicateReviewRows", () => {
  it("resolves valid decisions and flags unresolved", () => {
    const rows: ReviewRow[] = [
      { duplicate_group_id: "DUP-0001", review_decision: "same_person_keep_oldest" },
      { duplicate_group_id: "DUP-0001", review_decision: "same_person_keep_oldest" },
      { duplicate_group_id: "DUP-0002", review_decision: "" },
    ];
    const { counters } = validateDuplicateReviewRows(rows);
    expect(counters.groups).toBe(2);
    expect(counters.resolved).toBe(2);
    expect(counters.unresolved).toBe(1);
    expect(counters.incoherentGroups).toBe(0);
  });

  it("detects an incoherent group mixing distinct_people and same_person", () => {
    const rows: ReviewRow[] = [
      { duplicate_group_id: "DUP-0001", review_decision: "distinct_people" },
      { duplicate_group_id: "DUP-0001", review_decision: "same_person_keep_latest" },
    ];
    const { counters } = validateDuplicateReviewRows(rows);
    expect(counters.incoherentGroups).toBe(1);
  });
});

describe("buildDuplicateGroups", () => {
  it("merges transitive signals into a single group", () => {
    const groups = buildDuplicateGroups(5, [
      { first: 0, second: 1, reason: "phone", score: 1 },
      { first: 1, second: 2, reason: "email", score: 0.95 },
    ]);
    expect(groups.groupCount).toBe(1);
    expect(groups.involvedCount).toBe(3);
    expect(groups.groupIdByIndex.get(0)).toBe(groups.groupIdByIndex.get(2));
  });

  it("keeps unrelated pairs in separate groups", () => {
    const groups = buildDuplicateGroups(4, [
      { first: 0, second: 1, reason: "phone", score: 1 },
      { first: 2, second: 3, reason: "email", score: 0.95 },
    ]);
    expect(groups.groupCount).toBe(2);
    expect(groups.involvedCount).toBe(4);
  });
});

describe("buildHumanReview", () => {
  it("classifies missing DOB + invalid phone as multiple_issues and builds sub-files", () => {
    const prepared = [
      prep({ legacyId: "a", phoneValid: true }),
      prep({ legacyId: "b", phoneValid: false, phoneNormalized: null, historicalAge: 30 }),
    ];
    const build = buildHumanReview(prepared, []);
    expect(build.reviewRows).toHaveLength(2);
    expect(build.summary.total).toBe(2);
    expect(build.summary.missingDob).toBe(2);
    expect(build.summary.invalidPhones).toBe(1);
    expect(build.phoneRows).toHaveLength(1);
    // Row b has DOB missing + phone invalid => multiple_issues.
    const statusIndex = HUMAN_REVIEW_COLUMNS.indexOf("review_status");
    expect(build.reviewRows[1][statusIndex]).toBe("multiple_issues");
    // date_of_birth column is always empty at generation (never fabricated).
    const dobIndex = HUMAN_REVIEW_COLUMNS.indexOf("date_of_birth");
    expect(build.reviewRows[0][dobIndex]).toBe("");
    expect(build.summary.rowsReady).toBe(0);
  });

  it("emits duplicate rows and counts new registrations after the cutoff", () => {
    const prepared = [
      prep({ legacyId: "a", createdAt: new Date("2026-07-10T00:00:00Z") }),
      prep({ legacyId: "b", createdAt: new Date("2026-07-20T00:00:00Z") }),
    ];
    const build = buildHumanReview(prepared, [{ first: 0, second: 1, reason: "phone", score: 1 }]);
    expect(build.summary.duplicateGroups).toBe(1);
    expect(build.summary.rowsInDuplicateGroups).toBe(2);
    expect(build.duplicateRows).toHaveLength(2);
    expect(build.summary.newRegistrations).toBe(1);
  });
});

describe("generateReviewId", () => {
  it("produces stable zero-padded ids", () => {
    expect(generateReviewId(0)).toBe("FT-PSR-0001");
    expect(generateReviewId(35)).toBe("FT-PSR-0036");
  });
});
