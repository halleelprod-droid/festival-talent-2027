import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("tv");

export const metadata: Metadata = buildPageMetadata({
  title: "Festival TV",
  description:
    "Festival TV prépare un futur espace vidéo Festival Talent pour lives, replays, interviews, coulisses, performances et archives.",
  path: "/tv",
});

export default function FestivalTVPage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Espace vidéo futur"
      titleAccent="à venir"
      notice="Festival TV est un espace préparatoire. Aucun streaming réel n’est intégré dans cette version."
      actions={[
        { label: "Voir Media", href: "/media" },
        { label: "Découvrir les activités", href: "/activites", variant: "outline" },
        { label: "S’inscrire aux pré-sélections", href: "/preselections", variant: "outline" },
      ]}
    />
  );
}
