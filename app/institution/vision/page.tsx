import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { buildPageMetadata } from "@/lib/seo";

const visionCards = [
  {
    title: "Révéler",
    description:
      "Identifier les talents dans plusieurs disciplines et leur offrir une première exposition sérieuse.",
  },
  {
    title: "Accompagner",
    description:
      "Créer un parcours qui ne s'arrête pas à la scène : coaching, mentorat, réseau et opportunités.",
  },
  {
    title: "Connecter",
    description:
      "Rapprocher talents, coachs, artistes, partenaires, institutions et acteurs de l'économie créative.",
  },
  {
    title: "Construire",
    description:
      "Faire évoluer Festival Talent vers une plateforme durable, culturelle, éducative et panafricaine.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Vision Institutionnelle | Festival Talent 2027",
  description:
    "La vision institutionnelle de Festival Talent : révéler, accompagner, connecter et construire l'avenir des talents africains.",
  path: "/institution/vision",
});

export default function InstitutionVisionPage() {
  return (
    <InstitutionShell
      eyebrow="Notre Vision"
      title="Une plateforme pour l'avenir des talents"
      description="Festival Talent ne se limite pas à un événement. Le projet prépare une institution culturelle capable d'accompagner les talents sur plusieurs années, avec une vision africaine, moderne et durable."
      icon={institutionIcons.vision}
      cards={visionCards}
    />
  );
}
