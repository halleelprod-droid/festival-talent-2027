import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Partenaires et sponsors",
  description:
    "Partenaires Festival Talent 2027 : Union Europeenne, Sen Influenceurs, PIN EVENTS, Agence Diassnor, Centre Culturel Blaise Senghor et partenaires officiels.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersPageClient />;
}
