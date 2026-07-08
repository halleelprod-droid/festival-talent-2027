import type { Metadata } from "next";

import PassportPageClient from "./PassportPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Passeport Talent | Festival Talent 2027",
  description:
    "Maquette du futur Passeport Talent Festival Talent : photo, discipline, competences, coach, region, certificats, badges, QR fictif et portfolio.",
  path: "/passport",
});

export default function PassportPage() {
  return <PassportPageClient />;
}
