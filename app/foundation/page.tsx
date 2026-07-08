import type { Metadata } from "next";

import FoundationPageClient from "./FoundationPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent Foundation | Festival Talent 2027",
  description:
    "Vision future Festival Talent Foundation : une ambition de long terme pour accompagner durablement les talents africains par la culture, la formation, le mentorat et les opportunités.",
  path: "/foundation",
});

export default function FoundationPage() {
  return <FoundationPageClient />;
}
