import type { Metadata } from "next";

import { SponsorPacksPageClient } from "@/components/sponsors/SponsorMotion";
import { buildPageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Packs partenaires | Festival Talent 2027",
  description:
    "Decouvrez les packs partenaires Festival Talent 2027 : Bronze, Argent, Or et Platine, sans affichage de prix, avec visibilite, media, VIP et activation terrain.",
  path: "/sponsors/pack-partenaires",
});

const packsJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Packs partenaires Festival Talent 2027",
  url: `${siteUrl}/sponsors/pack-partenaires`,
  itemListElement: ["Pack Bronze", "Pack Argent", "Pack Or", "Pack Platine"].map((name) => ({
    "@type": "Offer",
    name,
    availability: "https://schema.org/InStock",
  })),
};

export default function SponsorPacksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packsJsonLd) }}
      />
      <SponsorPacksPageClient />
    </>
  );
}
