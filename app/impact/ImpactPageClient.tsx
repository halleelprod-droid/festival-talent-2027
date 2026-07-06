"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPinned,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type ImpactGoal = {
  value: string;
  label: string;
  description: string;
};

type ImpactAxis = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const impactGoals: ImpactGoal[] = [
  {
    value: "1000",
    label: "talents accompagnes",
    description: "Objectif progressif pour structurer un vrai parcours d'accompagnement.",
  },
  {
    value: "14",
    label: "regions representees",
    description: "Une ambition nationale pour aller au-dela des grandes villes.",
  },
  {
    value: "10",
    label: "disciplines valorisees",
    description: "Danse, musique, mode, art, digital, innovation et plus encore.",
  },
  {
    value: "50",
    label: "partenaires mobilises",
    description: "Un ecosysteme public, prive, culturel, media et institutionnel.",
  },
  {
    value: "100",
    label: "coachs et mentors vises",
    description: "Des professionnels pour transmettre, orienter et faire progresser.",
  },
  {
    value: "100 000",
    label: "personnes touchees",
    description: "Audience, candidats, familles, communautes, medias et partenaires.",
  },
];

const impactAxes: ImpactAxis[] = [
  {
    title: "Jeunesse",
    description: "Donner aux jeunes un cadre, une scene, des reperes et de la confiance.",
    icon: Users,
  },
  {
    title: "Culture",
    description: "Valoriser les disciplines artistiques et les expressions contemporaines.",
    icon: Sparkles,
  },
  {
    title: "Entrepreneuriat",
    description: "Encourager les projets creatifs capables de devenir durables.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Inclusion",
    description: "Ouvrir les opportunites aux talents au-dela des reseaux habituels.",
    icon: HeartHandshake,
  },
  {
    title: "Formation",
    description: "Faire progresser les talents par le coaching, le mentorat et la methode.",
    icon: GraduationCap,
  },
  {
    title: "Emploi",
    description: "Connecter culture, competences, metiers et economie creative.",
    icon: TrendingUp,
  },
  {
    title: "Innovation",
    description: "Associer art, digital, medias, technologie et nouveaux usages.",
    icon: Lightbulb,
  },
  {
    title: "Rayonnement international",
    description: "Construire une image moderne, ambitieuse et professionnelle de l'Afrique.",
    icon: Globe2,
  },
];

const impactPartners = [
  "Union Europeenne",
  "PIN EVENTS",
  "Agence Diassnor",
  "Centre Culturel Blaise Senghor",
  "Sen Influenceurs",
  "Universal Selfcare",
  "Mano Perfetto",
  "H & Hair",
] as const;

export default function ImpactPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:80px_80px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Impact institutionnel"
              icon={TrendingUp}
              title={
                <>
                  Notre
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Impact
                  </span>
                </>
              }
              description="Festival Talent 2027 agit pour reveler, accompagner et connecter les talents tout en creant des opportunites durables pour la jeunesse."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                Decouvrir les pre-selections
              </GradientButton>
              <GradientButton href="/sponsors" variant="outline" icon={Handshake}>
                Devenir partenaire
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-200">
                  Objectifs de developpement
                </p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Mesurer ce que Festival Talent construit.
                </h2>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/35 bg-black/35 text-yellow-200">
                <Landmark size={31} aria-hidden="true" />
              </div>
            </div>
            <p className="mt-7 text-sm leading-8 text-white/65">
              Une plateforme culturelle durable doit prouver son utilite :
              impact social, culturel, economique et humain.
            </p>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Pourquoi"
              icon={BadgeCheck}
              title="Pourquoi l'impact compte"
              description="Festival Talent ne se limite pas a l'organisation d'evenements. Le projet vise a creer un impact concret sur la jeunesse, les regions, les disciplines artistiques, l'entrepreneuriat, la culture et l'economie creative."
            />
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Objectifs"
            icon={Rocket}
            title="Objectifs d'impact"
            description="Ces chiffres representent des objectifs de developpement progressifs."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {impactGoals.map((goal, index) => (
              <motion.article
                key={goal.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <PremiumCard
                  tone={index === 0 || index === 5 ? "gold" : "default"}
                  className="h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35"
                >
                  <motion.p
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.04, duration: 0.45 }}
                    className="text-5xl font-black uppercase text-white"
                  >
                    {goal.value}
                  </motion.p>
                  <h2 className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                    {goal.label}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {goal.description}
                  </p>
                </PremiumCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Axes"
            icon={Lightbulb}
            title="Axes d'impact"
            description="Festival Talent agit a la croisee de la culture, de l'education, de l'innovation et de l'economie creative."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {impactAxes.map((axis, index) => {
              const Icon = axis.icon;

              return (
                <motion.article
                  key={axis.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.04, duration: 0.45 }}
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
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Regions"
              icon={MapPinned}
              title="Impact regional"
              description="Festival Talent souhaite toucher toutes les regions du Senegal afin de donner une chance aux talents au-dela des grandes villes."
            />
          </PremiumCard>

          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Partenaires"
              icon={Handshake}
              title="Impact partenaires"
              description="Chaque partenaire devient un batisseur d'opportunites pour la jeunesse."
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {impactPartners.map((partner) => (
                <div
                  key={partner}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm font-black uppercase tracking-[0.12em] text-white/80"
                >
                  {partner}
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
              <Handshake size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Construisons l&apos;impact ensemble.
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/sponsors" icon={Handshake}>
                Devenir partenaire
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                S&apos;inscrire
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
