import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { officialDocuments } from "@/data/trust-center";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Documents Officiels | Festival Talent 2027",
  description:
    "Bibliothèque officielle Festival Talent : Brand Book, Partnership Book, dossier sponsoring, kit média, communiqués et charte graphique.",
  path: "/institution/documents-officiels",
});

export default function OfficialDocumentsPage() {
  return (
    <InstitutionShell
      eyebrow="Documents Officiels"
      title="Bibliothèque institutionnelle"
      description="Cet espace prépare les ressources officielles destinées aux partenaires, médias, institutions et sponsors. Les téléchargements seront activés progressivement lorsque les documents seront validés."
      icon={institutionIcons.documents}
      cards={officialDocuments.map((title) => ({
        title,
        description:
          "Document préparé pour téléchargement futur après validation officielle par l'équipe Festival Talent.",
      }))}
    />
  );
}
