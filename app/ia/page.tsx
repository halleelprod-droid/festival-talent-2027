import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("ia");

export const metadata: Metadata = buildPageMetadata({
  title: "IA Festival Talent",
  description:
    "Vision IA Festival Talent : assistant candidat, FAQ intelligente, orientation, aide partenaires et analyse statistique future.",
  path: "/ia",
});

export default function IAFestivalTalentPage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Assistant IA futur"
      titleAccent="préparatoire"
      notice="L’assistant IA Festival Talent sera développé progressivement et ne remplace pas l’équipe officielle."
      actions={[
        { label: "Contact", href: "/contact" },
        { label: "Pré-sélections", href: "/preselections", variant: "outline" },
        { label: "Voir les activités", href: "/activites", variant: "outline" },
      ]}
    />
  );
}
