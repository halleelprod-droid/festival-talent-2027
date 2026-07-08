import type { Metadata } from "next";

import SenegalMapPageClient from "./SenegalMapPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Carte du Senegal | Festival Talent 2027",
  description:
    "Carte interactive du Senegal pour visualiser les futures preselections Festival Talent 2027 par region, discipline, date et statut.",
  path: "/map",
});

export default function SenegalMapPage() {
  return <SenegalMapPageClient />;
}
