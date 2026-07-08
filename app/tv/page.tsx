import type { Metadata } from "next";

import FestivalTVPageClient from "./FestivalTVPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent TV",
  description:
    "Festival Talent TV prepare une future plateforme video pour interviews, backstage, battles, concerts, masterclass, podcasts et documentaires.",
  path: "/tv",
});

export default function FestivalTVPage() {
  return <FestivalTVPageClient />;
}
