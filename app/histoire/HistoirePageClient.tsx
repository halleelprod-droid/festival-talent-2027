"use client";

import {
  BadgeCheck,
  Compass,
  Crown,
  Footprints,
  Handshake,
  Heart,
  Lightbulb,
  MapPinned,
  Mic2,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type PromiseCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type TalentStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const promiseCards: PromiseCard[] = [
  {
    title: "Reveler les talents",
    description: "Donner une scene a celles et ceux qui n'ont pas encore ete vus.",
    icon: Sparkles,
  },
  {
    title: "Accompagner les parcours",
    description: "Aider les candidats a progresser avec methode, coaching et confiance.",
    icon: Footprints,
  },
  {
    title: "Creer des opportunites",
    description: "Relier les talents aux scenes, projets, medias et partenaires.",
    icon: Rocket,
  },
  {
    title: "Valoriser les regions",
    description: "Faire exister les talents au-dela des grandes villes et des reseaux habituels.",
    icon: MapPinned,
  },
  {
    title: "Connecter aux partenaires",
    description: "Construire des ponts entre jeunesse, institutions, entreprises et culture.",
    icon: Handshake,
  },
  {
    title: "Inspirer une generation",
    description: "Montrer qu'un parcours peut commencer avec une chance, puis grandir avec du travail.",
    icon: Star,
  },
];

const talentSteps: TalentStep[] = [
  {
    title: "Je decouvre Festival Talent",
    description: "Le talent comprend qu'une opportunite existe pour lui.",
    icon: Compass,
  },
  {
    title: "Je m'inscris",
    description: "Il pose le premier acte concret de son parcours.",
    icon: BadgeCheck,
  },
  {
    title: "Je participe aux pre-selections",
    description: "Il se presente, montre son univers et rencontre l'organisation.",
    icon: Mic2,
  },
  {
    title: "Je rencontre des coachs",
    description: "Il recoit des conseils, une methode et un regard professionnel.",
    icon: Users,
  },
  {
    title: "Je progresse",
    description: "Il travaille, ajuste, gagne en confiance et en discipline.",
    icon: WandSparkles,
  },
  {
    title: "Je monte sur scene",
    description: "Il transforme son potentiel en presence publique.",
    icon: Trophy,
  },
  {
    title: "Je rejoins la communaute",
    description: "Il entre dans un reseau qui continue apres l'evenement.",
    icon: Heart,
  },
  {
    title: "Je deviens une inspiration",
    description: "Son histoire ouvre le chemin a d'autres talents.",
    icon: Crown,
  },
];

const collectiveForces = [
  "Staff",
  "Coachs",
  "Artistes",
  "Partenaires",
  "Benevoles",
  "Candidats",
] as const;

export default function HistoirePageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:82px_82px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Storytelling"
              icon={Heart}
              title={
                <>
                  Notre
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Histoire
                  </span>
                </>
              }
              description="Festival Talent est ne d'une conviction : chaque talent merite une opportunite."
            />

            <p className="mt-8 max-w-4xl text-base leading-8 text-white/68 sm:text-lg">
              Avant d&apos;etre un evenement, Festival Talent est une vision portee
              par la volonte de reveler, accompagner et valoriser les talents.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/vision" icon={Lightbulb}>
                Decouvrir la vision
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                S&apos;inscrire aux pre-selections
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="relative rounded-2xl border border-yellow-300/25 bg-black/30 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.22),transparent_62%)]" />
              <div className="relative">
                <Sparkles className="text-yellow-300" size={36} aria-hidden="true" />
                <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Une opportunite peut changer une trajectoire.
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/65">
                  Festival Talent accompagne avant de recompenser. Le projet
                  donne un cadre, une scene, des rencontres et une communaute.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Pourquoi"
              icon={Compass}
              title="Pourquoi Festival Talent ?"
              description="Dans chaque quartier, chaque region et chaque discipline, il existe des jeunes talents qui manquent parfois de visibilite, d'accompagnement et d'opportunites. Festival Talent veut creer ce pont entre le potentiel, la scene, les coachs, les partenaires et l'avenir."
            />
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-200">
              Initiatrice du projet
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Zairah Diamant Noire
            </h2>
          </PremiumCard>

          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Vision"
              icon={Lightbulb}
              title="La vision de l'initiatrice"
              description="Porte par une vision forte, Festival Talent ambitionne de devenir une plateforme durable de revelation des talents, au Senegal puis a l'international."
            />
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Promesse"
            icon={BadgeCheck}
            title="Notre promesse"
            description="Festival Talent ne cherche pas seulement les meilleurs. Le projet veut aussi reveler ceux que personne n'avait encore remarques."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {promiseCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.045, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {card.description}
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
            eyebrow="Parcours"
            icon={Footprints}
            title="Le parcours d'un talent"
            description="Le visiteur ne decouvre pas seulement une programmation. Il decouvre un chemin possible."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {talentSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                >
                  <PremiumCard
                    tone={index === talentSteps.length - 1 ? "gold" : "default"}
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
        <div className="mx-auto max-w-7xl">
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Collectif"
              icon={Users}
              title="Une aventure collective"
              description="Festival Talent se construit avec celles et ceux qui donnent du temps, de l'expertise, de la scene, de la confiance et des opportunites."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collectiveForces.map((force) => (
                <div
                  key={force}
                  className="rounded-xl border border-white/10 bg-black/25 p-5 text-center text-sm font-black uppercase tracking-[0.18em] text-white/80"
                >
                  {force}
                </div>
              ))}
            </div>
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
              Votre histoire peut commencer ici.
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                S&apos;inscrire
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
