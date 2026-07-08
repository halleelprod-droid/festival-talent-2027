import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Presse Institutionnelle | Festival Talent 2027",
  description:
    "Espace presse institutionnel Festival Talent : centre presse, kit média, communiqués et contacts officiels.",
  path: "/institution/presse",
});

export default function InstitutionPressPage() {
  return (
    <InstitutionShell
      eyebrow="Presse"
      title="Ressources et relations médias"
      description="Un accès clair aux ressources presse, aux communiqués, au kit média et aux contacts officiels pour journalistes, médias, créateurs de contenu et partenaires."
      icon={institutionIcons.press}
      cards={[
        {
          title: "Centre Presse",
          description:
            "Accéder au centre presse officiel, aux ressources médias et aux règles d'utilisation.",
          href: "/presse",
        },
        {
          title: "Communiqués",
          description:
            "Retrouver les annonces officielles et informations validées par l'équipe Festival Talent.",
          href: "/news",
        },
        {
          title: "Contact média",
          description:
            "Orienter les demandes de journalistes, interviews, tournages et contenus officiels.",
          href: "/institution/contact-institutionnel",
        },
      ]}
    />
  );
}
