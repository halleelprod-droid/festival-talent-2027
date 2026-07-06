import type { Metadata } from "next";

import PressePageClient from "./PressePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Presse | Festival Talent 2027",
  description:
    "Centre presse officiel du Festival Talent 2027 : kit média, communiqués, logos, contacts presse et ressources officielles.",
  path: "/presse",
});

export default function PressePage() {
  return <PressePageClient />;
}
