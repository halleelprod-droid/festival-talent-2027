import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { buildPageMetadata } from "@/lib/seo";

const impactCards = [
  {
    title: "Jeunesse",
    description:
      "Donner aux jeunes talents un cadre de confiance pour se présenter, progresser et accéder à des opportunités.",
  },
  {
    title: "Culture",
    description:
      "Valoriser musique, danse, mode, arts, culture urbaine, digital, innovation et entrepreneuriat.",
  },
  {
    title: "Régions",
    description:
      "Préparer un modèle qui donne une visibilité aux talents au-delà des grandes villes.",
  },
  {
    title: "Économie créative",
    description:
      "Connecter talents, entreprises, médias, institutions et partenaires autour de projets concrets.",
  },
  {
    title: "Partenaires",
    description:
      "Permettre aux organisations de devenir des bâtisseurs d'opportunités mesurables.",
  },
  {
    title: "Transmission",
    description:
      "Créer une dynamique où coachs, mentors et anciens talents pourront transmettre aux nouvelles générations.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Impact Institutionnel | Festival Talent 2027",
  description:
    "Impact institutionnel de Festival Talent : jeunesse, culture, régions, économie créative, partenaires et transmission.",
  path: "/institution/impact",
});

export default function InstitutionImpactPage() {
  return (
    <InstitutionShell
      eyebrow="Notre Impact"
      title="Créer une valeur durable"
      description="Festival Talent agit pour révéler les talents, renforcer l'accès aux opportunités et fédérer un écosystème utile aux jeunes, aux partenaires et aux institutions."
      icon={institutionIcons.impact}
      cards={impactCards}
    />
  );
}
