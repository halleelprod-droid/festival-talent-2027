import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import MediaPageClient from "./MediaPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Media et archives",
  description:
    "Archives officielles du premier Festival Talent : videos, photos, aftermovie et moments forts avant Festival Talent 2027.",
  path: "/media",
});

export default function MediaPage() {
  return <MediaPageClient />;
}
