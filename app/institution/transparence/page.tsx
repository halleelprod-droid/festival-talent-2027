import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { transparencyPrinciples } from "@/data/trust-center";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Transparence | Festival Talent 2027",
  description:
    "Principes de transparence Festival Talent : éthique, protection des données, respect des candidats, équité, partenariats et fonctionnement général.",
  path: "/institution/transparence",
});

export default function TransparencyPage() {
  return (
    <InstitutionShell
      eyebrow="Transparence"
      title="Des principes clairs pour une plateforme de confiance"
      description="Festival Talent formalise progressivement ses règles, ses responsabilités et ses engagements afin de protéger les talents et d'inspirer confiance aux partenaires."
      icon={institutionIcons.transparency}
      cards={transparencyPrinciples}
    />
  );
}
