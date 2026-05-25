'use client';

import { motion } from 'framer-motion';

import {
  liveStats
} from '@/components/sections/constants';

export default function LiveStatsBar() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-5">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C08,transparent_60%)]" />

      <motion.div
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear'
        }}
        className="flex w-max items-center gap-14"
      >
        {[...liveStats, ...liveStats].map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-4
                px-2
              "
            >
              {/* DOT */}
              <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />

              {/* TEXT */}
              <p
                className="
                  whitespace-nowrap
                  text-sm
                  uppercase
                  tracking-[0.3em]
                  text-zinc-300
                "
              >
                {item}
              </p>
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}