import type { Metadata } from "next";

import AwardsPageClient from "./AwardsPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Awards | Festival Talent 2027",
  description:
    "Découvrez les futures récompenses Festival Talent Awards, célébrant les talents, coachs, partenaires et bâtisseurs du Festival Talent 2027.",
  path: "/awards",
});

export default function AwardsPage() {
  return <AwardsPageClient />;
}
