'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

export default function CinematicReel() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* BG IMAGE */}
      <img
        src="/images/hero.jpg"
        alt="FT2027"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          scale-105
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 hero-gradient" />

      {/* LIGHT */}
      <div className="hero-light" />

      {/* NOISE */}
      <div className="noise" />

      {/* GOLD GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-[180px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 80
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1.2
          }}
          viewport={{
            once: true
          }}
          className="max-w-6xl"
        >
          {/* TOP */}
          <p className="text-sm uppercase tracking-[0.5em] text-[#C9A84C]">
            FT2027 EXPERIENCE
          </p>

          {/* TITLE */}
          <h2
            className="
              mt-10
              text-6xl
              font-black
              leading-[0.9]
              tracking-[-0.08em]
              md:text-8xl
              lg:text-[10rem]
            "
          >
            The Future
            <br />
            Of African
            <br />
            Culture.
          </h2>

          {/* TEXT */}
          <p
            className="
              mt-10
              max-w-3xl
              text-xl
              leading-relaxed
              text-zinc-300
            "
          >
            Festival Talent 2027 connecte musique,
            mode, innovation, jeunesse et culture
            dans une expérience immersive
            internationale entre l’Afrique et l’Europe.
          </p>

          {/* BUTTONS */}
          <div className="mt-14 flex flex-wrap gap-5">
            <Link href="/tickets">
              <button
                className="
                  gold-glow
                  rounded-full
                  bg-[#C9A84C]
                  px-10
                  py-5
                  font-semibold
                  text-black
                  transition
                  hover:scale-105
                "
              >
                Réserver maintenant
              </button>
            </Link>

            <Link href="/partners">
              <button
                className="
                  glass
                  rounded-full
                  border
                  border-white/10
                  px-10
                  py-5
                  text-white
                  transition
                  hover:border-[#C9A84C]
                "
              >
                Devenir partenaire
              </button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-24 grid gap-10 md:grid-cols-4">
            {[
              {
                value: '50K+',
                label: 'Participants'
              },

              {
                value: '20+',
                label: 'Artistes'
              },

              {
                value: '4 Days',
                label: 'Experience'
              },

              {
                value: 'Global',
                label: 'Audience'
              }
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-5xl font-black text-[#C9A84C]">
                  {item.value}
                </h3>

                <p className="mt-3 uppercase tracking-[0.25em] text-zinc-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}