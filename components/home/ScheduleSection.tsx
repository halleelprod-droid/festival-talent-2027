"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Mic2,
  Palette,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const programmePhases = [
  {
    label: "Avant janvier 2027",
    title: "Pré-sélections officielles",
    location: "Talents en sélection",
    description:
      "Détection des jeunes talents dans plusieurs disciplines avant la tournée européenne.",
    items: [
      "Danse",
      "Musique",
      "Mode",
      "Art",
      "Entrepreneuriat",
      "Technologie",
      "Culture urbaine",
      "Sports mécaniques",
    ],
  },
  {
    label: "Janvier — Février 2027",
    title: "Talent Showcase Paris",
    location: "Paris",
    description:
      "Showcases, panels, rencontres partenaires, networking créatif et mise en lumière des talents sélectionnés.",
    items: [
      "Showcases jeunes talents",
      "Panels culture & entrepreneuriat",
      "Networking créatif",
      "Rencontres partenaires",
    ],
  },
  {
    label: "Mars — Avril 2027",
    title: "Leadership & Excellence Rome",
    location: "Rome",
    description:
      "Panels coachs de vie, conférences leadership, performances sélectionnées et rencontres jeunesse.",
    items: [
      "Talent Talks",
      "Panels coaching",
      "Conférences leadership",
      "Networking international",
    ],
  },
];

const disciplines = [
  { name: "Danse", icon: Zap },
  { name: "Musique", icon: Mic2 },
  { name: "Mode", icon: Sparkles },
  { name: "Art", icon: Palette },
  { name: "Entrepreneuriat", icon: Rocket },
  { name: "Technologie", icon: Globe2 },
  { name: "Culture urbaine", icon: Users },
  { name: "Sports mécaniques", icon: Trophy },
];

export default function ScheduleSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-20 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.035]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <CalendarDays size={16} />
            Programme officiel
          </div>

          <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl">
            Paris & Rome
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Janvier — Avril 2027
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 prépare une tournée européenne entre Paris et
            Rome, précédée par des pré-sélections officielles pour révéler les
            talents dans la danse, la musique, la mode, l’art,
            l’entrepreneuriat, la technologie, la culture urbaine et les sports
            mécaniques.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon;

            return (
              <motion.div
                key={discipline.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
              >
                <Icon className="mb-4 text-yellow-300" size={24} />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                  {discipline.name}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {programmePhases.map((phase, index) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                  {phase.label}
                </p>

                <h3 className="mt-4 text-3xl font-black uppercase text-white">
                  {phase.title}
                </h3>

                <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-white/55">
                  {phase.location}
                </p>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  {phase.description}
                </p>

                <div className="mt-7 space-y-3">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-3"
                    >
                      <CheckCircle2 size={16} className="text-yellow-300" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/programme"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-black uppercase tracking-wide text-black shadow-[0_0_25px_rgba(201,168,76,0.35)] transition duration-300 hover:scale-105 hover:bg-white"
          >
            Voir le programme complet
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}