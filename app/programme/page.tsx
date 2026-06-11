import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import ProgrammePageClient from "./ProgrammePageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Programme officiel",
  description:
    "Programme officiel du Festival Talent 2027 a Dakar et Saly : concerts, mode, culture, innovation et experiences immersives.",
  path: "/programme",
});

export default function ProgrammePage() {
  return <ProgrammePageClient />;
}
