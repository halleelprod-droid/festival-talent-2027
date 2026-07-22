import { describe, expect, it } from "vitest";

import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
import { HUMAN_REVIEW_COLUMNS } from "@/src/import/preselection-review";
import {
  applyEdits, backupFileName, buildContactMessage, buildImportReadyRows, computeDashboard,
  computeVersion, hasVersionConflict, isAllowedHost, isPathWithin, isProductionEnv,
  needsContact, parseReviewContent, planBackupDeletions, previewResponses, serializeReviewContent,
} from "@/src/import/preselection-review-server";

const COLS = [...HUMAN_REVIEW_COLUMNS];
function row(overrides: Record<string, string> = {}) {
  const base: Record<string, string> = {};
  for (const c of COLS) base[c] = "";
  base.review_id = "FT-PSR-0001"; base.source_id = "src-1"; base.full_name = "Test Person";
  base.phone_original = "+221771234567"; base.phone_normalized = "+221771234567"; base.phone_status = "valid";
  base.email = "p@example.com"; base.age_legacy = "26"; base.discipline = "Danse";
  base.created_at = "2026-06-01T00:00:00.000Z"; base.review_status = "pending_birth_date";
  return { ...base, ...overrides };
}
function csvOf(rows: Record<string, string>[]) { return serializeReviewContent(COLS, rows); }
const validPhone = (v: string) => normalizeSenegalPhone(v).valid;

describe("environment & host guards", () => {
  it("detects production and Vercel", () => {
    expect(isProductionEnv({ NODE_ENV: "production" } as NodeJS.ProcessEnv)).toBe(true);
    expect(isProductionEnv({ VERCEL: "1" } as unknown as NodeJS.ProcessEnv)).toBe(true);
    expect(isProductionEnv({ NODE_ENV: "development" } as NodeJS.ProcessEnv)).toBe(false);
  });
  it("allows only localhost hosts", () => {
    expect(isAllowedHost("127.0.0.1:4317")).toBe(true);
    expect(isAllowedHost("localhost:4317")).toBe(true);
    expect(isAllowedHost("[::1]:4317")).toBe(true);
    expect(isAllowedHost("0.0.0.0:4317")).toBe(false);
    expect(isAllowedHost("192.168.1.10:4317")).toBe(false);
    expect(isAllowedHost("evil.example.com")).toBe(false);
    expect(isAllowedHost(undefined)).toBe(false);
  });
});

describe("path containment", () => {
  it("accepts a file inside the allowed dir and rejects traversal", () => {
    const dir = "C:/FestivalTalentData/exports-private";
    expect(isPathWithin(`${dir}/preselections-human-review-2026-07-22.csv`, dir)).toBe(true);
    expect(isPathWithin(`${dir}/review-backups/x.csv`, dir)).toBe(true);
    expect(isPathWithin("C:/Windows/system32/config", dir)).toBe(false);
    expect(isPathWithin(`${dir}/../secret.env`, dir)).toBe(false);
  });
});

describe("CSV round-trip", () => {
  it("parses columns and rows and serializes back losslessly", () => {
    const csv = csvOf([row(), row({ review_id: "FT-PSR-0002", source_id: "src-2", message: 'a "quoted", value' } as Record<string, string>)]);
    const parsed = parseReviewContent(csv);
    expect(parsed.columns).toEqual(COLS);
    expect(parsed.rows).toHaveLength(2);
    expect(serializeReviewContent(parsed.columns, parsed.rows)).toBe(csv);
  });
  it("rejects a missing file column set only via load path (empty content yields default columns)", () => {
    const parsed = parseReviewContent("");
    expect(parsed.columns).toEqual(COLS);
    expect(parsed.rows).toEqual([]);
  });
});

describe("applyEdits", () => {
  it("applies whitelisted fields by review_id", () => {
    const rows = [row(), row({ review_id: "FT-PSR-0002", source_id: "src-2" })];
    const res = applyEdits(rows, { "FT-PSR-0002": { date_of_birth: "2000-05-15", review_decision: "approved" } });
    expect(res.applied).toBe(1);
    expect(res.rows[1].date_of_birth).toBe("2000-05-15");
    expect(res.rows[0].date_of_birth).toBe("");
  });
  it("rejects unknown fields and unknown review_id", () => {
    const rows = [row()];
    const res = applyEdits(rows, {
      "FT-PSR-0001": { full_name: "hacked", date_of_birth: "2000-05-15" } as Record<string, string>,
      "FT-PSR-9999": { date_of_birth: "2000-01-01" },
    });
    expect(res.rejectedFields).toContain("full_name");
    expect(res.rows[0].full_name).toBe("Test Person"); // unchanged
    expect(res.unknownIds).toContain("FT-PSR-9999");
  });
});

describe("versioning & backups", () => {
  it("computes a stable version and detects conflicts", () => {
    const a = computeVersion("x"); const b = computeVersion("x"); const c = computeVersion("y");
    expect(a).toBe(b);
    expect(hasVersionConflict(a, b)).toBe(false);
    expect(hasVersionConflict(a, c)).toBe(true);
    expect(hasVersionConflict(undefined, c)).toBe(false); // first write tolerated
  });
  it("backup name is timestamped", () => {
    const name = backupFileName("preselections-human-review", new Date("2026-07-22T04:05:06"));
    expect(name).toBe("preselections-human-review-2026-07-22_04-05-06.csv");
  });
  it("keeps at most 20 backups", () => {
    const names = Array.from({ length: 23 }, (_, i) => `b-2026-07-22_00-00-${String(i).padStart(2, "0")}.csv`);
    const toDelete = planBackupDeletions(names, 20);
    expect(toDelete).toHaveLength(3);
    expect(toDelete[0]).toBe(names[0]); // oldest first
    expect(planBackupDeletions(names.slice(0, 10), 20)).toEqual([]);
  });
});

describe("manual responses import (key = review_id)", () => {
  const known = new Set(["FT-PSR-0001", "FT-PSR-0002"]);
  it("applies a valid dob and a corrected phone", () => {
    const p = previewResponses(
      [{ review_id: "FT-PSR-0001", date_of_birth: "2000-05-15", phone_corrected: "+221781112233", review_notes: "ok" }],
      known, validPhone, { today: "2026-07-22" },
    );
    expect(p.applicableCount).toBe(1);
    expect(p.applicable["FT-PSR-0001"].date_of_birth).toBe("2000-05-15");
    expect(p.applicable["FT-PSR-0001"].phone_status).toBe("corrected");
  });
  it("rejects unknown review_id (never keyed by name/phone)", () => {
    const p = previewResponses(
      [{ review_id: "", date_of_birth: "2000-05-15", phone_corrected: "", review_notes: "" }],
      known, validPhone,
    );
    expect(p.unknownIds).toBe(1);
    expect(p.applicableCount).toBe(0);
  });
  it("counts invalid dob and invalid phone", () => {
    const p = previewResponses(
      [
        { review_id: "FT-PSR-0001", date_of_birth: "2000-02-31", phone_corrected: "", review_notes: "" },
        { review_id: "FT-PSR-0002", date_of_birth: "", phone_corrected: "123", review_notes: "" },
      ],
      known, validPhone, { today: "2026-07-22" },
    );
    expect(p.invalidDob).toBe(1);
    expect(p.invalidPhone).toBe(1);
    expect(p.applicableCount).toBe(0);
  });
});

describe("contact mode", () => {
  it("selects rows needing contact", () => {
    expect(needsContact(row({ date_of_birth: "" }))).toBe(true);
    expect(needsContact(row({ date_of_birth: "2000-05-15", phone_status: "needs_contact", review_decision: "approved" }))).toBe(true);
    expect(needsContact(row({ date_of_birth: "2000-05-15", phone_status: "valid", review_decision: "approved" }))).toBe(false);
  });
  it("builds a message with the name and no phone/email", () => {
    const msg = buildContactMessage("Awa Diop");
    expect(msg).toContain("Awa Diop");
    expect(msg).toContain("Festival Talent 2027");
    expect(msg).not.toContain("+221");
  });
});

describe("dashboard & import-ready", () => {
  it("computes numeric-only dashboard counters", () => {
    const dash = computeDashboard([row(), row({ review_id: "FT-PSR-0002", source_id: "src-2" })], { today: "2026-07-22" });
    expect(dash.total).toBe(2);
    expect(dash.dobRemaining).toBe(2);
    for (const v of Object.values(dash)) expect(typeof v).toBe("number");
  });
  it("builds import-ready rows only for ready ids, using the source for city", () => {
    const reviewRows = [row({ source_id: "src-1", date_of_birth: "2000-05-15", phone_status: "corrected", phone_normalized: "+221781112233" })];
    const sourceRows = [{ id: "src-1", full_name: "Test Person", phone: "+221770000000", email: "p@example.com", city: "Dakar", discipline: "Danse", experience: "", portfolio_link: "", message: "", created_at: "2026-06-01T00:00:00.000Z" }];
    const ready = new Set(["src-1"]);
    const out = buildImportReadyRows(reviewRows, sourceRows, ready);
    expect(out).toHaveLength(1);
    expect(out[0][2]).toBe("+221781112233"); // corrected phone used
    expect(out[0][4]).toBe("2000-05-15"); // dob
    expect(out[0][5]).toBe("Dakar"); // city from source
  });
  it("emits nothing when no ready ids (import-ready blocked)", () => {
    const out = buildImportReadyRows([row({ source_id: "src-1" })], [{ id: "src-1" }], new Set());
    expect(out).toEqual([]);
  });
});
