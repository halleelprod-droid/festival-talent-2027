import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partenaires Institutionnels | Festival Talent 2027",
  description:
    "Espace partenaires institutionnels Festival Talent : entreprises, banques, médias, institutions, sponsors et organisations.",
  path: "/institution/partenaires",
});

export default function InstitutionPartnersPage() {
  return (
    <InstitutionShell
      eyebrow="Partenaires"
      title="Un écosystème d'organisations engagées"
      description="Festival Talent rassemble partenaires institutionnels, stratégiques, artistiques, digitaux, médias, lifestyle et futurs partenaires bancaires autour d'une vision commune : construire l'avenir des talents."
      icon={institutionIcons.partners}
      cards={[
        {
          title: "Page partenaires",
          description:
            "Consulter la cartographie complète des partenaires actuels et des catégories institutionnelles.",
          href: "/partners",
        },
        {
          title: "Sponsor Center",
          description:
            "Découvrir les opportunités de sponsoring, packs partenaires et demandes de rendez-vous.",
          href: "/sponsors",
        },
        {
          title: "Devenir partenaire",
          description:
            "Préparer une prise de contact avec l'équipe Festival Talent pour étudier une collaboration.",
          href: "/sponsors/devenir-partenaire",
        },
      ]}
    />
  );
}
