import type { Metadata } from "next";

import ImpactPageClient from "./ImpactPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Impact | Festival Talent 2027",
  description:
    "Découvrez l’impact social, culturel et économique du Festival Talent 2027 pour la jeunesse, les régions, les talents et les partenaires.",
  path: "/impact",
});

export default function ImpactPage() {
  return <ImpactPageClient />;
}
