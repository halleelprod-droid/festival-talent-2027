import type { Metadata } from "next";

import PlatformPageShell from "@/components/platform/PlatformPageShell";
import { getPlatformItem } from "@/data/platform";
import { buildPageMetadata } from "@/lib/seo";

const item = getPlatformItem("mobile");

export const metadata: Metadata = buildPageMetadata({
  title: "Application mobile",
  description:
    "Application mobile Festival Talent : vision future pour suivi candidat, notifications, programme, médias, actualités et billetterie future.",
  path: "/mobile",
});

export default function MobilePage() {
  return (
    <PlatformPageShell
      item={item}
      eyebrow="Mobile future"
      titleAccent="Festival Talent"
      notice="L’application mobile est une vision future de la plateforme Festival Talent."
      actions={[
        { label: "Espace candidat", href: "/candidat" },
        { label: "Actualités", href: "/news", variant: "outline" },
        { label: "Contact", href: "/contact", variant: "outline" },
      ]}
    />
  );
}
