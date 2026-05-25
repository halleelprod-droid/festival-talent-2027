'use client';

import {
  motion,
  useScroll,
  useSpring
} from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 30,
      restDelta: 0.001
    }
  );

  return (
    <>
      {/* GLOW */}
      <motion.div
        style={{
          scaleX
        }}
        className="
          fixed
          left-0
          top-0
          z-[9999]
          h-[4px]
          w-full
          origin-left
          bg-[#C9A84C]
          shadow-[0_0_25px_rgba(201,168,76,0.9)]
        "
      />

      {/* LIGHT */}
      <motion.div
        style={{
          scaleX
        }}
        className="
          fixed
          left-0
          top-0
          z-[9998]
          h-[12px]
          w-full
          origin-left
          bg-[#C9A84C]/20
          blur-xl
        "
      />
    </>
  );
}