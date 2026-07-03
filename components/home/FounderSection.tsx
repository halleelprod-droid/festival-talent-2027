'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import FadeIn from '@/components/ui/FadeIn';

export default function FounderSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#120a02] to-black" />

      {/* ORANGE GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff7b00]/20 blur-[160px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* TITLE */}
        <FadeIn className="mb-20">
          <p className="text-[#C9A84C] uppercase tracking-[0.4em] text-sm mb-5">
            Vision
          </p>

          <h2 className="font-display text-5xl md:text-7xl leading-none uppercase">
            La Fondatrice
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* GLOW */}
            <div className="absolute -inset-8 bg-[#ff7b00]/20 blur-[100px] rounded-full" />

            <div className="relative overflow-hidden rounded-[40px] border border-white/10">
              <Image
                src="/images/previous/zairah.jpg"
                alt="Fondatrice FT2027"
                width={900}
                height={1200}
                className="h-[700px] w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-[32px] p-10 md:p-14">
              <p className="text-[#C9A84C] uppercase tracking-[0.3em] text-sm mb-6">
                Initiatrice du projet
              </p>

              <h3 className="font-display text-4xl md:text-6xl leading-tight mb-8">
                ZAÏRHA
                <br />
                DIAMANT NOIR
              </h3>

              <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                Artiste, chanteuse et compositrice internationale,
                Zaïrha porte une vision artistique moderne reliant
                l’Afrique au monde à travers la musique, la culture,
                les émotions et l’union des talents.
              </p>

              <p className="text-zinc-400 leading-relaxed mb-10">
                Festival Talent 2027 est né d’une ambition :
                créer une expérience culturelle panafricaine capable
                de réunir artistes, créateurs et publics autour d’une
                scène internationale premium.
              </p>

              {/* QUOTE */}
              <div className="border-l-4 border-[#C9A84C] pl-6">
                <p className="text-2xl md:text-3xl italic font-light text-white leading-relaxed">
                  “Réunir les cultures,
                  révéler les talents
                  et créer une scène où
                  l’Afrique rencontre le monde.”
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-5 mt-14">
                <div className="glass rounded-2xl p-5 text-center">
                  <h4 className="text-3xl font-black text-[#C9A84C]">
                    2027
                  </h4>

                  <p className="text-sm text-zinc-400 mt-2">
                    Festival
                  </p>
                </div>

                <div className="glass rounded-2xl p-5 text-center">
                  <h4 className="text-3xl font-black text-[#C9A84C]">
                    Africa
                  </h4>

                  <p className="text-sm text-zinc-400 mt-2">
                    Vision
                  </p>
                </div>

                <div className="glass rounded-2xl p-5 text-center">
                  <h4 className="text-3xl font-black text-[#C9A84C]">
                    Global
                  </h4>

                  <p className="text-sm text-zinc-400 mt-2">
                    Experience
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
