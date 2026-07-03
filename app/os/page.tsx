import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("os");

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent OS",
  description:
    "Vision long terme de Festival Talent OS : système numérique pour candidats, partenaires, médias, équipes et organisateurs sur plusieurs éditions.",
  path: "/os",
});

export default function FestivalTalentOSPage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Vision plateforme"
      titleAccent="système opérationnel"
      actions={[
        { label: "Espace candidat", href: "/candidat" },
        { label: "Dashboard admin", href: "/admin", variant: "outline" },
        { label: "Contact", href: "/contact", variant: "outline" },
      ]}
    />
  );
}
