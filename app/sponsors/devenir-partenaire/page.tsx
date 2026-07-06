import type { Metadata } from "next";

import { BecomeSponsorPageClient } from "@/components/sponsors/SponsorMotion";
import { buildPageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Devenir partenaire | Festival Talent 2027",
  description:
    "Interface preparatoire pour devenir partenaire Festival Talent 2027 : entreprise, responsable, email, telephone, secteur et message.",
  path: "/sponsors/devenir-partenaire",
});

const becomeSponsorJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Devenir partenaire Festival Talent 2027",
  url: `${siteUrl}/sponsors/devenir-partenaire`,
  about: {
    "@type": "Organization",
    name: "Festival Talent 2027",
  },
};

export default function BecomeSponsorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(becomeSponsorJsonLd) }}
      />
      <BecomeSponsorPageClient />
    </>
  );
}
