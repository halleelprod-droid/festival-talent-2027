import type { Metadata } from "next";

import FinancePageClient from "./FinancePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Finance | Festival Talent 2027",
  description:
    "Festival Talent Finance : architecture preparatoire pour banques partenaires futures, education financiere, entrepreneuriat, opportunites et accompagnement des jeunes.",
  path: "/finance",
});

export default function FinancePage() {
  return <FinancePageClient />;
}
