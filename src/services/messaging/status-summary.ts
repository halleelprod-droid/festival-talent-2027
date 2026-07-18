export type MessageStatusCount = {
  status: "queued" | "pending" | "processing" | "accepted" | "sent" | "delivered"
    | "retry_scheduled" | "failed" | "undelivered" | "suppressed" | "cancelled";
  value: number;
};

export function summarizeConfirmationStatuses(messageStatuses: MessageStatusCount[]) {
  const countFor = (status: MessageStatusCount["status"]) =>
    messageStatuses.find((item) => item.status === status)?.value ?? 0;
  return {
    confirmationsPending: countFor("pending") + countFor("queued"),
    confirmationsProcessing: countFor("processing"),
    confirmationsAccepted: countFor("accepted"),
    confirmationsSent: countFor("sent"),
    confirmationsDelivered: countFor("delivered"),
    confirmationsFailed: countFor("failed") + countFor("undelivered"),
    confirmationsSuppressed: countFor("suppressed"),
    confirmationsRetryScheduled: countFor("retry_scheduled"),
  };
}
