import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { institutionalContacts } from "@/data/trust-center";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Institutionnel | Festival Talent 2027",
  description:
    "Contacts institutionnels Festival Talent : relations institutionnelles, partenariats, direction digitale, presse et communication.",
  path: "/institution/contact-institutionnel",
});

export default function InstitutionalContactPage() {
  return (
    <InstitutionShell
      eyebrow="Contact Institutionnel"
      title="Les bons interlocuteurs"
      description="Cette page oriente les demandes des institutions, banques, entreprises, investisseurs, ONG, partenaires internationaux, médias et sponsors vers les missions appropriées."
      icon={institutionIcons.contact}
      cards={institutionalContacts.map((contact) => ({
        title: contact.area,
        description: `${contact.name} — ${contact.mission} Email : ${contact.email}. Téléphone : ${contact.phone}.`,
      }))}
    />
  );
}
