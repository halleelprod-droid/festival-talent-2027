export const notificationsModule = {
  name: "notifications",
  channels: ["email", "whatsapp", "sms", "push"],
  sensitivity: "private",
  publicApi: false,
  status: "foundation",
} as const;

export { getNotificationTemplates } from "@/services/notifications";
export type {
  NotificationChannel,
  NotificationIntent,
  NotificationTemplate,
} from "@/types/notifications";
