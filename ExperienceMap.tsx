'use client';

import {
  motion
} from 'framer-motion';

const zones = [
  {
    title: 'Main Stage',
    desc: 'Concerts live & performances principales.'
  },
  {
    title: 'Creative Zone',
    desc: 'Art, mode, innovation et expériences digitales.'
  },
  {
    title: 'VIP Experience',
    desc: 'Lounge premium, backstage et networking.'
  },
  {
    title: 'Food Village',
    desc: 'Cuisine, lifestyle et culture urbaine.'
  }
];

export default function ExperienceMap() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#C9A84C]/10 blur-3xl" />

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
            Experience Map
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Explore
            <br />
            FT2027.
          </h2>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Une expérience immersive pensée comme une ville
            culturelle où musique, innovation, lifestyle
            et performances se rencontrent.
          </p>
        </motion.div>

        {/* MAP */}
        <div className="relative mt-24 overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

          {/* GRID */}
          <div className="relative z-10 grid gap-8 lg:grid-cols-2">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.title}
                initial={{
                  opacity: 0,
                  y: 60
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
                  y: -6
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8"
              >
                {/* NUMBER */}
                <div className="absolute right-6 top-6 text-xs uppercase tracking-[0.3em] text-zinc-600">
                  0{index + 1}
                </div>

                {/* DOT */}
                <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                {/* TITLE */}
                <h3 className="mt-8 text-4xl font-black">
                  {zone.title}
                </h3>

                {/* TEXT */}
                <p className="mt-6 leading-relaxed text-zinc-400">
                  {zone.desc}
                </p>

                {/* BOTTOM */}
                <div className="mt-10 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />

                  <span className="uppercase tracking-[0.3em] text-xs text-zinc-500">
                    FT2027 EXPERIENCE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER MAP VISUAL */}
          <div className="relative mt-16 flex items-center justify-center">
            <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5">
              <div className="absolute h-[220px] w-[220px] rounded-full border border-white/10" />

              <div className="absolute h-[140px] w-[140px] rounded-full border border-white/10" />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="h-8 w-8 rounded-full bg-[#C9A84C] shadow-[0_0_40px_rgba(201,168,76,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}