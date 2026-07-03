export type TicketReadiness = {
  label: string;
  status: "planned" | "active";
};

export function getTicketReadiness(): TicketReadiness[] {
  return [
    { label: "Billetterie officielle", status: "planned" },
    { label: "Pré-sélections", status: "active" },
    { label: "Pass partenaires", status: "planned" },
  ];
}
