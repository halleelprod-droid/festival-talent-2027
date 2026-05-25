'use client';

import {
  motion
} from 'framer-motion';

export default function AmbientLights() {
  return (
    <>
      {/* TOP LIGHT */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          pointer-events-none
          fixed
          left-[-10%]
          top-[-10%]
          z-[1]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C9A84C]/10
          blur-3xl
        "
      />

      {/* RIGHT LIGHT */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          pointer-events-none
          fixed
          right-[-10%]
          top-[20%]
          z-[1]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#C9A84C]/5
          blur-3xl
        "
      />

      {/* BOTTOM LIGHT */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          pointer-events-none
          fixed
          bottom-[-20%]
          left-[20%]
          z-[1]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />
    </>
  );
}