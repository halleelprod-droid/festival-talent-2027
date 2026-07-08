import type { Metadata } from "next";

import AcademyPageClient from "./AcademyPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Academy | Festival Talent 2027",
  description:
    "Festival Talent Academy : vision future d'accompagnement autour du coaching, mentorat, leadership, communication, business, entrepreneuriat, danse, musique et mode.",
  path: "/academy",
});

export default function AcademyPage() {
  return <AcademyPageClient />;
}
