'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* LOGO */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="flex items-center gap-4"
        >
          <div className="h-4 w-4 rounded-full bg-[#C9A84C]" />

          <h1 className="text-4xl font-black uppercase tracking-[0.4em]">
            FT2027
          </h1>
        </motion.div>

        {/* LOADER */}
        <div className="mt-10 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{
              x: ['-100%', '220%']
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: 'easeInOut'
            }}
            className="h-full w-[40%] bg-[#C9A84C]"
          />
        </div>

        {/* TEXT */}
        <p className="mt-8 text-sm uppercase tracking-[0.35em] text-zinc-500">
          Loading Experience
        </p>
      </div>
    </main>
  );
}