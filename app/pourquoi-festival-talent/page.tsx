import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import PourquoiFestivalTalentPageClient from "./PourquoiFestivalTalentPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Pourquoi Festival Talent ?",
  description:
    "Pourquoi Festival Talent est plus qu'un festival : une plateforme qui revele, accompagne et propulse les talents africains.",
  path: "/pourquoi-festival-talent",
});

export default function PourquoiFestivalTalentPage() {
  return <PourquoiFestivalTalentPageClient />;
}
