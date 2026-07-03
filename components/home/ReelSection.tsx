'use client';

import {
  motion
} from 'framer-motion';

import FadeIn from '@/components/ui/FadeIn';

export default function ReelSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <FadeIn className="max-w-5xl">
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            Official Trailer
          </span>

          <h2 className="font-display mt-8 text-5xl leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Une expérience
            <br />
            pensée comme un film.
          </h2>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300">
            FT2027 mélange musique, lumière, culture et storytelling
            dans une expérience immersive inspirée du cinéma,
            des performances live et du futur du divertissement.
          </p>
        </FadeIn>

        {/* VIDEO BLOCK */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1.2
          }}
          viewport={{ once: true }}
          className="group relative mt-24 overflow-hidden rounded-[3rem] border border-white/10"
        >
          {/* VIDEO */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          >
            <source
              src="/videos/reel1.mp4"
              type="video/mp4"
            />
          </video>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* GOLD LIGHT */}
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

          {/* PLAY */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{
                scale: 1.08
              }}
              className="flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-2xl"
            >
              <div className="ml-2 text-3xl text-[#C9A84C]">
                ▶
              </div>
            </motion.div>
          </div>

          {/* CONTENT */}
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <h3 className="font-display text-4xl md:text-6xl">
              FT2027 OFFICIAL REEL
            </h3>

            <p className="mt-4 uppercase tracking-[0.3em] text-sm text-zinc-300">
              Paris - Rome - Culture - Future - Live Experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
