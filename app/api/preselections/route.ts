import { after, NextResponse } from "next/server";
import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/src/db";
import { auditLogs, candidateConsents, candidates, disciplines, editions, messageLogs, preselectionRegistrations, rateLimitEvents } from "@/src/db/schema";
import { hashSensitiveValue } from "@/src/lib/security";
import { isCandidateAgeEligible } from "@/src/lib/candidate-date-of-birth";
import { dispatchConfiguredConfirmations } from "@/src/services/messaging/confirmation";
import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
import { buildConfirmationQueueRecord } from "@/src/services/messaging/queue";
import { preselectionInputSchema } from "@/src/validation/preselection";

const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function POST(request: Request) {
  const parsed = preselectionInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  // Le serveur ne fait jamais confiance à un âge envoyé par le client : il calcule
  // l'éligibilité à partir de la date de naissance, à la date de référence de l'édition.
  if (!isCandidateAgeEligible({ dateOfBirth: parsed.data.dateOfBirth })) {
    return NextResponse.json({ ok: false, error: "candidate_not_eligible" }, { status: 422 });
  }
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashSensitiveValue(forwarded);
  const phone = normalizeSenegalPhone(parsed.data.phone);
  let queuedMessageId: string | null = null;

  try {
    const result = await getDb().transaction(async (tx) => {
      const since = new Date(Date.now() - 15 * 60 * 1000);
      const [attempts] = await tx.select({ value: count() }).from(rateLimitEvents).where(and(eq(rateLimitEvents.scope, "public-preselection"), eq(rateLimitEvents.keyHash, ipHash), gt(rateLimitEvents.createdAt, since)));
      if ((attempts?.value ?? 0) >= 5) return "rate_limited" as const;
      await tx.insert(rateLimitEvents).values({ scope: "public-preselection", keyHash: ipHash });
      const [existing] = await tx.select({ id: preselectionRegistrations.id }).from(preselectionRegistrations)
        .where(eq(preselectionRegistrations.submissionKey, parsed.data.submission_key)).limit(1);
      if (existing) {
        const [existingMessage] = await tx.select({ status: messageLogs.status }).from(messageLogs)
          .where(eq(messageLogs.registrationId, existing.id)).limit(1);
        return {
          state: "accepted" as const,
          confirmationQueued: existingMessage?.status === "pending" || existingMessage?.status === "retry_scheduled",
        };
      }

      const [edition] = await tx.insert(editions).values({ name: "Festival Talent 2027", year: 2027, status: "active" })
        .onConflictDoUpdate({ target: editions.year, set: { name: "Festival Talent 2027", updatedAt: new Date() } }).returning({ id: editions.id });
      const disciplineSlug = slugify(parsed.data.discipline);
      const [discipline] = await tx.insert(disciplines).values({ slug: disciplineSlug, name: parsed.data.discipline })
        .onConflictDoUpdate({ target: disciplines.slug, set: { name: parsed.data.discipline, active: true } }).returning({ id: disciplines.id });
      const [candidate] = await tx.insert(candidates).values({
        fullName: parsed.data.full_name, phoneRaw: parsed.data.phone, phoneNormalized: phone.normalized,
        phoneValid: phone.valid, email: parsed.data.email ? parsed.data.email.toLowerCase() : null,
        dateOfBirth: parsed.data.dateOfBirth, city: parsed.data.city,
      }).returning({ id: candidates.id });
      const [registration] = await tx.insert(preselectionRegistrations).values({
        candidateId: candidate.id, editionId: edition.id, disciplineId: discipline.id,
        category: parsed.data.discipline, auditionCity: parsed.data.city, submissionKey: parsed.data.submission_key,
        legacyPayload: { experience: parsed.data.experience, portfolio_link: parsed.data.portfolio_link, message: parsed.data.message },
      }).returning({ id: preselectionRegistrations.id });
      const userAgent = request.headers.get("user-agent")?.slice(0, 500);
      await tx.insert(candidateConsents).values([
        { candidateId: candidate.id, consentType: "privacy_policy", granted: true, consentTextVersion: "2027-01", ipHash, userAgent, grantedAt: new Date() },
        { candidateId: candidate.id, consentType: "transactional_registration_confirmation", granted: true, consentTextVersion: "2027-01", ipHash, userAgent, grantedAt: new Date() },
        { candidateId: candidate.id, consentType: "marketing", granted: parsed.data.message_consent, consentTextVersion: "2027-01", ipHash, userAgent, grantedAt: parsed.data.message_consent ? new Date() : null },
      ]);
      const queueRecord = buildConfirmationQueueRecord({
        candidateId: candidate.id,
        registrationId: registration.id,
        recipientNormalized: phone.normalized,
        phoneValid: phone.valid,
        transactionalConsentGranted: true,
      });
      const [message] = await tx.insert(messageLogs).values(queueRecord)
        .onConflictDoNothing({ target: messageLogs.idempotencyKey })
        .returning({ id: messageLogs.id, status: messageLogs.status });
      if (message) {
        await tx.insert(auditLogs).values({
          action: message.status === "suppressed" ? "preselection_confirmation_suppressed" : "preselection_confirmation_queued",
          entityType: "message_log",
          entityId: message.id,
          metadata: { channel: "sms", messageType: queueRecord.messageType, templateVersion: queueRecord.templateVersion },
        });
      }
      if (message?.status === "pending") {
        queuedMessageId = message.id;
      }
      return { state: "accepted" as const, confirmationQueued: message?.status === "pending" };
    });
    if (result === "rate_limited") return NextResponse.json({ ok: false, success: false }, { status: 429 });
    if (queuedMessageId && process.env.MESSAGING_ENABLED === "true") {
      after(async () => { await dispatchConfiguredConfirmations(1).catch(() => undefined); });
    }
    return NextResponse.json({ ok: true, success: true, confirmationQueued: result.confirmationQueued }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
