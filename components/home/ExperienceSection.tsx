'use client';

import { motion } from 'framer-motion';
import RevealText from './RevealText';

const experiences = [
  {
    title: 'Live Performances',
    desc:
      'Des performances immersives pensées comme des expériences visuelles et émotionnelles.'
  },
  {
    title: 'Culture & Lifestyle',
    desc:
      'Une rencontre entre culture urbaine, créativité africaine et nouvelle génération.'
  },
  {
    title: 'Future Experience',
    desc:
      'FT2027 mélange innovation, musique et digital dans une plateforme du futur.'
  }
];

export default function ExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C9A84C]/10 blur-3xl" />

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
          className="max-w-6xl"
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            FT2027 Experience
          </span>

          <RevealText
            text="Le futur des festivals culturels africains."
            className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[8rem]"
          />

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Festival Talent 2027 crée une expérience immersive
            nouvelle génération où musique, innovation, culture
            et storytelling fusionnent dans un univers pensé
            comme un film vivant.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {experiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 80
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.08,
                duration: 1
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl"
            >
              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#C9A84C15,transparent_60%)]" />

              <div className="relative z-10">
                {/* NUMBER */}
                <div className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  0{index + 1}
                </div>

                {/* TITLE */}
                <h3 className="mt-10 text-4xl font-black leading-tight">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="mt-8 leading-relaxed text-zinc-400">
                  {item.desc}
                </p>

                {/* BOTTOM */}
                <div className="mt-12 flex items-center justify-between">
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
      </div>
    </section>
  );
}