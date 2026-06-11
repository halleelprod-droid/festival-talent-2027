import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Partenaires et sponsors",
  description:
    "Devenir partenaire du Festival Talent 2027. L'Union Europeenne est le premier partenaire officiel majeur, avec des offres Gold, Silver, Bronze et institutionnelles.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersPageClient />;
}
