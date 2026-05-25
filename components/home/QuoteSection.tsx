'use client';

import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-black py-48 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
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
          viewport={{ once: true }}
        >
          {/* TOP */}
          <p className="text-sm uppercase tracking-[0.45em] text-[#C9A84C]">
            FT2027 Vision
          </p>

          {/* QUOTE */}
          <h2
            className="
              mt-14
              text-5xl
              font-black
              leading-[1]
              tracking-[-0.06em]
              md:text-7xl
              lg:text-[8rem]
            "
          >
            “L’Afrique
            <br />
            ne suit pas
            <br />
            le futur.
            <br />
            Elle le crée.”
          </h2>

          {/* TEXT */}
          <p
            className="
              mx-auto
              mt-12
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Festival Talent 2027 rassemble les
            nouvelles générations créatives autour
            d’une expérience immersive entre culture,
            innovation, musique et vision panafricaine.
          </p>
        </motion.div>
      </div>
    </section>
  );
}