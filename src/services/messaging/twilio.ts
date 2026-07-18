import {
  MessagingProviderError,
  type MessageInput,
  type MessagingProvider,
  type ProviderResult,
} from "./provider";

export class TwilioProvider implements MessagingProvider {
  constructor(private readonly config: {
    accountSid: string;
    authToken: string;
    messagingServiceSid?: string;
    fromNumber?: string;
    statusCallbackUrl?: string;
  }) {}

  async sendMessage(input: MessageInput): Promise<ProviderResult> {
    if (input.channel !== "sms") {
      throw new MessagingProviderError({ code: "channel_not_configured", category: "configuration", retryable: false });
    }

    const body = new URLSearchParams({ To: input.to, Body: input.body });
    if (this.config.messagingServiceSid) body.set("MessagingServiceSid", this.config.messagingServiceSid);
    else if (this.config.fromNumber) body.set("From", this.config.fromNumber);
    else {
      throw new MessagingProviderError({ code: "sender_not_configured", category: "configuration", retryable: false });
    }
    const callbackUrl = input.statusCallbackUrl ?? this.config.statusCallbackUrl;
    if (callbackUrl) body.set("StatusCallback", callbackUrl);

    let response: Response;
    try {
      response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.config.accountSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });
    } catch {
      throw new MessagingProviderError({ code: "provider_network_error", category: "temporary", retryable: true });
    }
    const result = await response.json().catch(() => ({})) as { sid?: string; status?: string; code?: number };
    if (!response.ok || !result.sid) {
      if (result.code === 21610) {
        throw new MessagingProviderError({ code: "21610", category: "unsubscribed", retryable: false });
      }
      const temporary = response.status === 429 || response.status >= 500;
      const configuration = response.status === 401 || response.status === 403;
      throw new MessagingProviderError({
        code: `provider_http_${response.status}`,
        category: configuration ? "configuration" : temporary ? "temporary" : "permanent",
        retryable: temporary,
      });
    }
    return { provider: "twilio", messageId: result.sid, status: result.status ?? "accepted" };
  }
}

export function createTwilioProviderFromEnv(): MessagingProvider | null {
  if (process.env.MESSAGING_ENABLED !== "true") return null;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM_NUMBER;
  if (!accountSid || !authToken || (!messagingServiceSid && !fromNumber)) {
    throw new MessagingProviderError({ code: "messaging_provider_not_configured", category: "configuration", retryable: false });
  }
  return new TwilioProvider({
    accountSid,
    authToken,
    messagingServiceSid,
    fromNumber,
    statusCallbackUrl: process.env.TWILIO_STATUS_CALLBACK_URL,
  });
}
