import { and, eq, inArray } from "drizzle-orm";

import { getDb } from "@/src/db/connection";
import { auditLogs, candidates, messageLogs } from "@/src/db/schema";
import type { MessagingProvider } from "./provider";
import { TwilioProvider } from "./twilio";
import { buildPreselectionConfirmation } from "./confirmation-message";

export async function processConfirmation(messageId: string, provider: MessagingProvider = new TwilioProvider()) {
  const db = getDb();
  const [claimed] = await db.update(messageLogs)
    .set({ status: "processing", attempts: 1 })
    .where(and(eq(messageLogs.id, messageId), eq(messageLogs.status, "queued")))
    .returning({ id: messageLogs.id, candidateId: messageLogs.candidateId, registrationId: messageLogs.registrationId });
  if (!claimed) return { status: "skipped" as const };

  if (claimed.registrationId) {
    const [successful] = await db.select({ id: messageLogs.id }).from(messageLogs).where(and(
      eq(messageLogs.registrationId, claimed.registrationId),
      eq(messageLogs.channel, "sms"),
      eq(messageLogs.messageType, "preselection_confirmation"),
      inArray(messageLogs.status, ["sent", "delivered"]),
    )).limit(1);
    if (successful) {
      await db.update(messageLogs).set({ status: "cancelled", errorCode: "already_sent" }).where(eq(messageLogs.id, claimed.id));
      return { status: "skipped" as const };
    }
  }

  const [candidate] = await db.select({ name: candidates.fullName, phone: candidates.phoneNormalized, valid: candidates.phoneValid })
    .from(candidates).where(eq(candidates.id, claimed.candidateId)).limit(1);
  if (!candidate?.valid || !candidate.phone) {
    await db.update(messageLogs).set({ status: "failed", errorCode: "invalid_phone", failedAt: new Date() }).where(eq(messageLogs.id, claimed.id));
    return { status: "failed" as const };
  }

  try {
    const result = await provider.send({ channel: "sms", to: candidate.phone, body: buildPreselectionConfirmation(candidate.name) });
    await db.update(messageLogs).set({ status: "sent", provider: result.provider, providerMessageId: result.messageId, sentAt: new Date() }).where(eq(messageLogs.id, claimed.id));
    await db.insert(auditLogs).values({ action: "message.sent", entityType: "message_log", entityId: claimed.id, metadata: { channel: "sms", provider: result.provider } });
    return { status: "sent" as const };
  } catch (error) {
    const code = error instanceof Error ? error.message.slice(0, 100) : "provider_error";
    await db.update(messageLogs).set({ status: "failed", errorCode: code, errorMessage: "Provider request failed", failedAt: new Date() }).where(eq(messageLogs.id, claimed.id));
    await db.insert(auditLogs).values({ action: "message.failed", entityType: "message_log", entityId: claimed.id, metadata: { channel: "sms", errorCode: code } });
    return { status: "failed" as const };
  }
}
