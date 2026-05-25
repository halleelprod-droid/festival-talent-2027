'use client';

import { motion } from 'framer-motion';

import {
  officialSchedule
} from '@/components/sections/constants';

export default function ProgrammePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Official Programme
          </p>

          <h1
            className="
              mt-8
              text-6xl
              font-black
              leading-[0.9]
              tracking-[-0.07em]
              md:text-8xl
            "
          >
            4 Days.
            <br />
            Infinite Energy.
          </h1>

          <p
            className="
              mt-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Découvrez la programmation immersive
            officielle de FT2027 entre Dakar et Saly.
          </p>
        </motion.div>

        {/* DAYS */}
        <div className="mt-24 grid gap-8">
          {officialSchedule.map(
            (
              day,
              index
            ) => (
              <motion.div
                key={day.day}
                initial={{
                  opacity: 0,
                  y: 80
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 1
                }}
                whileHover={{
                  y: -5
                }}
                className="
                  glass
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  p-8
                  md:p-10
                "
              >
                {/* GLOW */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition
                    duration-700
                    group-hover:opacity-100
                  "
                  style={{
                    background: `radial-gradient(circle at center, ${day.color}20, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  {/* TOP */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-4">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              day.color
                          }}
                        />

                        <p
                          className="
                            text-sm
                            uppercase
                            tracking-[0.35em]
                          "
                          style={{
                            color: day.color
                          }}
                        >
                          {day.city}
                        </p>
                      </div>

                      <h2 className="mt-6 text-5xl font-black">
                        {day.day}
                      </h2>

                      <p className="mt-3 text-zinc-400">
                        {day.date}
                      </p>
                    </div>

                    <div className="max-w-xl">
                      <p
                        className="
                          text-sm
                          uppercase
                          tracking-[0.3em]
                        "
                        style={{
                          color: day.color
                        }}
                      >
                        Theme
                      </p>

                      <h3 className="mt-4 text-3xl font-bold">
                        {day.theme}
                      </h3>
                    </div>
                  </div>

                  {/* EVENTS */}
                  <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {day.events.map(
                      (event) => (
                        <div
                          key={event}
                          className="
                            flex
                            items-center
                            gap-4
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.03]
                            px-6
                            py-4
                          "
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor:
                                day.color
                            }}
                          />

                          <p className="text-zinc-300">
                            {event}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </main>
  );
}