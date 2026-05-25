'use client';

import { motion } from 'framer-motion';

const lineup = [
  'Samba Peuzzi',
  'Ash The Best',
  'Malcom',
  'Tidiane',
  'Rachid',
  'Guest Experience',
  'Live Performances',
  'Surprise Artists'
];

export default function LineupSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
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
            duration: 1
          }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            Festival Lineup
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Une lineup
            <br />
            nouvelle génération.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
            Festival Talent 2027 réunit artistes, performers,
            DJs et créateurs pour une expérience immersive pensée
            comme une nouvelle vision du divertissement africain.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {lineup.map((artist, index) => (
            <motion.div
              key={artist}
              initial={{
                opacity: 0,
                y: 60
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.8
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                scale: 1.02
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition duration-500"
            >
              {/* GOLD GLOW */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

              {/* NUMBER */}
              <div className="absolute right-6 top-6 text-xs tracking-[0.3em] text-zinc-600">
                0{index + 1}
              </div>

              <div className="relative z-10">
                {/* DOT */}
                <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                {/* NAME */}
                <h3 className="mt-10 text-3xl font-black leading-tight">
                  {artist}
                </h3>

                {/* TEXT */}
                <p className="mt-6 leading-relaxed text-zinc-400">
                  Live performance immersive au cœur de
                  l’expérience FT2027.
                </p>

                {/* BOTTOM */}
                <div className="mt-10 flex items-center justify-between">
                  <span className="uppercase tracking-[0.3em] text-xs text-zinc-500">
                    FT2027
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 transition duration-500 group-hover:border-[#C9A84C]/30">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          transition={{
            delay: 0.4,
            duration: 1
          }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-zinc-500">
            More artists & experiences coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}