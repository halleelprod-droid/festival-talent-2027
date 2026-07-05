import type { Metadata } from "next";
import {
  GraduationCap,
  Handshake,
  Megaphone,
  Rocket,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Opportunites",
  description:
    "Decouvrez les opportunites proposees par Festival Talent 2027 aux jeunes talents, artistes, createurs, entrepreneurs et partenaires.",
  path: "/opportunites",
});

const opportunities = [
  {
    title: "Pre-selections",
    text: "Entrer dans le parcours officiel et faire connaitre son talent dans les disciplines du festival.",
    icon: Trophy,
  },
  {
    title: "Coaching",
    text: "Beneficier d'un accompagnement humain autour de la confiance, de la discipline et de la posture.",
    icon: Sparkles,
  },
  {
    title: "Visibilite media",
    text: "Profiter progressivement des contenus, annonces, relais et couvertures autour des talents.",
    icon: Megaphone,
  },
  {
    title: "Collaborations",
    text: "Creer des ponts entre artistes, createurs, entrepreneurs, partenaires et institutions.",
    icon: Handshake,
  },
  {
    title: "Formations futures",
    text: "Preparer des formats d'apprentissage, masterclass, ateliers et modules d'accompagnement.",
    icon: GraduationCap,
  },
  {
    title: "Partenariats",
    text: "Ouvrir des opportunites pour les marques, sponsors et acteurs culturels engages.",
    icon: Star,
  },
  {
    title: "International",
    text: "Construire une trajectoire connectee entre le Senegal, l'Europe et les futures editions.",
    icon: Rocket,
  },
];

export default function OpportunitiesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_38%),linear-gradient(to_bottom,#000,rgba(9,7,2,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Opportunites"
            icon={Star}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Opportunites
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Festival Talent
                </span>
              </>
            }
            description="Festival Talent 2027 ouvre progressivement des opportunites pour les jeunes talents : pre-selections, scenes, collaborations, formations, visibilite, partenariats et accompagnement."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GradientButton href="/preselections">
              Remplir le formulaire
            </GradientButton>
            <GradientButton href="/contact" variant="outline">
              Contacter l&apos;equipe
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;

            return (
              <PremiumCard
                key={opportunity.title}
                tone={opportunity.title === "International" ? "gold" : "default"}
                className="p-7"
              >
                <Icon className="text-yellow-300" size={32} />
                <h2 className="mt-5 text-2xl font-black uppercase text-white">
                  {opportunity.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/64">
                  {opportunity.text}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
