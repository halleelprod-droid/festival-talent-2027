import { MessagingProviderError, type MessagingFailure } from "./provider";

export const MAX_MESSAGE_ATTEMPTS = 4;
const RETRY_DELAYS_MS = [0, 5 * 60_000, 30 * 60_000, 2 * 60 * 60_000] as const;

export function normalizeProviderFailure(error: unknown): MessagingFailure {
  if (error instanceof MessagingProviderError) return error.failure;
  return { code: "provider_unavailable", category: "temporary", retryable: true };
}

export function getRetryDecision(input: {
  attemptCount: number;
  failure: MessagingFailure;
  now: Date;
}): { retry: true; nextAttemptAt: Date } | { retry: false } {
  if (!input.failure.retryable || input.attemptCount >= MAX_MESSAGE_ATTEMPTS) return { retry: false };
  const delay = RETRY_DELAYS_MS[input.attemptCount] ?? RETRY_DELAYS_MS.at(-1)!;
  return { retry: true, nextAttemptAt: new Date(input.now.getTime() + delay) };
}
