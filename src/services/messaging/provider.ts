export type MessageInput = {
  channel: "sms" | "whatsapp" | "email";
  to: string;
  body: string;
  statusCallbackUrl?: string;
};
export type ProviderResult = { provider: string; messageId: string; status: string };

export type MessagingFailureCategory = "temporary" | "permanent" | "configuration" | "unsubscribed";
export type MessagingFailure = { code: string; category: MessagingFailureCategory; retryable: boolean };

export class MessagingProviderError extends Error {
  constructor(public readonly failure: MessagingFailure) {
    super(failure.code);
    this.name = "MessagingProviderError";
  }
}

export interface MessagingProvider {
  sendMessage(input: MessageInput): Promise<ProviderResult>;
}
