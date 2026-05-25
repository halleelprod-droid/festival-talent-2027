'use client';

import {
  motion
} from 'framer-motion';

export default function OrbScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* MAIN ORB */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C9A84C]/20
          blur-3xl
        "
      />

      {/* INNER LIGHT */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[220px]
          w-[220px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C9A84C]/30
          blur-2xl
        "
      />

      {/* RING */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#C9A84C]/10
        "
      />

      {/* SMALL LIGHTS */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          absolute
          left-[25%]
          top-[30%]
          h-24
          w-24
          rounded-full
          bg-[#C9A84C]/20
          blur-2xl
        "
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          absolute
          right-[25%]
          bottom-[25%]
          h-32
          w-32
          rounded-full
          bg-white/[0.04]
          blur-2xl
        "
      />
    </div>
  );
}