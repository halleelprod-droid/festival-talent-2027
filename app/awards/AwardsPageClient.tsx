"use client";

import {
  Award,
  BadgeCheck,
  Crown,
  Gem,
  Handshake,
  HeartHandshake,
  Medal,
  Mic2,
  Palette,
  Rocket,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type AwardCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type SelectionStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const awardCategories: AwardCategory[] = [
  {
    title: "Meilleur Talent Danse",
    description: "Celebrer l'energie, la technique et l'identite choregraphique.",
    icon: Trophy,
  },
  {
    title: "Meilleur Talent Musique",
    description: "Recompenser la voix, la scene, l'ecriture et l'univers sonore.",
    icon: Mic2,
  },
  {
    title: "Meilleur Talent Mode",
    description: "Valoriser la silhouette, la vision, le style et la creation.",
    icon: Crown,
  },
  {
    title: "Meilleur Talent Peinture / Design",
    description: "Mettre en lumiere les arts visuels, le geste et l'imaginaire.",
    icon: Palette,
  },
  {
    title: "Meilleur Talent Influence",
    description: "Honorer les createurs qui rassemblent et inspirent leur communaute.",
    icon: Sparkles,
  },
  {
    title: "Meilleur Talent Entrepreneuriat",
    description: "Distinguer les projets utiles, ambitieux et capables de durer.",
    icon: Rocket,
  },
  {
    title: "Prix Revelation",
    description: "Faire emerger une voix que le public n'avait pas encore remarquee.",
    icon: Star,
  },
  {
    title: "Prix du Public",
    description: "Donner une place au choix, a l'emotion et a l'adhesion du public.",
    icon: ThumbsUp,
  },
  {
    title: "Prix du Jury",
    description: "Recompenser l'excellence selon des criteres artistiques exigeants.",
    icon: BadgeCheck,
  },
  {
    title: "Prix de l'Impact",
    description: "Celebrer un talent dont le parcours inspire et transforme autour de lui.",
    icon: HeartHandshake,
  },
  {
    title: "Prix du Mentor",
    description: "Honorer celles et ceux qui transmettent, guident et elevent.",
    icon: Users,
  },
  {
    title: "Prix Partenaire Batisseur",
    description: "Remercier les structures qui construisent l'avenir avec le festival.",
    icon: Handshake,
  },
];

const selectionSteps: SelectionStep[] = [
  {
    title: "Preselections",
    description: "Les talents entrent dans le parcours officiel.",
    icon: BadgeCheck,
  },
  {
    title: "Coaching",
    description: "Les candidats progressent avec des professionnels.",
    icon: WandSparkles,
  },
  {
    title: "Evaluation",
    description: "Les prestations sont observees avec rigueur.",
    icon: Medal,
  },
  {
    title: "Finale",
    description: "Les meilleurs talents montent sur la grande scene.",
    icon: Trophy,
  },
  {
    title: "Vote du public",
    description: "Le public accompagne l'emotion et la reconnaissance.",
    icon: ThumbsUp,
  },
  {
    title: "Ceremonie Awards",
    description: "Les parcours sont celebres dans un moment prestigieux.",
    icon: Award,
  },
];

export default function AwardsPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.16),transparent_32%),linear-gradient(to_bottom,#000,rgba(13,10,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:82px_82px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Ceremonie future"
              icon={Award}
              title={
                <>
                  Festival Talent
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    Awards
                  </span>
                </>
              }
              description="Celebrer les talents, les parcours, les coachs, les partenaires et les batisseurs du Festival Talent."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="#categories" icon={Trophy}>
                Decouvrir les categories
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                Voir les pre-selections
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-8">
            <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center rounded-full border border-yellow-300/25 bg-black/35">
              <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.22),transparent_62%)] blur-sm" />
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-yellow-300/35 bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-600 text-black shadow-2xl shadow-yellow-900/40"
              >
                <Trophy size={82} strokeWidth={1.6} aria-hidden="true" />
              </motion.div>
              {[0, 1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.15, 0.9] }}
                  transition={{
                    duration: 2.8,
                    delay: item * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute h-3 w-3 rounded-full bg-yellow-200 ${
                    item === 0
                      ? "left-12 top-14"
                      : item === 1
                        ? "right-14 top-20"
                        : item === 2
                          ? "bottom-14 left-20"
                          : "bottom-20 right-12"
                  }`}
                />
              ))}
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section id="categories" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Categories"
            icon={Gem}
            title="Les distinctions"
            description="Les Awards preparent une reconnaissance durable pour les talents, les mentors et les partenaires qui font grandir l'ecosysteme."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {awardCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.035, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {category.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {category.description}
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
          <SectionHeader
            eyebrow="Selection"
            icon={Medal}
            title="Processus de selection"
            description="Un parcours clair, progressif et transparent, de la pre-selection jusqu'a la ceremonie Festival Talent Awards."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-6">
            {selectionSteps.map((step, index) => {
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
                    tone={index === selectionSteps.length - 1 ? "gold" : "default"}
                    className="h-full p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-600 text-black">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                      Etape {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-black uppercase text-white">
                      {step.title}
                    </h3>
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

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Jury"
              icon={Users}
              title="Jury"
              description="Les membres du jury seront annonces progressivement."
            />
          </PremiumCard>

          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Laureats"
              icon={Crown}
              title="Laureats"
              description="Les premiers laureats seront reveles a l'issue des grandes finales Festival Talent 2027."
            />
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <Star size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Le prochain laureat pourrait etre vous.
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                S&apos;inscrire aux pre-selections
              </GradientButton>
              <GradientButton href="/activites" variant="outline" icon={Rocket}>
                Decouvrir les activites
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
