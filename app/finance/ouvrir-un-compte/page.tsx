import type { Metadata } from "next";

import { OpenAccountPageClient } from "../FinancePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Demander a etre contacte | Festival Talent 2027",
  description:
    "Interface preparatoire Festival Talent Finance pour demander a etre contacte plus tard par une banque partenaire officielle, sans ouverture de compte reelle.",
  path: "/finance/ouvrir-un-compte",
});

export default function OpenAccountPage() {
  return <OpenAccountPageClient />;
}
