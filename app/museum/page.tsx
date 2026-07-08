import type { Metadata } from "next";

import MuseumPageClient from "./MuseumPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Museum | Festival Talent 2027",
  description:
    "Le musée numérique du Festival Talent : affiches officielles, photos d'archives, trophées, vidéos, lauréats et frise chronologique de l'édition 2027.",
  path: "/museum",
});

export default function MuseumPage() {
  return <MuseumPageClient />;
}
