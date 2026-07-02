import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Partenaires et sponsors",
  description:
    "Devenir partenaire du Festival Talent 2027 avec l'Union Europeenne, Sen Influenceurs, PIN EVENTS et les opportunites Gold, Silver, Bronze et institutionnelles.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersPageClient />;
}
