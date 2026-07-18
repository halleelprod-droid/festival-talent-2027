import {
  PRESELECTION_CONFIRMATION_TEMPLATE_VERSION,
  PRESELECTION_CONFIRMATION_TYPE,
  createConfirmationIdempotencyKey,
} from "./constants";

export function buildConfirmationQueueRecord(input: {
  candidateId: string;
  registrationId: string;
  recipientNormalized: string | null;
  phoneValid: boolean;
  transactionalConsentGranted: boolean;
}) {
  const suppressedReason = !input.phoneValid || !input.recipientNormalized
    ? "invalid_phone"
    : !input.transactionalConsentGranted
      ? "transactional_consent_missing"
      : null;

  return {
    candidateId: input.candidateId,
    registrationId: input.registrationId,
    channel: "sms" as const,
    provider: "twilio",
    messageType: PRESELECTION_CONFIRMATION_TYPE,
    templateVersion: PRESELECTION_CONFIRMATION_TEMPLATE_VERSION,
    recipientNormalized: input.recipientNormalized,
    idempotencyKey: createConfirmationIdempotencyKey(input.registrationId),
    status: suppressedReason ? "suppressed" as const : "pending" as const,
    failureCode: suppressedReason,
    failureCategory: suppressedReason ? "permanent" : null,
  };
}
