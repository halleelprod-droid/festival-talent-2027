'use client';

import {
  motion
} from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative h-32 overflow-hidden bg-black">
      {/* LINE */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-px
          w-[140%]
          -translate-x-1/2
          -translate-y-1/2
          bg-gradient-to-r
          from-transparent
          via-[#C9A84C]/30
          to-transparent
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C9A84C]/10
          blur-3xl
        "
      />
    </div>
  );
}