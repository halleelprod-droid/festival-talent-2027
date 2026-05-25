'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    value: '25K+',
    label: 'Participants',
    desc: 'Une communauté réunie autour de la culture et de la musique.'
  },
  {
    value: '40+',
    label: 'Artistes',
    desc: 'Performances live, showcases et expériences immersives.'
  },
  {
    value: '15M+',
    label: 'Reach Digital',
    desc: 'Une visibilité internationale pensée pour la nouvelle génération.'
  },
  {
    value: '72H',
    label: 'Immersion',
    desc: 'Trois jours d’expériences entre culture, innovation et lifestyle.'
  }
];

export default function StatsSection() {
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
            FT2027 Impact
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Une plateforme
            <br />
            culturelle immersive.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
            Festival Talent 2027 connecte artistes, culture,
            innovation et communautés dans une expérience pensée
            comme le futur des événements africains.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
              {/* GOLD GLOW */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#C9A84C15,transparent_60%)]" />

              <div className="relative z-10">
                {/* DOT */}
                <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                {/* VALUE */}
                <h3 className="mt-10 text-6xl font-black tracking-[-0.05em] md:text-7xl">
                  {stat.value}
                </h3>

                {/* LABEL */}
                <p className="mt-6 text-2xl font-black">
                  {stat.label}
                </p>

                {/* DESC */}
                <p className="mt-6 leading-relaxed text-zinc-400">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}