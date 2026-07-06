import type { Metadata } from "next";

import EspaceTalentPageClient from "./EspaceTalentPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Espace Talent",
  description:
    "Interface premium preparatoire de l'Espace Talent Festival Talent 2027 pour suivre profil, candidatures, preselections, coachs, documents, opportunites et progression.",
  path: "/espace-talent",
});

export default function EspaceTalentPage() {
  return <EspaceTalentPageClient />;
}
