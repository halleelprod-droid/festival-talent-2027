import { createHmac, timingSafeEqual } from "node:crypto";

export type CallbackMessageStatus = "accepted" | "sent" | "delivered" | "failed" | "undelivered";
export type StoredMessageStatus =
  | "queued" | "pending" | "processing" | "accepted" | "sent" | "delivered"
  | "retry_scheduled" | "failed" | "undelivered" | "suppressed" | "cancelled";

export function computeTwilioSignature(authToken: string, url: string, params: URLSearchParams): string {
  const suffix = Array.from(params.entries())
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => leftKey.localeCompare(rightKey) || leftValue.localeCompare(rightValue))
    .map(([key, value]) => `${key}${value}`)
    .join("");
  return createHmac("sha1", authToken).update(`${url}${suffix}`).digest("base64");
}

export function validateTwilioSignature(input: {
  authToken: string;
  signature: string | null;
  url: string;
  params: URLSearchParams;
}): boolean {
  if (!input.signature) return false;
  const expected = Buffer.from(computeTwilioSignature(input.authToken, input.url, input.params));
  const actual = Buffer.from(input.signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function normalizeTwilioStatus(value: string | null): CallbackMessageStatus | null {
  if (value === "accepted" || value === "queued" || value === "sending") return "accepted";
  if (value === "sent" || value === "delivered" || value === "failed" || value === "undelivered") return value;
  return null;
}

const STATUS_RANK: Record<CallbackMessageStatus, number> = {
  accepted: 1,
  sent: 2,
  failed: 3,
  undelivered: 3,
  delivered: 4,
};

export function resolveCallbackTransition(
  current: StoredMessageStatus,
  incoming: CallbackMessageStatus,
): CallbackMessageStatus | null {
  if (current === "delivered" || current === "suppressed" || current === "cancelled") return null;
  if (current === incoming) return null;
  const currentRank = current in STATUS_RANK ? STATUS_RANK[current as CallbackMessageStatus] : 0;
  if (STATUS_RANK[incoming] <= currentRank) return null;
  return incoming;
}
