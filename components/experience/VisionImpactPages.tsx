"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe2, Rocket, Sparkles, Trophy } from "lucide-react";

import { impactObjectives, impactTrustPillars, visionPillars } from "@/data/experience";

export function VisionPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />
      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Sparkles size={16} aria-hidden="true" />
              Notre vision
            </p>
            <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Pourquoi Festival Talent existe ?
            </h1>
            <p className="mt-8 max-w-4xl text-base leading-8 text-white/68 sm:text-lg">
              Festival Talent existe pour transformer l&apos;espoir en parcours :
              donner aux jeunes talents un cadre, une scene, un reseau et une
              vision plus grande qu&apos;un seul evenement.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visionPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <Icon className="text-yellow-300" size={30} aria-hidden="true" />
                <h2 className="mt-6 text-3xl font-black uppercase text-white">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 pb-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-lg border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <Globe2 className="mx-auto text-yellow-300" size={38} aria-hidden="true" />
          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            L&apos;Afrique moderne a besoin de scenes, de methodes et de confiance.
          </h2>
          <div className="mt-10">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]"
            >
              Rejoindre le mouvement
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ImpactPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />
      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Trophy size={16} aria-hidden="true" />
              Notre Impact
            </p>
            <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Objectifs 2030
            </h1>
            <p className="mt-8 max-w-4xl text-base leading-8 text-white/68 sm:text-lg">
              Festival Talent veut rendre son impact lisible : jeunes
              accompagnes, regions representees, disciplines valorisees,
              partenaires engages et benevoles mobilises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {impactObjectives.map((objective, index) => (
            <motion.article
              key={objective.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <p className="text-5xl font-black uppercase text-white">
                {objective.value}
              </p>
              <h2 className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                {objective.label}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/62">
                {objective.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-lg border border-yellow-400/25 bg-yellow-400/[0.08] p-8 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Rocket className="text-yellow-300" size={36} aria-hidden="true" />
              <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-5xl">
                Mesurer pour durer.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/65">
                L&apos;impact futur devra etre documente, verifie et partage avec les
                partenaires afin de construire une institution durable.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {impactTrustPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="rounded-lg border border-white/10 bg-black/35 p-5">
                    <Icon className="text-yellow-300" size={24} aria-hidden="true" />
                    <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-white/80">
                      {pillar.title}
                    </p>
                  </div>
                );
              })}
              <div className="rounded-lg border border-yellow-400/25 bg-yellow-400/10 p-5">
                <BadgeCheck className="text-yellow-300" size={24} aria-hidden="true" />
                <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-white/80">
                  Objectifs 2030
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
