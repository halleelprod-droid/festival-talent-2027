export const ticketingSafetyRules = [
  "Aucun paiement reel n'est connecte.",
  "Aucun QR Code reel n'est genere.",
  "Aucune transaction n'est effectuee.",
  "Aucun billet PDF reel n'est emis.",
  "Aucune donnee ticketing n'est stockee dans Supabase.",
] as const;

export function getTicketingSafetyNotice() {
  return "Billetterie preparatoire : experience simulee, sans paiement reel, sans QR Code reel et sans transaction.";
}
