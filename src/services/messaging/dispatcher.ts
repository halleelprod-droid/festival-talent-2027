import { buildPreselectionConfirmation } from "./confirmation-message";
import type { MessagingFailure, MessagingProvider, ProviderResult } from "./provider";
import { getRetryDecision, normalizeProviderFailure } from "./retry-policy";

export type ConfirmationJob = {
  id: string;
  registrationId: string;
  recipientNormalized: string | null;
  candidateName: string;
  discipline: string | null;
  attemptCount: number;
};

export interface MessageQueueRepository {
  claimBatch(limit: number, now: Date): Promise<ConfirmationJob[]>;
  markAccepted(job: ConfirmationJob, result: ProviderResult, now: Date): Promise<void>;
  markSent(job: ConfirmationJob, result: ProviderResult, now: Date): Promise<void>;
  markDelivered(job: ConfirmationJob, result: ProviderResult, now: Date): Promise<void>;
  markRetry(job: ConfirmationJob, failure: MessagingFailure, nextAttemptAt: Date, now: Date): Promise<void>;
  markFailed(job: ConfirmationJob, failure: MessagingFailure, now: Date): Promise<void>;
  markSuppressed(job: ConfirmationJob, code: string, now: Date): Promise<void>;
}

export type DispatchSummary = {
  claimed: number;
  accepted: number;
  sent: number;
  delivered: number;
  retryScheduled: number;
  failed: number;
  suppressed: number;
};

function registrationReference(registrationId: string): string {
  return `FT27-${registrationId.replaceAll("-", "").slice(0, 10).toUpperCase()}`;
}

async function persistProviderSuccess(
  repository: MessageQueueRepository,
  job: ConfirmationJob,
  result: ProviderResult,
  now: Date,
): Promise<"accepted" | "sent" | "delivered"> {
  if (result.status === "delivered") {
    await repository.markDelivered(job, result, now);
    return "delivered";
  }
  if (result.status === "sent") {
    await repository.markSent(job, result, now);
    return "sent";
  }
  await repository.markAccepted(job, result, now);
  return "accepted";
}

export async function dispatchPendingConfirmations(input: {
  limit: number;
  now: Date;
  provider: MessagingProvider;
  repository: MessageQueueRepository;
  statusCallbackUrl?: string;
}): Promise<DispatchSummary> {
  const limit = Math.max(1, Math.min(50, Math.trunc(input.limit)));
  const jobs = await input.repository.claimBatch(limit, input.now);
  const summary: DispatchSummary = {
    claimed: jobs.length,
    accepted: 0,
    sent: 0,
    delivered: 0,
    retryScheduled: 0,
    failed: 0,
    suppressed: 0,
  };

  for (const job of jobs) {
    if (!job.recipientNormalized) {
      await input.repository.markSuppressed(job, "invalid_phone", input.now);
      summary.suppressed += 1;
      continue;
    }

    try {
      const result = await input.provider.sendMessage({
        channel: "sms",
        to: job.recipientNormalized,
        body: buildPreselectionConfirmation({
          fullName: job.candidateName,
          discipline: job.discipline,
          registrationReference: registrationReference(job.registrationId),
        }),
        statusCallbackUrl: input.statusCallbackUrl,
      });
      const status = await persistProviderSuccess(input.repository, job, result, input.now);
      summary[status] += 1;
    } catch (error) {
      const failure = normalizeProviderFailure(error);
      if (failure.category === "unsubscribed") {
        await input.repository.markSuppressed(job, failure.code, input.now);
        summary.suppressed += 1;
        continue;
      }
      const retry = getRetryDecision({ attemptCount: job.attemptCount, failure, now: input.now });
      if (retry.retry) {
        await input.repository.markRetry(job, failure, retry.nextAttemptAt, input.now);
        summary.retryScheduled += 1;
      } else {
        await input.repository.markFailed(job, failure, input.now);
        summary.failed += 1;
      }
    }
  }

  return summary;
}
