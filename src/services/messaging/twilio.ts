import type { MessageInput, MessagingProvider, ProviderResult } from "./provider";

export class TwilioProvider implements MessagingProvider {
  async send(input: MessageInput): Promise<ProviderResult> {
    if (input.channel !== "sms") throw new Error("channel_not_configured");
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;
    if (!accountSid || !authToken || !fromNumber) throw new Error("messaging_provider_not_configured");

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({ To: input.to, From: fromNumber, Body: input.body }),
    });
    const result = await response.json().catch(() => ({})) as { sid?: string; status?: string };
    if (!response.ok || !result.sid) throw new Error(`provider_request_failed_${response.status}`);
    return { provider: "twilio", messageId: result.sid, status: result.status ?? "accepted" };
  }
}
