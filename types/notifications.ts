export type NotificationChannel = "email" | "whatsapp" | "sms" | "push";

export type NotificationIntent =
  | "candidate_confirmation"
  | "partner_follow_up"
  | "media_announcement"
  | "admin_alert"
  | "ticketing_update";

export type NotificationTemplate = {
  id: string;
  intent: NotificationIntent;
  channels: NotificationChannel[];
  subject: string;
  body: string;
  requiresConsent: boolean;
};
