export type TicketReadiness = {
  label: string;
  status: "planned" | "active";
};

export {
  ticketAccountFeatures,
  ticketComparison,
  ticketFaq,
  ticketFutureCapabilities,
  ticketPasses,
  ticketPaymentMethods,
  ticketProcessSteps,
} from "@/data/tickets";

export function getTicketReadiness(): TicketReadiness[] {
  return [
    { label: "Billetterie officielle", status: "planned" },
    { label: "Pre-selections", status: "active" },
    { label: "Pass partenaires", status: "planned" },
  ];
}

export function getTicketingArchitectureReadiness(): TicketReadiness[] {
  return [
    { label: "UX billetterie premium", status: "active" },
    { label: "Paiements", status: "planned" },
    { label: "QR Code", status: "planned" },
    { label: "Wallet", status: "planned" },
    { label: "Scanner", status: "planned" },
  ];
}
