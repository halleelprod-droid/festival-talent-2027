import "server-only";

import { dispatchPendingConfirmations } from "./dispatcher";
import { PostgresMessageQueueRepository } from "./postgres-queue";
import { createTwilioProviderFromEnv } from "./twilio";

export async function dispatchConfiguredConfirmations(limit: number, now: Date = new Date()) {
  const provider = createTwilioProviderFromEnv();
  if (!provider) return { status: "disabled" as const };
  const summary = await dispatchPendingConfirmations({
    limit,
    now,
    provider,
    repository: new PostgresMessageQueueRepository(),
    statusCallbackUrl: process.env.TWILIO_STATUS_CALLBACK_URL,
  });
  return { status: "completed" as const, summary };
}
