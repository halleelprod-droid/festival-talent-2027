import type { Metadata } from "next";
import { Users } from "lucide-react";

import LeadershipOverview from "@/components/team/LeadershipOverview";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Leadership",
  description:
    "Découvrez le leadership, la gouvernance, les directions opérationnelles, les coachs et les partenaires institutionnels de Festival Talent 2027.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />

      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Gouvernance institutionnelle"
            icon={Users}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Notre
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Leadership
                </span>
              </>
            }
            description="Une organisation internationale, complémentaire et responsable, réunie autour d'une vision commune pour la jeunesse, la culture et l'innovation."
          />
        </div>
      </section>

      <LeadershipOverview />
    </main>
  );
}
