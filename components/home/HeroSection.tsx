'use client';

import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* IMAGE FALLBACK */}
      <Image
        src="/images/previous/scene.jpg"
        alt="FT2027"
        fill
        sizes="100vw"
        priority
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-70
        "
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* CINEMATIC OVERLAY */}
      <div className="absolute inset-0 hero-gradient" />

      {/* HERO LIGHT */}
      <div className="hero-light" />

      {/* NOISE */}
      <div className="noise" />

      {/* GOLD LIGHT */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-[160px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 80
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1.2
          }}
          className="max-w-5xl"
        >
          {/* TOP */}
          <p className="text-sm uppercase tracking-[0.45em] text-[#C9A84C]">
            Dakar • Saly • Europe
          </p>

          {/* TITLE */}
          <h1
            className="
              mt-10
              text-5xl
              font-black
              leading-[0.9]
              tracking-[-0.08em]
              sm:text-6xl
              md:text-8xl
              lg:text-[10rem]
            "
          >
            Festival
            <br />
            Talent
            <br />
            2027
          </h1>

          {/* TEXT */}
          <p
            className="
              mt-10
              max-w-2xl
              text-base
              leading-relaxed
              text-zinc-300
              md:text-lg
            "
          >
            Une expérience immersive internationale
            réunissant musique, mode, culture,
            innovation et jeunesse africaine.
          </p>

          {/* BUTTONS */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Link href="/tickets">
              <button
                className="
                  gold-glow
                  w-full
                  rounded-full
                  bg-[#C9A84C]
                  px-10
                  py-5
                  font-semibold
                  text-black
                  transition
                  hover:scale-105
                  sm:w-auto
                "
              >
                Réserver
              </button>
            </Link>

            <Link href="/programme">
              <button
                className="
                  glass
                  w-full
                  rounded-full
                  border
                  border-white/10
                  px-10
                  py-5
                  text-white
                  transition
                  hover:border-[#C9A84C]
                  sm:w-auto
                "
              >
                Voir le programme
              </button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:gap-10">
            {[
              '50K+ Participants',
              '4 Days Experience',
              '20+ Artists',
              'Afrique → Europe'
            ].map((item) => (
              <div key={item}>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 md:text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
