export { getTicketReadiness } from "@/services/tickets";
export type { TicketReadiness } from "@/services/tickets";

export const ticketsModule = {
  name: "tickets",
  sensitivity: "protected",
  publicApi: false,
  status: "foundation",
} as const;
