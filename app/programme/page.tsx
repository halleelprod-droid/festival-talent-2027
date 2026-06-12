import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import ProgrammePageClient from "./ProgrammePageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Programme officiel",
  description:
    "Programme officiel du Festival Talent 2027 : tournee europeenne entre Paris et Rome, de janvier a avril 2027, precedee par des pre-selections officielles.",
  path: "/programme",
});

export default function ProgrammePage() {
  return <ProgrammePageClient />;
}
