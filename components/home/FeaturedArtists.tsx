'use client';

import Link from 'next/link';

import Image from 'next/image';

import { motion } from 'framer-motion';

import {
  featuredArtists
} from '@/components/sections/constants';

export default function FeaturedArtists() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{
            once: true
          }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Official Lineup
          </p>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-[0.9]
              tracking-[-0.06em]
              md:text-7xl
            "
          >
            Voices
            <br />
            Of FT2027.
          </h2>

          <p
            className="
              mt-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Découvrez les artistes confirmés
            pour l’expérience immersive FT2027.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArtists.map(
            (
              artist,
              index
            ) => (
              <motion.div
                key={artist.name}
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
                viewport={{
                  once: true
                }}
                whileHover={{
                  y: -10
                }}
                className="
                  glass
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.03]
                "
              >
                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_70%)]" />

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={800}
                    height={1000}
                    priority={index < 2}
                    className="
                      h-[380px]
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 p-8">
                  {/* CATEGORY */}
                  <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
                    {artist.category}
                  </p>

                  {/* NAME */}
                  <h3 className="mt-5 text-4xl font-black leading-none">
                    {artist.name}
                  </h3>

                  {/* BUTTON */}
                  <Link href="/artists">
                    <button
                      className="
                        mt-8
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-6
                        py-3
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-white
                        transition
                        hover:border-[#C9A84C]
                      "
                    >
                      View Artist
                    </button>
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}