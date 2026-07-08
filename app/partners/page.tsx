import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Partenaires | Festival Talent 2027",
  description:
    "Construisons ensemble l'avenir des talents avec Festival Talent 2027 : partenaires institutionnels, bancaires, digitaux, medias, strategiques, artistiques et lifestyle.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersPageClient />;
}
