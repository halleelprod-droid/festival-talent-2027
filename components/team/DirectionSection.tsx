"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

import {
  directionMembers,
  governanceSteps,
} from "@/data/direction";

type DirectionSectionProps = {
  className?: string;
  showGovernance?: boolean;
};

export default function DirectionSection({
  className = "",
  showGovernance = true,
}: DirectionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="direction-title"
      className={`relative ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
            Niveau 1 · Notre Leadership
          </p>
          <h2
            id="direction-title"
            className="font-display mt-5 text-4xl uppercase leading-none text-white sm:text-6xl"
          >
            Direction <span className="text-yellow-300">Générale</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            La réussite d&apos;un grand projet repose sur une équipe engagée,
            complémentaire et animée par une vision commune.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {directionMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-center shadow-2xl shadow-black/35 backdrop-blur-xl transition duration-500 hover:border-yellow-300/40 hover:bg-yellow-300/[0.06]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.13),transparent_42%)] opacity-70" />
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-yellow-300/35 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.28),transparent_45%),linear-gradient(145deg,#17120a,#050505)] shadow-[0_0_45px_rgba(234,179,8,0.15)]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-3xl font-black text-yellow-200">
                    {member.initials}
                  </span>
                )}
              </div>

              <div className="relative mt-6 flex flex-1 flex-col">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300/80">
                  Direction
                </p>
                <h3 className="mt-3 text-xl font-black uppercase leading-tight text-white">
                  {member.name}
                </h3>
                <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.1em] text-yellow-200">
                  {member.role}
                </p>
                {member.subtitles?.map((subtitle) => (
                  <p key={subtitle} className="mt-1 text-xs font-semibold text-white/55">
                    {subtitle}
                  </p>
                ))}
                <p className="mt-5 text-sm leading-7 text-white/62">
                  {member.biography}
                </p>

                {member.experience && (
                  <ul className="mt-5 space-y-2 text-left text-xs leading-5 text-white/55">
                    {member.experience.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-yellow-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap justify-center gap-2 pt-6">
                  {member.expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-yellow-300/20 bg-yellow-300/[0.07] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-yellow-200/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {showGovernance && <div className="mt-20 rounded-3xl border border-yellow-300/20 bg-[linear-gradient(145deg,rgba(250,204,21,0.07),rgba(255,255,255,0.025))] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <div className="text-center">
            <Sparkles className="mx-auto text-yellow-300" size={24} aria-hidden="true" />
            <h3 className="font-display mt-4 text-3xl uppercase text-white sm:text-4xl">
              Notre Gouvernance
            </h3>
          </div>
          <ol className="mx-auto mt-9 flex max-w-6xl flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-3">
            {governanceSteps.map((step, index) => (
              <li key={step} className="contents">
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.45 }}
                  className="flex min-h-12 w-full max-w-64 items-center justify-center rounded-full border border-white/10 bg-black/35 px-4 text-center text-[10px] font-black uppercase tracking-[0.16em] text-white/78 lg:w-auto lg:min-w-28"
                >
                  {step}
                </motion.div>
                {index < governanceSteps.length - 1 && (
                  <ArrowDown className="shrink-0 text-yellow-300/55 lg:-rotate-90" size={18} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>}
      </div>
    </section>
  );
}
