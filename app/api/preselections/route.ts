import { after, NextResponse } from "next/server";
import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/src/db";
import { candidateConsents, candidates, disciplines, editions, messageLogs, preselectionRegistrations, rateLimitEvents } from "@/src/db/schema";
import { hashSensitiveValue } from "@/src/lib/security";
import { isCandidateAgeEligible } from "@/src/lib/candidate-date-of-birth";
import { processConfirmation } from "@/src/services/messaging/confirmation";
import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
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
      if (existing) return "accepted" as const;

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
        { candidateId: candidate.id, consentType: "marketing_sms", granted: parsed.data.message_consent, consentTextVersion: "2027-01", ipHash, userAgent, grantedAt: parsed.data.message_consent ? new Date() : null },
      ]);
      if (phone.valid) {
        const [message] = await tx.insert(messageLogs).values({ candidateId: candidate.id, registrationId: registration.id, channel: "sms", provider: "twilio", messageType: "preselection_confirmation" }).returning({ id: messageLogs.id });
        queuedMessageId = message.id;
      }
      return "accepted" as const;
    });
    if (result === "rate_limited") return NextResponse.json({ ok: false }, { status: 429 });
    if (queuedMessageId && process.env.MESSAGING_ENABLED === "true") {
      const id = queuedMessageId;
      after(async () => { await processConfirmation(id); });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
