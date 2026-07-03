import type { Metadata } from "next";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  MapPinned,
  Mic2,
  Sparkles,
  Users,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { confirmedArtists } from "@/data/artists";
import { festivalActivities } from "@/data/activities";
import { officialPartners } from "@/data/partners";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Statistiques",
  description:
    "Statistiques publiques non sensibles Festival Talent 2027 : talents attendus, disciplines, zones, activités, partenaires et artistes confirmés.",
  path: "/stats",
});

const publicStats = [
  {
    title: "Talents attendus",
    value: "50K+",
    description: "Audience et participants attendus sur l'écosystème FT2027.",
    icon: Users,
  },
  {
    title: "Disciplines",
    value: "8+",
    description: "Danse, musique, mode, art, entrepreneuriat, tech et plus.",
    icon: BadgeCheck,
  },
  {
    title: "Zones",
    value: "12",
    description: "Zones de pré-sélection préparées pour les talents.",
    icon: MapPinned,
  },
  {
    title: "Activités",
    value: `${festivalActivities.length}`,
    description: "Activités et pôles d'expression annoncés publiquement.",
    icon: Activity,
  },
  {
    title: "Partenaires",
    value: `${officialPartners.length}`,
    description: "Partenaires officiels, médias, production et associés.",
    icon: Sparkles,
  },
  {
    title: "Artistes confirmés",
    value: `${confirmedArtists.length}`,
    description: "Samba Peuzzi, Morijah et Cysoul confirmés.",
    icon: Mic2,
  },
];

export default function PublicStatsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Données publiques"
            icon={BarChart3}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Statistiques
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                  Festival Talent
                </span>
              </>
            }
            description="Des indicateurs publics, non sensibles, pour présenter l'ampleur de Festival Talent 2027 sans afficher d'informations privées des candidats."
          />
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {publicStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <PremiumCard
                key={stat.title}
                tone={index === 0 || index === 5 ? "gold" : "default"}
                className="p-7 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={27} />
                  </div>

                  <p className="text-4xl font-black uppercase text-white">
                    {stat.value}
                  </p>
                </div>

                <h2 className="mt-7 text-2xl font-black uppercase text-white">
                  {stat.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {stat.description}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-10">
            <h2 className="text-3xl font-black uppercase text-white">
              Aucune donnée candidat privée
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Cette page affiche uniquement des chiffres publics de présentation.
              Les téléphones, emails, messages, portfolios et statuts individuels
              restent exclus de l&apos;espace public.
            </p>
            <div className="mt-8">
              <GradientButton href="/candidat" variant="outline" icon={Users}>
                Découvrir l&apos;espace candidat
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
