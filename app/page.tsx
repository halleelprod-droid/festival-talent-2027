import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent 2027",
  description:
    "Site officiel Festival Talent 2027 : pre-selections, Battle All Style, artistes, partenaires, coachs, communaute, tickets et medias.",
  path: "/",
});

export default function Home() {
  redirect("/fr");
}
