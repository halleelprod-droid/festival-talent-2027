import { after, NextResponse } from "next/server";
import { and, count, eq, gt } from "drizzle-orm";
import { Resend } from "resend";

import { getDb } from "@/src/db";
import { internationalInterestSubmissions, rateLimitEvents } from "@/src/db/schema";
import { hashSensitiveValue } from "@/src/lib/security";
import { internationalInterestSchema } from "@/src/validation/international-interest";

const MAX_BODY_BYTES = 24_000;
const MIN_FORM_TIME_MS = 1_500;
const RATE_LIMIT = 5;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 400 });
  const raw = await request.json().catch(() => null);
  const parsed = internationalInterestSchema.safeParse(raw);
  if (!parsed.success || parsed.data.website || (parsed.data.form_started_at && Date.now() - parsed.data.form_started_at < MIN_FORM_TIME_MS)) {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashSensitiveValue(forwarded);
  const data = parsed.data;

  try {
    const result = await getDb().transaction(async (tx) => {
      const since = new Date(Date.now() - 15 * 60 * 1000);
      const [attempts] = await tx.select({ value: count() }).from(rateLimitEvents).where(and(
        eq(rateLimitEvents.scope, "international-interest"),
        eq(rateLimitEvents.keyHash, ipHash),
        gt(rateLimitEvents.createdAt, since),
      ));
      if ((attempts?.value ?? 0) >= RATE_LIMIT) return { state: "rate_limited" as const };
      await tx.insert(rateLimitEvents).values({ scope: "international-interest", keyHash: ipHash });

      const [recent] = await tx.select({ id: internationalInterestSubmissions.id }).from(internationalInterestSubmissions).where(and(
        eq(internationalInterestSubmissions.email, data.email.toLowerCase()),
        eq(internationalInterestSubmissions.subject, data.subject),
        gt(internationalInterestSubmissions.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)),
      )).limit(1);
      if (recent) return { state: "duplicate" as const };

      const [submission] = await tx.insert(internationalInterestSubmissions).values({
        fullName: data.full_name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        organization: data.organization || null,
        roleTitle: data.role_title || null,
        country: data.country || null,
        city: data.city || null,
        category: data.category,
        destination: data.destination,
        subject: data.subject,
        message: data.message,
        contributionTypes: data.contribution_types,
        preferredPeriod: data.preferred_period || null,
        websiteUrl: data.website_url || null,
        linkedinUrl: data.linkedin_url || null,
        instagramUrl: data.instagram_url || null,
        portfolioUrl: data.portfolio_url || null,
        preferredContactMethod: data.preferred_contact_method || null,
        consentGiven: data.consent_given,
        nonContractualAcknowledged: data.non_contractual_acknowledged,
        sourcePage: data.source_page,
        ipHash,
        userAgent: request.headers.get("user-agent")?.slice(0, 500) || null,
      }).returning({ id: internationalInterestSubmissions.id });
      return { state: "created" as const, id: submission.id };
    });

    if (result.state === "rate_limited") return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    if (result.state === "duplicate") return NextResponse.json({ ok: false, error: "duplicate_recent_submission" }, { status: 409 });

    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (resendApiKey && notificationEmail) {
      after(async () => {
        try {
          const resend = new Resend(resendApiKey);
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Festival Talent <onboarding@resend.dev>",
            to: notificationEmail,
            subject: `Nouvelle manifestation d’intérêt internationale — ${data.destination}`,
            text: `Nouvelle proposition\n\nNom : ${data.full_name}\nOrganisation : ${data.organization || "Non précisée"}\nCatégorie : ${data.category}\nDestination : ${data.destination}\nObjet : ${data.subject}\n\n${data.message}\n\nIdentifiant : ${result.id}`,
          });
        } catch {
          // L’échec de la notification ne remet pas en cause l’enregistrement.
        }
      });
    }
    return NextResponse.json({ ok: true, submissionId: result.id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
