export type MessageInput = { channel: "sms" | "whatsapp" | "email"; to: string; body: string };
export type ProviderResult = { provider: string; messageId: string; status: string };

export interface MessagingProvider {
  send(input: MessageInput): Promise<ProviderResult>;
}
