export const PRESELECTION_CONFIRMATION_TYPE = "preselection_confirmation";
export const PRESELECTION_CONFIRMATION_TEMPLATE_VERSION = "preselection-confirmation-v1";
export const MAX_DISPATCH_BATCH_SIZE = 50;

export function createConfirmationIdempotencyKey(
  registrationId: string,
  channel: "sms" = "sms",
  templateVersion: string = PRESELECTION_CONFIRMATION_TEMPLATE_VERSION,
): string {
  return `preselection_confirmation:${registrationId}:${channel}:${templateVersion}`;
}
