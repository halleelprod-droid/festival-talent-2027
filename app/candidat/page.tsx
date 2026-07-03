import type { Metadata } from "next";
import {
  Bell,
  ClipboardCheck,
  FileVideo,
  Flag,
  ListChecks,
  MessageCircle,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Espace Candidat",
  description:
    "Espace candidat Festival Talent 2027 pour suivre prochainement inscription, discipline, statut, documents et étapes.",
  path: "/candidat",
});

const candidateCards = [
  {
    title: "Mon inscription",
    description: "Retrouver les informations envoyées au formulaire officiel.",
    icon: ClipboardCheck,
  },
  {
    title: "Ma discipline",
    description: "Suivre la catégorie choisie et les consignes associées.",
    icon: Trophy,
  },
  {
    title: "Mon statut",
    description: "Visualiser l'avancement de la candidature quand le suivi sera actif.",
    icon: Flag,
  },
  {
    title: "Mes prochaines étapes",
    description: "Recevoir les dates, zones et instructions de pré-sélection.",
    icon: ListChecks,
  },
  {
    title: "Documents / médias",
    description: "Préparer portfolio, vidéos, photos et liens utiles.",
    icon: FileVideo,
  },
  {
    title: "Notifications",
    description: "Être informé des annonces importantes et convocations futures.",
    icon: Bell,
  },
];

export default function CandidateSpacePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Portail candidat"
            icon={UserRound}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Espace
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                  Candidat
                </span>
              </>
            }
            description="Bientôt, chaque candidat pourra suivre son inscription, sa discipline, son statut et les prochaines étapes."
          />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GradientButton href="/preselections" icon={Sparkles}>
              S&apos;inscrire aux pré-sélections
            </GradientButton>
            <GradientButton href="/contact" variant="outline" icon={MessageCircle}>
              Contacter l&apos;équipe
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {candidateCards.map((card) => {
            const Icon = card.icon;

            return (
              <PremiumCard
                key={card.title}
                className="p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={27} />
                </div>

                <h2 className="mt-6 text-2xl font-black uppercase leading-tight text-white">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {card.description}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
