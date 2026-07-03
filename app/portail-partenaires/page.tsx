import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("partenaires");

export const metadata: Metadata = buildPageMetadata({
  title: "Portail partenaires",
  description:
    "Portail partenaires Festival Talent : vision future pour sponsors, packs, visibilité, activations, reporting et accès média.",
  path: "/portail-partenaires",
});

export default function PortailPartenairesPage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Sponsors & partenaires"
      titleAccent="espace futur"
      notice="Le portail partenaires prépare une expérience dédiée sans connexion réelle dans cette version."
      actions={[
        { label: "Demander le dossier sponsoring", href: "/contact" },
        { label: "Voir partenaires", href: "/partners", variant: "outline" },
        { label: "Contact", href: "/contact", variant: "outline" },
      ]}
    />
  );
}
