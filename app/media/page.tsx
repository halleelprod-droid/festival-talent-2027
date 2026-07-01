import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import MediaPageClient from "./MediaPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Media et archives",
  description:
    "Archives et couverture média Festival Talent 2027 avec Sen Influenceurs, Pierre Ndiaye Events, vidéos, photos et moments officiels.",
  path: "/media",
});

export default function MediaPage() {
  return <MediaPageClient />;
}
