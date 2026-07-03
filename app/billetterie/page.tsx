import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { appUrls } from "@/config/urls";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("billetterie");

export const metadata: Metadata = buildPageMetadata({
  title: "Billetterie future",
  description:
    "Billetterie future Festival Talent 2027 : préparation des tickets, QR codes et contrôle d'accès sans paiement réel actif.",
  path: "/billetterie",
});

export default function BilletteriePage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Billetterie préparatoire"
      titleAccent="bientôt disponible"
      notice="La billetterie officielle n’est pas encore ouverte. Les frais d’inscription aux pré-sélections sont distincts des billets d’accès au festival."
      actions={[
        { label: "Être informé sur WhatsApp", href: appUrls.whatsapp },
        { label: "Voir les pré-sélections", href: "/preselections", variant: "outline" },
        { label: "Voir les activités", href: "/activites", variant: "outline" },
      ]}
    />
  );
}
