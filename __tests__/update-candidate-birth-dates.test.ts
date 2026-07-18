import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { runUpdate, type FileSystemReader } from "../scripts/update-candidate-birth-dates";
import { adminUsers, candidates } from "@/src/db/schema";

// ── DB mock ──────────────────────────────────────────────────────────────────

const mockTx = {
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
};

const mockDb = {
  transaction: vi.fn((callback) => callback(mockTx)),
};

vi.mock("@/src/db/connection", () => ({
  getDb: () => mockDb,
}));

// ── Query chain helper ────────────────────────────────────────────────────────
// Retourne un objet chaînable minimal compatible avec les select/insert/update
// drizzle utilisés dans le script.

interface Chain {
  from: (t?: unknown) => Chain;
  where: () => Chain;
  limit: () => Chain;
  set: () => Chain;
  values: (v: unknown) => Chain;
  onConflictDoNothing: () => Chain;
  returning: () => Chain;
  then: (res?: (v: unknown) => unknown) => Promise<unknown>;
  _inserted?: unknown;
}

function chainResolving(result: unknown): Chain {
  const q = {} as Chain;
  q.from = () => q;
  q.where = () => q;
  q.limit = () => q;
  q.set = () => q;
  q.values = (vals: unknown) => { q._inserted = vals; return q; };
  q.onConflictDoNothing = () => q;
  q.returning = () => q;
  q.then = (res?: (v: unknown) => unknown) => {
    const p = Promise.resolve(result);
    return res ? p.then(res) : p;
  };
  return q;
}

// ── FS stub ───────────────────────────────────────────────────────────────────

function makeFs(files: Record<string, string>): FileSystemReader {
  return {
    readFileSync(path: string): string {
      // Cherche par fin de chemin pour supporter les chemins absolus/relatifs.
      const key = Object.keys(files).find((k) => path.endsWith(k) || path === k);
      if (key) return files[key];
      throw new Error(`ENOENT: ${path}`);
    },
    existsSync(path: string): boolean {
      return Object.keys(files).some((k) => path.endsWith(k) || path === k);
    },
  };
}

// ── Données de test de base ───────────────────────────────────────────────────

const BASE_REVIEW_CSV = `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,candidate_confirmation,verified,`;

const BASE_MAP_CSV = `review_id,candidate_id,registration_id,source_row,source_fingerprint
FT-DOB-0001,cand-1,reg-1,2,abcde12345`;

const BASE_FILES: Record<string, string> = {
  "birth-date-review.csv": BASE_REVIEW_CSV,
  "birth-date-review-map.csv": BASE_MAP_CSV,
};

// ── Describe ──────────────────────────────────────────────────────────────────

describe("scripts/update-candidate-birth-dates.ts", () => {
  let mockAdminResponse: { id: string; email: string; active: boolean; role: string }[];
  let mockCandidateResponse: { id: string; legacySourceId: string; dateOfBirth: string | null }[];
  let loggedData: string[];

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DATABASE_URL = "postgres://localhost/test";

    mockAdminResponse = [{ id: "admin-1", email: "admin@example.com", active: true, role: "admin" }];
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];

    // mockTx.select retourne un résultat selon la table interrogée.
    mockTx.select.mockImplementation(() => {
      return {
        from: (table: unknown) => {
          if (table === adminUsers) return chainResolving(mockAdminResponse);
          if (table === candidates) return chainResolving(mockCandidateResponse);
          return chainResolving([]);
        },
      };
    });
    mockTx.insert.mockImplementation(() => chainResolving([]));
    mockTx.update.mockImplementation(() => chainResolving([]));

    loggedData = [];
    vi.spyOn(console, "log").mockImplementation((...args) => {
      loggedData.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper : exécution avec les fichiers par défaut et éventuellement des surcharges.
  function run(argv: string[], fileOverrides: Record<string, string> = {}) {
    return runUpdate(argv, makeFs({ ...BASE_FILES, ...fileOverrides }));
  }

  // ── Tests ─────────────────────────────────────────────────────────────────

  it("1. dry-run par défaut", async () => {
    await run([]);
    expect(loggedData).toHaveLength(1);
    const s = JSON.parse(loggedData[0]);
    expect(s.mode).toBe("dry-run");
    expect(s.total).toBe(1);
    expect(s.readyForUpdate).toBe(1);
  });

  it("2. refus de --execute seul", async () => {
    await expect(run(["--execute"])).rejects.toThrow(/both_flags_required/);
  });

  it("3. refus de --confirm-birth-date-update seul", async () => {
    await expect(run(["--confirm-birth-date-update"])).rejects.toThrow(/both_flags_required/);
  });

  it("4. validation des deux options", async () => {
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(loggedData).toHaveLength(1);
    const s = JSON.parse(loggedData[0]);
    expect(s.mode).toBe("execute");
    expect(s.completed).toBe(true);
    expect(s.updatesApplied).toBe(1);
  });

  it("5. refus sans administrateur", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update"]),
    ).rejects.toThrow(/admin_email_required/);
  });

  it("6. refus d'un administrateur inconnu", async () => {
    mockAdminResponse = [];
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=unknown@example.com"]),
    ).rejects.toThrow(/admin_not_found/);
  });

  it("7. refus d'un rôle insuffisant", async () => {
    mockAdminResponse = [{ id: "admin-1", email: "admin@example.com", active: true, role: "viewer" }];
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]),
    ).rejects.toThrow(/admin_unauthorized_role/);
  });

  it("7b. refus d'un administrateur désactivé", async () => {
    mockAdminResponse = [{ id: "admin-1", email: "admin@example.com", active: false, role: "admin" }];
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]),
    ).rejects.toThrow(/admin_inactive/);
  });

  it("7c. refus sans DATABASE_URL", async () => {
    delete process.env.DATABASE_URL;
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]),
    ).rejects.toThrow(/database_url_missing/);
  });

  it("7d. refus si le mapping privé manque", async () => {
    await expect(
      runUpdate(
        ["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"],
        makeFs({ "birth-date-review.csv": BASE_REVIEW_CSV }),
      ),
    ).rejects.toThrow(/mapping_file_missing/);
  });

  it("7e. refuse un review_id dupliqué dans le mapping", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review-map.csv": `${BASE_MAP_CSV}\nFT-DOB-0001,cand-2,reg-2,3,other`,
      }),
    ).rejects.toThrow(/mapping_file_invalid/);
  });

  it("8. review_id inconnu dans la map", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review-map.csv": `review_id,candidate_id,registration_id,source_row,source_fingerprint
FT-DOB-0002,cand-1,reg-1,2,abcde12345`,
      }),
    ).rejects.toThrow(/mapping_file_invalid|refused_file_has_errors/);
  });

  it("9. review_id dupliqué", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": BASE_REVIEW_CSV + "\nFT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,candidate_confirmation,verified,",
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("10. deux lignes ciblant le même candidat", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,candidate_confirmation,verified,
FT-DOB-0002,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,candidate_confirmation,verified,`,
        "birth-date-review-map.csv": `review_id,candidate_id,registration_id,source_row,source_fingerprint
FT-DOB-0001,cand-1,reg-1,2,abcde12345
FT-DOB-0002,cand-1,reg-1,2,abcde12345`,
      }),
    ).rejects.toThrow(/mapping_file_invalid/);
  });

  it("11. statut non verified : exécution refusée", async () => {
    await expect(run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
      "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,candidate_confirmation,pending,`,
    })).rejects.toThrow(/refused_file_has_errors/);
  });

  it("12. méthode absente", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,,verified,`,
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("13. date invalide (30 février)", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-02-30,candidate_confirmation,verified,`,
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("14. date future", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2035-05-12,candidate_confirmation,verified,`,
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("15. candidat hors limite d'âge (1900)", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,1900-01-01,candidate_confirmation,verified,`,
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("16. date absente en base → UPDATE appelé", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(mockTx.update).toHaveBeenCalled();
    const s = JSON.parse(loggedData[0]);
    expect(s.updatesApplied).toBe(1);
  });

  it("17. même date déjà présente → aucun UPDATE", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: "2009-05-12" }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(mockTx.update).not.toHaveBeenCalled();
    const s = JSON.parse(loggedData[0]);
    expect(s.updatesApplied).toBe(0);
    expect(s.alreadyUpToDate).toBe(1);
  });

  it("18. date différente présente → conflit", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: "2005-04-17" }];
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]),
    ).rejects.toThrow(/date_of_birth_conflict/);
  });

  it("19. rollback si une mise à jour échoue", async () => {
    mockTx.update.mockImplementationOnce(() => {
      throw new Error("DB Error on Update");
    });
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]),
    ).rejects.toThrow(/DB Error on Update/);
    expect(mockTx.insert).not.toHaveBeenCalled();
  });

  it("20. audit créé après mise à jour", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(mockTx.insert).toHaveBeenCalled();
  });

  it("21. audit sans date de naissance en clair", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];
    let insertedValues: unknown = null;
    mockTx.insert.mockImplementationOnce(() => {
      return {
        values: (vals: unknown) => {
          insertedValues = vals;
          return chainResolving([]);
        },
      };
    });
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(insertedValues).toBeDefined();
    // La date de naissance ne doit pas apparaître dans les métadonnées d'audit.
    expect(JSON.stringify(insertedValues)).not.toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("22. absence de données personnelles dans la sortie console", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    const out = JSON.stringify(loggedData);
    expect(out).not.toContain("Diop");
    expect(out).not.toContain("awa@");
    expect(out).not.toContain("771234567");
    // La date de naissance ne doit pas apparaître dans le résumé.
    expect(out).not.toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("23. idempotence : seconde exécution sans UPDATE", async () => {
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: "2009-05-12" }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"]);
    expect(mockTx.update).not.toHaveBeenCalled();
    const s = JSON.parse(loggedData[0]);
    expect(s.updatesApplied).toBe(0);
    expect(s.alreadyUpToDate).toBe(1);
  });

  it("24. aucune écriture en dry-run", async () => {
    await run([]);
    expect(mockTx.update).not.toHaveBeenCalled();
    expect(mockTx.insert).not.toHaveBeenCalled();
  });

  it("25. méthode de vérification invalide (valeur non reconnue)", async () => {
    await expect(
      run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
        "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,17,2009-05-12,some_bogus_method,verified,`,
      }),
    ).rejects.toThrow(/refused_file_has_errors/);
  });

  it("26. historique d'âge incohérent mais non bloquant → mise à jour appliquée quand même", async () => {
    // 2009-05-12 → 17 ans au 2027-01-01 (référence édition). historical_age=18 : incohérent,
    // mais ce signal n'est pas dans BLOCKING_REASONS et ne doit pas empêcher l'écriture.
    mockCandidateResponse = [{ id: "cand-1", legacySourceId: "legacy-1", dateOfBirth: null }];
    await run(["--execute", "--confirm-birth-date-update", "--admin-email=admin@example.com"], {
      "birth-date-review.csv": `review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,18,2009-05-12,candidate_confirmation,verified,`,
    });
    expect(mockTx.update).toHaveBeenCalled();
    const s = JSON.parse(loggedData[0]);
    expect(s.updatesApplied).toBe(1);
  });
});
