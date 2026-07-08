import type { Metadata } from "next";

import { FinancePartnersPageClient } from "../FinancePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Banques partenaires | Festival Talent 2027",
  description:
    "Page preparatoire des futures banques partenaires Festival Talent Finance. Aucune banque reelle n'est integree tant qu'aucun accord officiel n'est signe.",
  path: "/finance/banques-partenaires",
});

export default function FinancePartnersPage() {
  return <FinancePartnersPageClient />;
}
