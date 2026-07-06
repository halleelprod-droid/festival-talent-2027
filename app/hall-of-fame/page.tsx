import type { Metadata } from "next";

import HallOfFamePageClient from "./HallOfFamePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hall of Fame | Festival Talent 2027",
  description:
    "Découvrez le futur Hall of Fame du Festival Talent, dédié aux lauréats, mentors, partenaires et bâtisseurs qui marqueront l’histoire du festival.",
  path: "/hall-of-fame",
});

export default function HallOfFamePage() {
  return <HallOfFamePageClient />;
}
