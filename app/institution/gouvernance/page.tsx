import type { Metadata } from "next";

import InstitutionShell, {
  institutionIcons,
} from "@/components/institution/InstitutionShell";
import LeadershipOverview from "@/components/team/LeadershipOverview";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Gouvernance | Festival Talent 2027",
  description:
    "Découvrez le leadership, les directions opérationnelles, les coachs et les partenaires institutionnels qui structurent Festival Talent.",
  path: "/institution/gouvernance",
});

export default function GovernancePage() {
  return (
    <InstitutionShell
      eyebrow="Notre Gouvernance"
      title="Une organisation lisible et responsable"
      description="Festival Talent réunit une direction, des expertises opérationnelles, des accompagnants et des partenaires institutionnels autour d'une ambition durable."
      icon={institutionIcons.governance}
    >
      <LeadershipOverview />
    </InstitutionShell>
  );
}
