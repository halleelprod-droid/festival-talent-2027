import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import TicketsPageClient from "./TicketsPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Billetterie officielle",
  description:
    "Billetterie officielle Festival Talent 2027 : Pass Standard, Pass VIP et Pass Premium pour la tournee europeenne entre Paris et Rome.",
  path: "/tickets",
});

export default function TicketsPage() {
  return <TicketsPageClient />;
}
