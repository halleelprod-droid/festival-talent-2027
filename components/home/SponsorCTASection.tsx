'use client';

import { motion } from 'framer-motion';

import {
  sponsorOpportunities
} from '@/components/sections/constants';

export default function SponsorCTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C9A84C]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{ once: true }}
          className="
            glass
            overflow-hidden
            rounded-[3rem]
            border
            border-white/10
            p-10
            md:p-16
          "
        >
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
                Sponsors & Investors
              </p>

              <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl">
                Build The
                <br />
                Future With Us.
              </h2>

              <p className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-400">
                FT2027 ouvre ses portes aux marques,
                institutions et partenaires souhaitant
                soutenir une nouvelle génération culturelle
                africaine.
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid gap-6">
              {/* CARD */}
              <div
                className="
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-8
                "
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                  Opportunities
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  {sponsorOpportunities.map((item) => (
                    <div
                      key={item}
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        py-3
                        text-sm
                        text-zinc-300
                      "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5">
                <button
                  className="
                    rounded-full
                    bg-[#C9A84C]
                    px-8
                    py-5
                    font-semibold
                    text-black
                    transition
                    hover:scale-105
                    hover:shadow-[0_0_35px_rgba(201,168,76,0.45)]
                  "
                >
                  Become a Sponsor
                </button>

                <button
                  className="
                    glass
                    rounded-full
                    border
                    border-white/10
                    px-8
                    py-5
                    text-white
                    transition
                    hover:border-[#C9A84C]
                  "
                >
                  Download Pitch Deck
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}