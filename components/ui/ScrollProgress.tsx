'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform
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
  const lightY = useTransform(
    scrollYProgress,
    [0, 1],
    ['8vh', '82vh']
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

      <motion.div
        aria-hidden="true"
        style={{
          y: lightY
        }}
        className="
          pointer-events-none
          fixed
          right-[-90px]
          top-0
          z-[80]
          hidden
          h-48
          w-48
          rounded-full
          bg-[#C9A84C]/12
          blur-3xl
          lg:block
        "
      />
    </>
  );
}
