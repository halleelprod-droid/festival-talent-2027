import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getDb } from "@/src/db";
import { auditLogs, messageLogs } from "@/src/db/schema";
import {
  normalizeTwilioStatus,
  resolveCallbackTransition,
  validateTwilioSignature,
} from "@/src/services/messaging/twilio-webhook";

export async function POST(request: Request) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return NextResponse.json({ ok: false }, { status: 503 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/x-www-form-urlencoded")) {
    return NextResponse.json({ ok: false }, { status: 415 });
  }

  const params = new URLSearchParams(await request.text());
  const signatureIsValid = validateTwilioSignature({
    authToken,
    signature: request.headers.get("x-twilio-signature"),
    url: process.env.TWILIO_STATUS_CALLBACK_URL || request.url,
    params,
  });
  if (!signatureIsValid) return NextResponse.json({ ok: false }, { status: 401 });

  const providerMessageId = params.get("MessageSid");
  const incoming = normalizeTwilioStatus(params.get("MessageStatus"));
  if (!providerMessageId?.match(/^SM[a-zA-Z0-9]{32}$/) || !incoming) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = getDb();
  const [message] = await db.select({ id: messageLogs.id, status: messageLogs.status })
    .from(messageLogs).where(eq(messageLogs.providerMessageId, providerMessageId)).limit(1);
  if (!message) return NextResponse.json({ ok: true });
  const nextStatus = resolveCallbackTransition(message.status, incoming);
  if (!nextStatus) return NextResponse.json({ ok: true });

  const now = new Date();
  const safeErrorCode = params.get("ErrorCode")?.replace(/\D/g, "").slice(0, 20) || null;
  const storedStatus = safeErrorCode === "21610" ? "suppressed" as const : nextStatus;
  await db.transaction(async (tx) => {
    await tx.update(messageLogs).set({
      status: storedStatus,
      sentAt: nextStatus === "sent" ? now : undefined,
      deliveredAt: nextStatus === "delivered" ? now : undefined,
      failedAt: nextStatus === "failed" || nextStatus === "undelivered" ? now : undefined,
      failureCode: storedStatus === "suppressed" || nextStatus === "failed" || nextStatus === "undelivered" ? safeErrorCode ?? "provider_delivery_failure" : null,
      failureCategory: storedStatus === "suppressed" ? "unsubscribed" : nextStatus === "failed" || nextStatus === "undelivered" ? "permanent" : null,
      updatedAt: now,
    }).where(eq(messageLogs.id, message.id));
    await tx.insert(auditLogs).values({
      action: storedStatus === "suppressed" ? "preselection_confirmation_suppressed" : nextStatus === "delivered" ? "preselection_confirmation_delivered" : "preselection_confirmation_status_updated",
      entityType: "message_log",
      entityId: message.id,
      metadata: { status: storedStatus, provider: "twilio" },
    });
  });
  return NextResponse.json({ ok: true });
}
