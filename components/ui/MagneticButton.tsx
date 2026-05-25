'use client';

import {
  motion
} from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export default function MagneticButton({
  children
}: Props) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -4
      }}
      whileTap={{
        scale: 0.96
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-full
        border
        border-[#C9A84C]/30
        bg-[#C9A84C]
        px-10
        py-5
        font-semibold
        text-black
        transition-all
        duration-500
        hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]
      "
    >
      <span className="relative z-10">
        {children}
      </span>

      <div
        className="
          absolute
          inset-0
          translate-y-full
          bg-white/20
          transition-transform
          duration-500
          group-hover:translate-y-0
        "
      />
    </motion.button>
  );
}