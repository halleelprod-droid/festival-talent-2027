import { createPlatformResponse } from "@/lib/platform/api";
import { getTicketReadiness } from "@/services/tickets";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("tickets", getTicketReadiness(), {
    note: "Preparatory ticketing status only. No payment or buyer data is exposed.",
  });
}
