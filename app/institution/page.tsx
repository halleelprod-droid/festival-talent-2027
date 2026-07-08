import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { institutionLinks } from "@/data/trust-center";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Institution | Festival Talent 2027",
  description:
    "Trust Center Festival Talent : gouvernance, vision, impact, transparence, documents officiels, presse, partenaires et contact institutionnel.",
  path: "/institution",
});

export default function InstitutionPage() {
  return (
    <InstitutionShell
      eyebrow="Trust Center Festival Talent"
      title="Institution"
      description="Un espace de confiance pour les banques, institutions, entreprises, investisseurs, ONG et partenaires internationaux qui souhaitent comprendre la vision, la gouvernance et les principes de Festival Talent."
      icon={institutionIcons.default}
      cards={institutionLinks.map((link) => ({
        title: link.label,
        description: link.description,
        href: link.href,
      }))}
    />
  );
}
