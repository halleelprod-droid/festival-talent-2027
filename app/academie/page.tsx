import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("academie");

export const metadata: Metadata = buildPageMetadata({
  title: "Académie Festival Talent",
  description:
    "Académie Festival Talent : vision future pour masterclass, coaching, mentorat et formations progressives sans certification active en V8.",
  path: "/academie",
});

export default function AcademiePage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Académie future"
      titleAccent="formation & mentorat"
      notice="Les programmes de formation seront annoncés progressivement."
      actions={[
        { label: "Pré-sélections", href: "/preselections" },
        { label: "Contact", href: "/contact", variant: "outline" },
        { label: "Activités", href: "/activites", variant: "outline" },
      ]}
    />
  );
}
