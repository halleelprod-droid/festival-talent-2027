'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import {
  festivalLocations
} from '@/data/program';
import FadeIn from '@/components/ui/FadeIn';

const TourMap = dynamic(() => import('./TourMap'), {
  ssr: false,
  loading: () => (
    <div className="mt-16 h-[480px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]" />
  ),
});

export default function ExperienceMap() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <FadeIn className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Festival Locations
          </p>

          <h2 className="font-display mt-8 text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[8rem]">
            Paris
            <br />
            To Rome.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            FT2027 prepare une tournee europeenne de janvier a avril 2027,
            precedee par des pre-selections officielles dans huit disciplines.
          </p>
        </FadeIn>

        <TourMap />

        {/* GRID */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {festivalLocations.map((location, index) => (
            <motion.div
              key={location.name}
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
              className="
                glass
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                p-10
              "
            >
              {/* LIGHT */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_70%)]" />

              <div className="relative z-10">
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                      {location.city}
                    </p>

                    <h3 className="mt-5 text-4xl font-black">
                      {location.name}
                    </h3>
                  </div>

                  {/* DOT */}
                  <div className="h-4 w-4 rounded-full bg-[#C9A84C]" />
                </div>

                {/* TEXT */}
                <p className="mt-8 max-w-md leading-relaxed text-zinc-400">
                  {location.description}
                </p>

                {/* LINE */}
                <div className="mt-10 h-px w-full bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
