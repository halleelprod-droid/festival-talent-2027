"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sambaJourneyEvents } from "@/data/season-2026-2027";

export default function FeaturedArtistSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section aria-labelledby="featured-artist-title" className="section-cinema relative overflow-hidden bg-[#070604] px-5 py-16 text-white sm:px-6 sm:py-20 lg:px-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(201,168,76,.22),transparent_32%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Intro : badge, titre, texte court */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-start-1 lg:row-start-1"
        >
          <p className="text-[11px] font-black uppercase tracking-[.28em] text-yellow-300">Artiste phare — Deuxième édition</p>
          <h2 id="featured-artist-title" className="font-display mt-5 text-balance text-4xl uppercase leading-[.95] sm:text-6xl lg:text-7xl">Samba Peuzzi,<span className="block text-yellow-300">au cœur de la saison</span></h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">Pour sa deuxième édition, le Festival Talent accueille Samba Peuzzi comme artiste phare d’une saison consacrée à la révélation et à la jeunesse sénégalaise.</p>
        </motion.div>

        {/* Portrait + dates (colonne droite sur desktop, sous le titre sur mobile) */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-yellow-300/20 bg-black/40 sm:aspect-[3/4] lg:aspect-auto lg:min-h-[560px]">
            <span aria-hidden="true" className="absolute -left-3 top-0 z-0 font-display text-[9rem] leading-none text-white/[.06] sm:text-[14rem] lg:text-[20rem]">02</span>
            <Image src="/images/artists/samba-peuzzi-hero.webp" alt="Samba Peuzzi, artiste phare de la deuxième édition du Festival Talent" fill sizes="(max-width: 1024px) 100vw, 48vw" quality={80} className="z-10 object-cover" style={{ objectPosition: "50% 12%" }} />
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sambaJourneyEvents.map((event) => (
              <li key={event.id} className="rounded-2xl border border-white/10 bg-white/[.04] p-3">
                <span className="block text-sm font-bold text-yellow-300">{event.date}</span>
                <span className="mt-1 block text-xs leading-5 text-white/70">{event.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signature + CTA (bas-gauche desktop, dernier bloc mobile) */}
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="border-l-2 border-yellow-300 pl-5"><p className="text-xl font-black tracking-[.12em] sm:text-2xl">SAMBA PEUZZI</p><p className="mt-1 text-sm text-white/60">Artiste phare de la deuxième édition</p></div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="#programme" className="inline-flex w-full items-center justify-center rounded-full bg-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[.12em] text-black transition hover:bg-yellow-200 sm:w-auto">Voir la programmation</Link>
            <Link href="#samba-journey-title" className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-black uppercase tracking-[.12em] text-white transition hover:border-yellow-300 hover:text-yellow-300 sm:w-auto">Le parcours de Samba</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
