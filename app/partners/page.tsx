'use client';

import { motion } from 'framer-motion';

import {
  sponsorOpportunities,
  partnerStats
} from '@/components/sections/constants';

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="max-w-5xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Sponsors & Investors
          </p>

          <h1
            className="
              mt-8
              text-6xl
              font-black
              leading-[0.9]
              tracking-[-0.07em]
              md:text-8xl
            "
          >
            Build The
            <br />
            Future With Us.
          </h1>

          <p
            className="
              mt-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            FT2027 ouvre ses portes aux marques,
            institutions et partenaires souhaitant
            participer à une nouvelle vision culturelle
            africaine.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partnerStats.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 60
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 1
                }}
                className="
                  glass
                  rounded-[2rem]
                  border
                  border-white/10
                  p-8
                "
              >
                <h2 className="text-5xl font-black text-[#C9A84C]">
                  {item.value}
                </h2>

                <p className="mt-5 text-zinc-400">
                  {item.label}
                </p>
              </motion.div>
            )
          )}
        </div>

        {/* OPPORTUNITIES */}
        <div className="mt-24">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
            Opportunities
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            {sponsorOpportunities.map(
              (item) => (
                <div
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-8
                    py-4
                    text-zinc-300
                  "
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 1
          }}
          className="
            glass
            mt-24
            rounded-[3rem]
            border
            border-white/10
            p-12
            text-center
          "
        >
          <h2 className="text-5xl font-black leading-none md:text-7xl">
            Become
            <br />
            A Partner.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Rejoignez l’expérience FT2027 et participez
            à la création d’un événement culturel
            international nouvelle génération.
          </p>

          <button
            className="
              mt-12
              rounded-full
              bg-[#C9A84C]
              px-10
              py-5
              font-semibold
              text-black
              transition
              hover:scale-105
              hover:shadow-[0_0_35px_rgba(201,168,76,0.45)]
            "
          >
            Contact Partnership
          </button>
        </motion.div>
      </div>
    </main>
  );
}