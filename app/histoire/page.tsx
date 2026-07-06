import type { Metadata } from "next";

import HistoirePageClient from "./HistoirePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Histoire | Festival Talent 2027",
  description:
    "Découvrez l’histoire et la vision du Festival Talent 2027, une plateforme dédiée à la révélation, l’accompagnement et la valorisation des talents.",
  path: "/histoire",
});

export default function HistoirePage() {
  return <HistoirePageClient />;
}
