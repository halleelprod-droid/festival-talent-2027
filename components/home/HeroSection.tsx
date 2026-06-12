"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe2, CalendarDays } from "lucide-react";

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/previous/scene.jpg"
        alt="Festival Talent 2027 - scène et ambiance festival"
        fill
        sizes="100vw"
        priority
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />

      {/* OPTIONAL VIDEO */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.72),#000)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_38%)]" />
      <div className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[170px]" />
      <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[120px]" />

      {/* LIGHT BEAMS */}
      <motion.div
        animate={{ opacity: [0.18, 0.35, 0.18], rotate: [-8, -3, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[12%] top-0 h-[120%] w-28 origin-top -rotate-6 bg-gradient-to-b from-yellow-300/20 via-yellow-300/5 to-transparent blur-2xl"
      />

      <motion.div
        animate={{ opacity: [0.12, 0.28, 0.12], rotate: [10, 5, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[16%] top-0 h-[120%] w-24 origin-top rotate-6 bg-gradient-to-b from-yellow-400/20 via-yellow-400/5 to-transparent blur-2xl"
      />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.05]" />

      {/* FLOATING PARTICLES */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(18)].map((_, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -24, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3 + index * 0.12,
              repeat: Infinity,
              delay: index * 0.18,
              ease: "easeInOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-yellow-300/70 shadow-[0_0_18px_rgba(250,204,21,0.8)]"
            style={{
              left: `${8 + ((index * 13) % 84)}%`,
              top: `${18 + ((index * 17) % 68)}%`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-6xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            Pré-sélections officielles
          </motion.div>

          <p className="text-xs font-bold uppercase tracking-[0.55em] text-white/45 sm:text-sm">
            Paris • Rome • Europe 2027
          </p>

          <h1 className="mt-8 text-6xl font-black uppercase leading-[0.78] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem]">
            Festival
            <span className="block">Talent</span>
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-orange-700 bg-clip-text text-transparent">
              2027
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-4xl text-base leading-8 text-white/70 sm:text-lg md:text-xl">
            Révélons les talents, construisons l’avenir. Festival Talent 2027
            prépare une tournée européenne entre Paris et Rome, précédée par des
            pré-sélections officielles en danse, musique, mode, art,
            entrepreneuriat, technologie, culture urbaine et sports mécaniques.
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/tickets"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#C9A84C] px-10 py-5 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_35px_rgba(201,168,76,0.35)] transition duration-300 hover:scale-105 hover:bg-white hover:text-black sm:w-auto"
            >
              Réserver
              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/programme"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#C9A84C]/50 bg-black/50 px-10 py-5 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-black sm:w-auto"
            >
              Voir le programme
            </Link>

            <Link
              href="/partners"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-10 py-5 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-black sm:w-auto"
            >
              Devenir partenaire
            </Link>
          </div>

          {/* MINI CARDS */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-xl"
            >
              <CalendarDays className="mb-3 text-yellow-300" size={24} />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                Programme
              </p>

              <p className="mt-2 text-sm text-white/65">
                Pré-sélections, showcases, panels, networking et expériences
                live.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-xl"
            >
              <Sparkles className="mb-3 text-yellow-300" size={24} />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                Talents
              </p>

              <p className="mt-2 text-sm text-white/65">
                Une plateforme pour artistes, créateurs, entrepreneurs et jeunes
                leaders.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-xl"
            >
              <Globe2 className="mb-3 text-yellow-300" size={24} />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                International
              </p>

              <p className="mt-2 text-sm text-white/65">
                Une vision internationale portée entre Paris, Rome, l’Afrique et
                l’Europe.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}