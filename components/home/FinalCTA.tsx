'use client';

import {
  motion
} from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-48 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* BIG GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* LABEL */}
        <motion.span
          initial={{
            opacity: 0,
            y: 20
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
            inline-block
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            text-xs
            uppercase
            tracking-[0.4em]
            text-[#C9A84C]
            backdrop-blur-xl
          "
        >
          Festival Talent 2027
        </motion.span>

        {/* TITLE */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 80
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1,
            duration: 1
          }}
          viewport={{ once: true }}
          className="
            mt-10
            text-5xl
            font-black
            leading-[0.9]
            tracking-[-0.05em]
            md:text-7xl
            lg:text-[9rem]
          "
        >
          Experience
          <br />
          The Future.
        </motion.h2>

        {/* TEXT */}
        <motion.p
          initial={{
            opacity: 0,
            y: 40
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2,
            duration: 1
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            mt-10
            max-w-2xl
            text-lg
            leading-relaxed
            text-zinc-400
          "
        >
          Rejoignez FT2027 à Dakar pour vivre
          une expérience immersive unique entre
          musique, culture, innovation et futur.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.3,
            duration: 1
          }}
          viewport={{ once: true }}
          className="
            mt-16
            flex
            flex-wrap
            items-center
            justify-center
            gap-6
          "
        >
          {/* PRIMARY */}
          <button
            className="
              rounded-full
              bg-[#C9A84C]
              px-10
              py-5
              font-semibold
              text-black
              transition
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]
            "
          >
            Réserver maintenant
          </button>

          {/* SECONDARY */}
          <button
            className="
              glass
              rounded-full
              border
              border-white/10
              px-10
              py-5
              text-white
              transition
              hover:border-[#C9A84C]
            "
          >
            Découvrir le lineup
          </button>
        </motion.div>
      </div>
    </section>
  );
}