// Applique (ou simule) la mise à jour des dates de naissance vérifiées.
//
// DRY-RUN PAR DÉFAUT. Aucune écriture sans les DEUX options explicites :
//   --execute --confirm-birth-date-update --admin-email <compte admin existant>
//
// L'écriture est refusée si le fichier contient une erreur, un review_id inconnu,
// un doublon, une date invalide, un statut non « verified », une méthode manquante,
// ou un conflit avec une date déjà présente. La mise à jour est idempotente et
// n'écrit jamais la date de naissance en clair dans le journal d'audit.
//
// Cette commande d'écriture NE DOIT PAS être lancée pendant la mission de préparation.

import * as nodeFs from "node:fs";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/connection";
import { candidates, adminUsers, auditLogs } from "@/src/db/schema";
import { parseCsv } from "@/src/import/preselections";
import {
  REVIEW_COLUMNS,
  classifyUpdate,
  resolveExecutionMode,
  validateReviewRows,
  validateReviewMapRows,
  buildBirthDateAuditEntry,
} from "@/src/lib/birth-date-review";

// Interface minimale pour l'injection de dépendance FS (testabilité).
export interface FileSystemReader {
  readFileSync(path: string, encoding: BufferEncoding): string;
  existsSync(path: string): boolean;
}

function arg(name: string, fallback: string, argv: string[]): string {
  const match = argv.find((value) => value.startsWith(`--${name}=`) || value === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  const index = argv.indexOf(match);
  return argv[index + 1] ?? fallback;
}

export async function runUpdate(argv: string[], fileSystem: FileSystemReader = nodeFs) {
  const mode = resolveExecutionMode(argv); // lève une erreur si une seule option est fournie
  const input = arg("input", "birth-date-review.csv", argv);
  const mapFile = arg("map", "birth-date-review-map.csv", argv);
  const adminEmail = arg("admin-email", "", argv);
  const source = arg("source", "", argv);

  const rows = parseCsv(fileSystem.readFileSync(input, "utf8"));
  const missingColumns = REVIEW_COLUMNS.filter((column) => rows.length && !(column in rows[0]));
  if (missingColumns.length) throw new Error(`missing_columns:${missingColumns.join(",")}`);

  const mapExists = fileSystem.existsSync(mapFile);
  const mapValidation = mapExists
    ? validateReviewMapRows(parseCsv(fileSystem.readFileSync(mapFile, "utf8")), rows)
    : null;
  const knownIds = mapValidation?.knownIds;
  const { results, counters } = validateReviewRows(rows, { knownIds });
  const blocking = results.filter((result) => !result.ready);

  if (!mapExists || !mapValidation) throw new Error("mapping_file_missing");
  if (mapValidation.errors.length) throw new Error(`mapping_file_invalid:${mapValidation.errors.length}`);

  if (mode === "execute") {
    if (!process.env.DATABASE_URL) throw new Error("database_url_missing");
    if (!adminEmail) throw new Error("admin_email_required: --admin-email <compte admin existant>");
    if (blocking.length) throw new Error(`refused_file_has_errors:${blocking.length}`);
    const mapByReviewId = mapValidation.mapByReviewId;

    let sourceRows: Record<string, string>[] = [];
    if (source && fileSystem.existsSync(source)) {
      sourceRows = parseCsv(fileSystem.readFileSync(source, "utf8"));
    }

    const db = getDb();
    let updatesApplied = 0;
    let alreadyUpToDateCount = 0;

    await db.transaction(async (tx) => {
      // Re-verify admin inside transaction for safety
      const txAdmin = await tx.select().from(adminUsers).where(eq(adminUsers.email, adminEmail)).limit(1).then(r => r[0]);
      if (!txAdmin) throw new Error("admin_not_found");
      if (txAdmin.active === false) throw new Error("admin_inactive");
      if (txAdmin.role !== "super_admin" && txAdmin.role !== "admin") throw new Error("admin_unauthorized_role");

      for (const row of rows) {
        const rid = (row.review_id ?? "").trim();
        const rowResult = results.find(r => r.reviewId === rid);
        if (!rowResult || !rowResult.ready) {
          continue;
        }

        const mapRow = mapByReviewId.get(rid);
        if (!mapRow) throw new Error(`unknown_review_id:${rid}`);

        const candidateId = (mapRow.candidate_id ?? "").trim();
        let legacyId = "";
        if (!candidateId) {
          const sourceRowIdx = Number(mapRow.source_row) - 2;
          if (sourceRows.length > 0 && sourceRowIdx >= 0 && sourceRowIdx < sourceRows.length) {
            legacyId = (sourceRows[sourceRowIdx].id ?? "").trim();
          }
        }

        if (!candidateId && !legacyId) {
          throw new Error(`candidate_link_missing:${rid}`);
        }

        let dbCandidate = null;
        if (candidateId) {
          dbCandidate = await tx.select().from(candidates).where(eq(candidates.id, candidateId)).limit(1).then(r => r[0]);
        } else if (legacyId) {
          dbCandidate = await tx.select().from(candidates).where(eq(candidates.legacySourceId, legacyId)).limit(1).then(r => r[0]);
        }

        if (!dbCandidate) {
          throw new Error(`candidate_not_found:${rid}`);
        }

        const currentDob = dbCandidate.dateOfBirth;
        const newDob = (row.date_of_birth ?? "").trim();

        const classification = classifyUpdate(currentDob, newDob);
        if (classification === "conflict") {
          throw new Error(`date_of_birth_conflict:${rid}`);
        } else if (classification === "already_up_to_date") {
          alreadyUpToDateCount += 1;
        } else if (classification === "would_update") {
          await tx.update(candidates).set({ dateOfBirth: newDob, updatedAt: new Date() }).where(eq(candidates.id, dbCandidate.id));

          const auditEntry = buildBirthDateAuditEntry({
            candidateId: dbCandidate.id,
            reviewId: rid,
            verificationMethod: (row.verification_method ?? "").trim(),
            source: "birth-date-review",
            adminUserId: txAdmin.id,
          });

          await tx.insert(auditLogs).values({
            adminUserId: txAdmin.id,
            action: auditEntry.action,
            entityType: auditEntry.entityType,
            entityId: auditEntry.entityId,
            metadata: auditEntry.metadata,
          });
          updatesApplied += 1;
        }
      }
    });

    console.log(JSON.stringify({
      mode,
      completed: true,
      updatesApplied,
      alreadyUpToDate: alreadyUpToDateCount,
    }, null, 2));
    return;
  }

  // DRY-RUN : rapport anonymisé, aucune écriture.
  console.log(JSON.stringify({
    mode,
    total: counters.total,
    readyForUpdate: counters.ready,
    blocked: counters.blocked,
    conflictsDetectable: 0,
    dbClassification: "skipped_no_db",
    note: "Ajouter --execute --confirm-birth-date-update --admin-email pour appliquer (phase production).",
  }, null, 2));
}

async function main() {
  await runUpdate(process.argv.slice(2));
}

if (process.argv[1] && (process.argv[1].endsWith("update-candidate-birth-dates.ts") || process.argv[1].endsWith("update-candidate-birth-dates"))) {
  main().catch((error) => {
    const message = error instanceof Error ? error.message : "";
    const safePrefixes = [
      "both_flags_required", "database_url_missing", "admin_email_required", "mapping_file_missing",
      "mapping_file_invalid", "refused_file_has_errors", "admin_not_found", "admin_inactive",
      "admin_unauthorized_role", "unknown_review_id", "candidate_link_missing", "candidate_not_found",
      "date_of_birth_conflict", "missing_columns",
    ];
    const safeCode = safePrefixes.find((prefix) => message.startsWith(prefix)) ?? "birth_date_update_failed";
    console.error(safeCode);
    process.exitCode = 1;
  });
}
