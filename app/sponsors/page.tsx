import type { Metadata } from "next";

import { SponsorCenterPageClient } from "@/components/sponsors/SponsorMotion";
import { buildPageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sponsor Center | Festival Talent 2027",
  description:
    "Festival Talent Sponsor Center : espace institutionnel pour entreprises, banques, operateurs telecoms, institutions et marques souhaitant soutenir les talents africains.",
  path: "/sponsors",
});

const sponsorCenterJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Festival Talent Sponsor Center",
  url: `${siteUrl}/sponsors`,
  parentOrganization: {
    "@type": "Organization",
    name: "Festival Talent 2027",
    url: siteUrl,
  },
  description:
    "Espace institutionnel dedie aux partenariats, sponsors, activations et programmes d'impact jeunesse de Festival Talent.",
};

export default function SponsorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sponsorCenterJsonLd) }}
      />
      <SponsorCenterPageClient />
    </>
  );
}
