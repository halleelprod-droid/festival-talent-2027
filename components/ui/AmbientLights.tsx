"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AmbientLights() {
  const prefersReducedMotion = useReducedMotion();
  const animation = (x: number[], y: number[]) =>
    prefersReducedMotion ? undefined : { x, y };
  const transition = (duration: number) =>
    prefersReducedMotion
      ? undefined
      : {
          duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
        };

  return (
    <>
      <motion.div
        animate={animation([0, 80, 0], [0, -60, 0])}
        transition={transition(14)}
        className="pointer-events-none fixed left-[-10%] top-[-10%] z-[1] h-[500px] w-[500px] rounded-full bg-[#C9A84C]/10 blur-3xl"
      />

      <motion.div
        animate={animation([0, -100, 0], [0, 60, 0])}
        transition={transition(18)}
        className="pointer-events-none fixed right-[-10%] top-[20%] z-[1] h-[600px] w-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl"
      />

      <motion.div
        animate={animation([0, 60, 0], [0, -40, 0])}
        transition={transition(16)}
        className="pointer-events-none fixed bottom-[-20%] left-[20%] z-[1] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl"
      />
    </>
  );
}
