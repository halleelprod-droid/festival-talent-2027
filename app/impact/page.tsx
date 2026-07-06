import type { Metadata } from "next";

import { ImpactPageClient } from "@/components/experience/VisionImpactPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Impact | Festival Talent 2027",
  description:
    "Objectifs d'impact Festival Talent : jeunes accompagnes, regions, disciplines, partenaires, benevoles et objectifs 2030.",
  path: "/impact",
});

export default function ImpactPage() {
  return <ImpactPageClient />;
}
