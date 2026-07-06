import type { Metadata } from "next";

import { VisionPageClient } from "@/components/experience/VisionImpactPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Vision | Festival Talent 2027",
  description:
    "Pourquoi Festival Talent existe : vision, mission, valeurs, impact, Afrique, jeunesse et innovation.",
  path: "/vision",
});

export default function VisionPage() {
  return <VisionPageClient />;
}
