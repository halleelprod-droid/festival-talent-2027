import type { Metadata } from "next";
import {
  Handshake,
  MapPin,
  Mic2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Communaute",
  description:
    "Decouvrez la communaute Festival Talent 2027 : candidats, coachs, artistes, partenaires, regions et opportunites.",
  path: "/communaute",
});

const communitySections = [
  {
    title: "Les candidats",
    text: "Des artistes, danseurs, createurs, entrepreneurs, influenceurs et jeunes talents qui osent entrer dans un parcours de progression.",
    icon: Users,
  },
  {
    title: "Les coachs & mentors",
    text: "Mister Moo, Oldy Sow et les futurs accompagnants aident les talents a renforcer confiance, discipline et posture.",
    icon: Sparkles,
  },
  {
    title: "Les artistes confirmes",
    text: "Samba Peuzzi, Morijah et Cysoul incarnent l'inspiration artistique deja annoncee pour Festival Talent 2027.",
    icon: Mic2,
  },
  {
    title: "Les partenaires",
    text: "Union Europeenne, Sen Influenceurs, PIN EVENTS, Mano Perfetto, H & Hair et Universal Selfcare soutiennent l'ecosysteme.",
    icon: Handshake,
  },
  {
    title: "Les regions",
    text: "La communaute s'etend par zones et territoires pour ouvrir l'acces aux talents au-dela d'une seule scene.",
    icon: MapPin,
  },
  {
    title: "Les futures opportunites",
    text: "Scenes, formations, medias, collaborations, partenariats et ouvertures internationales se construiront progressivement.",
    icon: Star,
  },
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(127,29,29,0.12),transparent_38%),linear-gradient(to_bottom,#000,rgba(9,7,2,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Communaute"
            icon={Users}
            align="center"
            className="max-w-5xl"
            title={
              <>
                La communaute
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Festival Talent
                </span>
              </>
            }
            description="Festival Talent 2027 rassemble des artistes, danseurs, createurs, entrepreneurs, influenceurs, coachs, partenaires, institutions et jeunes talents autour d'une meme vision : reveler, accompagner et connecter les talents."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GradientButton href="/preselections">
              S&apos;inscrire aux pre-selections
            </GradientButton>
            <GradientButton href="/mentors" variant="outline">
              Voir les mentors
            </GradientButton>
            <GradientButton href="/activites" variant="outline">
              Decouvrir les activites
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {communitySections.map((section) => {
            const Icon = section.icon;

            return (
              <PremiumCard key={section.title} className="p-7">
                <Icon className="text-yellow-300" size={32} />
                <h2 className="mt-5 text-2xl font-black uppercase text-white">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/64">
                  {section.text}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
