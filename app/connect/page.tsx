import type { Metadata } from "next";

import ConnectPageClient from "./ConnectPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Connect | Festival Talent 2027",
  description:
    "Festival Talent Connect : vision future d'un reseau professionnel reliant talents, entreprises, managers, producteurs, sponsors, coachs et mentors.",
  path: "/connect",
});

export default function ConnectPage() {
  return <ConnectPageClient />;
}
