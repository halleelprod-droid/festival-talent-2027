import type { NotificationTemplate } from "@/types/notifications";

export const notificationTemplates: NotificationTemplate[] = [
  {
    id: "candidate-confirmation-v1",
    intent: "candidate_confirmation",
    channels: ["email", "whatsapp"],
    subject: "Confirmation de pre-selection",
    body: "Votre inscription Festival Talent a bien ete recue.",
    requiresConsent: true,
  },
  {
    id: "partner-follow-up-v1",
    intent: "partner_follow_up",
    channels: ["email", "whatsapp"],
    subject: "Partenariat Festival Talent",
    body: "L'equipe Festival Talent reviendra vers vous avec les prochaines etapes.",
    requiresConsent: true,
  },
];

export function getNotificationTemplates() {
  return notificationTemplates;
}
