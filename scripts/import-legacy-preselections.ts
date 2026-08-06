// Import des inscriptions HISTORIQUES (Supabase legacy) SANS messagerie.
// Préserve les données telles quelles : date_of_birth = NULL (jamais fabriquée
// depuis l'âge), consentements non présumés (granted=false), message de
// confirmation marqué `suppressed` (jamais envoyé, jamais mis en file), âge
// historique conservé uniquement en métadonnée d'audit. Idempotent, transaction.
//
//   DATABASE_URL=... tsx scripts/import-legacy-preselections.ts \
//     --file="C:/FestivalTalentData/exports-private/supabase-preselections-full-2026-07-22_04-46.csv"
//
// Dry-run par défaut. Écriture réelle : --execute --confirm-legacy-import.
// N'affiche jamais d'identité, de téléphone, d'e-mail ni de date de naissance.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";

import { getDb } from "@/src/db/connection";
import {
  auditLogs, candidateConsents, candidates, disciplines, editions, messageLogs, preselectionRegistrations,
} from "@/src/db/schema";
import { parseCsv } from "@/src/import/preselections";
import { normalizeSenegalPhone } from "@/src/services/messaging/phone";

const SOURCE = "supabase_legacy";
const EXPECTED_SHA = "d8a012b8cad21d55aea44df203602acff13995f1256fcce9776734e7b7be4a39";
const TEMPLATE_VERSION = "preselection-confirmation-v1";
const CONSENT_VERSION = "historical-import-no-consent";
const SUPPRESSION_REASON = "historical_import_no_consent";

function arg(name: string, fallback = ""): string {
  const match = process.argv.find((v) => v.startsWith(`--${name}=`) || v === `--${name}`);
  if (!match) return fallback;
  if (match.includes("=")) return match.slice(match.indexOf("=") + 1);
  return process.argv[process.argv.indexOf(match) + 1] ?? fallback;
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function main() {
  const file = arg("file");
  if (!file) throw new Error("missing_file");
  const buffer = readFileSync(file);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const expectedSha = arg("expected-sha", EXPECTED_SHA);
  if (expectedSha && sha256 !== expectedSha) throw new Error("source_sha_mismatch");

  const rows = parseCsv(buffer.toString("utf8"));
  const execute = process.argv.includes("--execute");
  if (execute && !process.argv.includes("--confirm-legacy-import")) {
    throw new Error("execute_requires_confirm_flag");
  }

  const prepared = rows.map((row) => {
    const phone = normalizeSenegalPhone(row.phone);
    const created = new Date(row.created_at);
    return {
      legacyId: (row.id ?? "").trim(),
      fullName: (row.full_name ?? "").trim(),
      phoneRaw: (row.phone ?? "").trim(),
      phoneNormalized: phone.normalized,
      phoneValid: phone.valid,
      email: (row.email ?? "").trim() || null,
      city: (row.city ?? "").trim() || null,
      discipline: (row.discipline ?? "").trim(),
      historicalAge: (row.age ?? "").trim() || null,
      createdAt: Number.isNaN(created.getTime()) ? new Date() : created,
    };
  });

  const report = {
    mode: execute ? "execute" : "dry-run",
    source: SOURCE,
    sha256,
    total: prepared.length,
    distinctLegacyIds: new Set(prepared.map((p) => p.legacyId)).size,
    phoneValid: prepared.filter((p) => p.phoneValid).length,
    phoneInvalid: prepared.filter((p) => !p.phoneValid).length,
    dateOfBirthNull: prepared.length,
  };

  if (!execute) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const db = getDb();
  try {
    await db.transaction(async (tx) => {
    let insertedCandidates = 0, existingCandidates = 0, insertedRegistrations = 0,
      existingRegistrations = 0, insertedConsents = 0, suppressedMessages = 0, audits = 0;

    const [edition] = await tx.insert(editions)
      .values({ name: "Festival Talent 2027", year: 2027, status: "active" })
      .onConflictDoUpdate({ target: editions.year, set: { updatedAt: new Date() } })
      .returning({ id: editions.id });

    for (const p of prepared) {
      const [discipline] = await tx.insert(disciplines)
        .values({ slug: slugify(p.discipline) || "autre", name: p.discipline || "Autre" })
        .onConflictDoUpdate({ target: disciplines.slug, set: { name: p.discipline || "Autre" } })
        .returning({ id: disciplines.id });

      // Candidat — date_of_birth NULL, aucun âge persisté, idempotent par legacy id.
      let [candidate] = await tx.insert(candidates).values({
        fullName: p.fullName, phoneRaw: p.phoneRaw, phoneNormalized: p.phoneNormalized,
        phoneValid: p.phoneValid, email: p.email, dateOfBirth: null, city: p.city,
        countryCode: "SN", source: SOURCE, legacySourceId: p.legacyId,
        createdAt: p.createdAt, updatedAt: p.createdAt,
      }).onConflictDoNothing({ target: candidates.legacySourceId }).returning({ id: candidates.id });

      const newCandidate = Boolean(candidate);
      if (newCandidate) insertedCandidates += 1;
      else {
        existingCandidates += 1;
        [candidate] = await tx.select({ id: candidates.id }).from(candidates)
          .where(eq(candidates.legacySourceId, p.legacyId)).limit(1);
      }
      if (!candidate) continue;

      const [registration] = await tx.insert(preselectionRegistrations).values({
        candidateId: candidate.id, editionId: edition.id, disciplineId: discipline.id,
        category: p.discipline, auditionCity: p.city, status: "pending",
        submittedAt: p.createdAt, source: SOURCE, legacySourceId: p.legacyId,
        legacyPayload: {
          legacy_source_id: p.legacyId, historical_age: p.historicalAge,
          review: "legacy_review_required",
          note: "imported without date_of_birth; requires human birth-date review",
        },
        createdAt: p.createdAt, updatedAt: p.createdAt,
      }).onConflictDoNothing({ target: preselectionRegistrations.legacySourceId })
        .returning({ id: preselectionRegistrations.id });

      let registrationId: string | undefined = registration?.id;
      if (registration) insertedRegistrations += 1;
      else {
        existingRegistrations += 1;
        const [existing] = await tx.select({ id: preselectionRegistrations.id })
          .from(preselectionRegistrations)
          .where(eq(preselectionRegistrations.legacySourceId, p.legacyId)).limit(1);
        registrationId = existing?.id;
      }

      // Consentements NON présumés (false). Uniquement à la première insertion
      // du candidat pour rester idempotent (pas de contrainte d'unicité dédiée).
      if (newCandidate) {
        for (const consentType of ["transactional_registration_confirmation", "operational_preselection_updates", "marketing"] as const) {
          await tx.insert(candidateConsents).values({
            candidateId: candidate.id, consentType, granted: false,
            consentTextVersion: CONSENT_VERSION, grantedAt: null,
          });
          insertedConsents += 1;
        }
      }

      // Message de confirmation `suppressed` — jamais envoyé, jamais mis en file
      // (le dispatcher ne traite que `pending`). Idempotent via idempotency_key.
      const [message] = await tx.insert(messageLogs).values({
        candidateId: candidate.id, registrationId: registrationId ?? null,
        channel: "sms", provider: "suppressed", messageType: "preselection_confirmation",
        templateVersion: TEMPLATE_VERSION, recipientNormalized: p.phoneNormalized,
        idempotencyKey: `legacy:${p.legacyId}:preselection_confirmation`,
        status: "suppressed", attemptCount: 0, failureCategory: SUPPRESSION_REASON,
        createdAt: p.createdAt, updatedAt: p.createdAt,
      }).onConflictDoNothing({ target: messageLogs.idempotencyKey })
        .returning({ id: messageLogs.id });
      if (message) suppressedMessages += 1;

      if (newCandidate) {
        await tx.insert(auditLogs).values({
          action: "candidate_legacy_imported", entityType: "candidate", entityId: candidate.id,
          metadata: {
            legacy_source_id: p.legacyId, source: SOURCE, historical_age: p.historicalAge,
            date_of_birth: null, review: "legacy_review_required",
          },
        });
        audits += 1;
      }
    }

    console.log(JSON.stringify({
      ...report, insertedCandidates, existingCandidates, insertedRegistrations,
      existingRegistrations, insertedConsents, suppressedMessages, audits, completed: true,
    }, null, 2));
    });
  } finally {
    await (db as unknown as { $client: { end: (opts?: { timeout?: number }) => Promise<void> } }).$client.end({ timeout: 5 });
  }
}

Promise.resolve().then(main).catch(() => {
  // Sortie générique : aucun secret, aucune donnée personnelle.
  console.error("legacy_import_failed");
  process.exitCode = 1;
});
