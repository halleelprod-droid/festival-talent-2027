"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Handshake,
  Megaphone,
  Mic2,
  Palette,
  Rocket,
  Shirt,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type AcademyAxis = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AcademyStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const academyAxes: AcademyAxis[] = [
  {
    title: "Coaching",
    description: "A terme, aider les talents a progresser avec des retours structures.",
    icon: Target,
  },
  {
    title: "Masterclass",
    description: "Notre vision : creer des rencontres ponctuelles avec des professionnels.",
    icon: GraduationCap,
  },
  {
    title: "Leadership",
    description: "Developper la confiance, la posture et la capacite a porter une vision.",
    icon: Trophy,
  },
  {
    title: "Communication",
    description: "Apprendre demain a mieux presenter son histoire, son projet et son univers.",
    icon: Megaphone,
  },
  {
    title: "Management artistique",
    description: "Imaginer des bases pour mieux organiser une carriere et une equipe.",
    icon: Users,
  },
  {
    title: "Business",
    description: "Donner des reperes futurs sur modeles, contrats, valeur et strategie.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Marketing Digital",
    description: "Aider les talents a comprendre audience, contenu, image et plateformes.",
    icon: TrendingUp,
  },
  {
    title: "Entrepreneuriat",
    description: "Transformer les idees creatives en projets plus solides et durables.",
    icon: Rocket,
  },
  {
    title: "Danse",
    description: "Valoriser la technique, l'identite, la scene et la discipline choregraphique.",
    icon: Sparkles,
  },
  {
    title: "Musique",
    description: "Accompagner la voix, l'ecriture, la presence et l'univers artistique.",
    icon: Mic2,
  },
  {
    title: "Mode",
    description: "Soutenir une vision future autour du style, de la silhouette et de la creation.",
    icon: Shirt,
  },
];

const progressionSteps: AcademyStep[] = [
  {
    title: "Decouverte",
    description: "Le candidat identifie son potentiel et les axes a renforcer.",
    icon: Sparkles,
  },
  {
    title: "Coaching",
    description: "Il recoit des retours, des methodes et une direction de travail.",
    icon: Target,
  },
  {
    title: "Mentorat",
    description: "Il rencontre des professionnels capables de guider son parcours.",
    icon: Handshake,
  },
  {
    title: "Opportunites",
    description: "Il se connecte progressivement a des scenes, projets et partenaires.",
    icon: CalendarDays,
  },
  {
    title: "Carriere",
    description: "Il transforme son talent en trajectoire plus durable.",
    icon: Trophy,
  },
];

export default function AcademyPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:82px_82px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              <BadgeCheck size={15} aria-hidden="true" />
              Vision future - programmes non annonces
            </p>

            <SectionHeader
              eyebrow="Festival Talent Academy"
              icon={GraduationCap}
              title={
                <>
                  Academy
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Future
                  </span>
                </>
              }
              description="Une vision d'accompagnement pour aider les talents a progresser, se structurer et saisir de futures opportunites."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/mentors" icon={Users}>
                Decouvrir les coachs
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                Preparer ma candidature
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="relative rounded-2xl border border-yellow-300/25 bg-black/30 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.22),transparent_62%)]" />
              <div className="relative">
                <GraduationCap className="text-yellow-300" size={40} aria-hidden="true" />
                <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Accompagner avant de recompenser.
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/65">
                  Cette page presente les futurs axes possibles de l&apos;Academy.
                  Elle ne promet pas encore de formations actives.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Axes"
            icon={Palette}
            title="Futurs axes d'accompagnement"
            description="Ces axes structurent une vision possible pour aider les candidats a progresser dans leur discipline, leur image et leur projet."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {academyAxes.map((axis, index) => {
              const Icon = axis.icon;

              return (
                <motion.article
                  key={axis.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.035, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {axis.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {axis.description}
                    </p>
                  </PremiumCard>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Progression"
            icon={Rocket}
            title="Le candidat progresse"
            description="L'Academy est imaginee comme un parcours graduel : comprendre, travailler, etre guide, acceder a des opportunites, puis construire une carriere."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {progressionSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <PremiumCard
                    tone={index === progressionSteps.length - 1 ? "gold" : "default"}
                    className="h-full p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-600 text-black">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                      Etape {index + 1}
                    </p>
                    <h2 className="mt-2 text-lg font-black uppercase text-white">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      {step.description}
                    </p>
                  </PremiumCard>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <GraduationCap size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Preparons les talents a durer.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              La vision Academy pourra evoluer progressivement avec les coachs,
              les partenaires et les besoins reels des candidats.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/mentors" icon={Users}>
                Decouvrir les coachs
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                Preparer ma candidature
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
