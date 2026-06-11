'use client';

import { motion } from 'framer-motion';

import { confirmedArtists } from '@/components/sections/constants';

export default function LineupSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-40 text-[#F5F0E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <span className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Festival Lineup
          </span>

          <h2 className="mt-8 text-5xl font-black leading-none md:text-7xl lg:text-[8rem]">
            Artistes
            <br />
            confirmes.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
            Festival Talent 2027 presente uniquement les artistes officiellement
            confirmes.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {confirmedArtists.map((artist, index) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition duration-500"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)] opacity-0 transition duration-700 group-hover:opacity-100" />
              <div className="absolute right-6 top-6 text-xs tracking-[0.3em] text-zinc-600">
                0{index + 1}
              </div>

              <div className="relative z-10">
                <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />
                <h3 className="mt-10 text-3xl font-black leading-tight">
                  {artist.name}
                </h3>
                <p className="mt-6 leading-relaxed text-zinc-400">
                  {artist.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
