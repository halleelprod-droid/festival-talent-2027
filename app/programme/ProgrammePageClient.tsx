"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Crown,
  Flag,
  Globe2,
  Mic2,
  Palette,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const phases = [
  {
    period: "Avant janvier 2027",
    city: "Pré-sélections",
    title: "Détection des talents",
    theme: "Danse • Musique • Mode • Art • Innovation",
    color: "#C9A84C",
    description:
      "Une phase dédiée à l’identification des jeunes talents dans plusieurs disciplines avant la tournée européenne.",
    events: [
      "Pré-sélections danse",
      "Pré-sélections musique",
      "Casting mode & stylistes",
      "Sélection artistes visuels",
      "Sélection projets entrepreneuriaux",
      "Talents tech & innovation",
      "Culture urbaine",
      "Sports mécaniques",
    ],
  },
  {
    period: "Janvier — Février 2027",
    city: "Paris",
    title: "Talent Showcase Paris",
    theme: "Culture • Réseau • Jeunesse • Création",
    color: "#FFFFFF",
    description:
      "Une première séquence européenne pour présenter les talents, créer des connexions et ouvrir le festival à un réseau international.",
    events: [
      "Showcases jeunes talents",
      "Panels culture & entrepreneuriat",
      "Rencontres partenaires",
      "Networking créatif",
      "Présentations de projets",
      "Sessions média",
    ],
  },
  {
    period: "Mars — Avril 2027",
    city: "Rome",
    title: "Leadership & Excellence Rome",
    theme: "Panels • Coaching • Motivation • Excellence",
    color: "#22C55E",
    description:
      "Une phase orientée leadership, conférences, coaching, motivation et valorisation des talents sélectionnés.",
    events: [
      "Talent Talks",
      "Panels coachs de vie",
      "Conférences leadership",
      "Performances sélectionnées",
      "Rencontres jeunesse",
      "Networking international",
    ],
  },
  {
    period: "Avril 2027",
    city: "Finalisation",
    title: "Sélection finale",
    theme: "Mise en lumière • Accompagnement • Prochaines étapes",
    color: "#F97316",
    description:
      "Une dernière étape pour consolider les sélections, préparer la mise en avant des talents et structurer les suites du projet.",
    events: [
      "Annonce des talents retenus",
      "Mise en avant officielle",
      "Préparation média",
      "Accompagnement des profils sélectionnés",
      "Préparation partenaires",
      "Prochaines étapes Festival Talent",
    ],
  },
];

const disciplines = [
  {
    name: "Danse",
    icon: Zap,
  },
  {
    name: "Musique",
    icon: Mic2,
  },
  {
    name: "Mode",
    icon: Crown,
  },
  {
    name: "Art",
    icon: Palette,
  },
  {
    name: "Entrepreneuriat",
    icon: Rocket,
  },
  {
    name: "Technologie",
    icon: Globe2,
  },
  {
    name: "Culture urbaine",
    icon: Users,
  },
  {
    name: "Sports mécaniques",
    icon: Trophy,
  },
];

export default function ProgrammePageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-20 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute -left-36 bottom-32 h-[460px] w-[460px] rounded-full bg-yellow-400/10 blur-[130px]" />
      <div className="absolute -right-36 top-52 h-[460px] w-[460px] rounded-full bg-orange-500/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.035]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <CalendarDays size={16} />
            Programme officiel
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl">
            Paris & Rome
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Janvier — Avril 2027
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 prépare une tournée européenne entre Paris et
            Rome, avec des pré-sélections officielles pour révéler les talents
            dans la danse, la musique, la mode, l’art, l’entrepreneuriat, la
            technologie, la culture urbaine et les sports mécaniques.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.12] via-white/[0.05] to-white/[0.02] p-8 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl lg:p-12"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                <Sparkles size={15} />
                Pré-sélections en cours
              </p>

              <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
                Révéler les talents avant la scène européenne.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/65">
                Avant les rendez-vous de Paris et Rome, Festival Talent 2027
                organisera des pré-sélections afin d’identifier, accompagner et
                mettre en lumière les meilleurs profils dans chaque discipline.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {disciplines.map((discipline, index) => {
                const Icon = discipline.icon;

                return (
                  <motion.div
                    key={discipline.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5"
                  >
                    <Icon className="mb-4 text-yellow-300" size={24} />
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                      {discipline.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-20 space-y-8">
          {phases.map((phase, index) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.05] md:p-10"
            >
              <div
                className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${phase.color}20, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-4">
                      <div
                        className="h-3 w-3 rounded-full shadow-[0_0_18px_rgba(250,204,21,0.8)]"
                        style={{ backgroundColor: phase.color }}
                      />

                      <p
                        className="text-sm font-black uppercase tracking-[0.35em]"
                        style={{ color: phase.color }}
                      >
                        {phase.city}
                      </p>
                    </div>

                    <h2 className="mt-6 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                      {phase.title}
                    </h2>

                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                      {phase.period}
                    </p>

                    <p className="mt-5 text-base leading-8 text-white/65">
                      {phase.description}
                    </p>
                  </div>

                  <div className="w-full max-w-xl rounded-[1.8rem] border border-white/10 bg-black/35 p-6">
                    <p
                      className="text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: phase.color }}
                    >
                      Thème
                    </p>

                    <h3 className="mt-3 text-2xl font-black uppercase text-white">
                      {phase.theme}
                    </h3>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {phase.events.map((event) => (
                    <div
                      key={event}
                      className="flex items-center gap-4 rounded-full border border-white/10 bg-black/35 px-6 py-4"
                    >
                      <CheckCircle2
                        size={18}
                        style={{ color: phase.color }}
                      />
                      <p className="text-sm text-white/70">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 text-center backdrop-blur-xl"
        >
          <Flag className="mx-auto text-yellow-300" size={34} />

          <h3 className="mt-5 text-2xl font-black uppercase text-white">
            Les détails officiels seront annoncés progressivement
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Les lieux précis, dates détaillées, modalités d’inscription et
            critères de pré-sélection seront communiqués via les canaux
            officiels du Festival Talent 2027.
          </p>
        </motion.div>
      </section>
    </main>
  );
}