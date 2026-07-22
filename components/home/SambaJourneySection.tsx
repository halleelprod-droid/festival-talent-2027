"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sambaJourneyEvents } from "@/data/season-2026-2027";

const ACTS = ["Acte I · Danse", "Acte II · Peinture", "Acte III · Lutte", "Acte IV · Méga concert"];

export default function SambaJourneySection() {
  const reduceMotion = useReducedMotion();
  return (
    <section aria-labelledby="samba-journey-title" className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[.3em] text-yellow-300">Une saison avec Samba Peuzzi</p>
        <h2 id="samba-journey-title" className="font-display mt-5 text-balance text-4xl uppercase sm:text-6xl">Quatre actes, une même énergie</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">De septembre à décembre 2026, la saison avance acte après acte : la danse ouvre le parcours, la peinture et la lutte prolongent l’élan, et le méga concert clôt la progression.</p>
        <ol className="relative mt-14 grid gap-6 lg:grid-cols-4">
          <span aria-hidden="true" className="pointer-events-none absolute left-[10%] right-[10%] top-5 hidden h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent lg:block" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-yellow-300/70 via-white/15 to-transparent lg:hidden" />
          {sambaJourneyEvents.map((event, index) => (
            <motion.li key={event.id} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index * .08 }} className="relative rounded-3xl border border-white/10 bg-white/[.04] p-6 pl-16 lg:pl-6">
              <span className="absolute left-3 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 font-black text-black lg:static lg:mb-5">{index + 1}</span>
              <p className="text-[11px] font-black uppercase tracking-[.2em] text-yellow-200">{ACTS[index]}</p>
              <p className="mt-3 font-black text-yellow-300">{event.date}</p>
              <h3 className="mt-2 text-xl font-black">{event.title}</h3>
              <p className="mt-2 text-sm text-white/60">{event.location}</p>
              <span className="mt-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] text-yellow-200">Avec Samba Peuzzi</span>
              <Link href={`#${event.id}`} className="mt-5 block text-sm font-bold underline decoration-yellow-300 underline-offset-4 hover:text-yellow-300">Voir ce rendez-vous</Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
