"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const particles = Array.from({ length: 34 }).map((_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 8) * 0.45,
  duration: 8 + (index % 7),
}));

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <motion.div
        style={{ y }}
        className="festival-stage-grid absolute inset-0 opacity-70"
      />

      <motion.div
        style={{ rotate }}
        className="absolute left-1/2 top-[-18%] h-[75vh] w-[36vw] min-w-[260px] origin-top -translate-x-1/2 bg-[linear-gradient(110deg,transparent_0%,rgba(201,168,76,0.18)_45%,transparent_72%)] blur-2xl"
      />

      <motion.div
        animate={{ x: [-40, 40, -40], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[5%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#C9A84C]/18 blur-[150px]"
      />

      <motion.div
        animate={{ x: [50, -30, 50], y: [0, -35, 0], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-16%] right-[-8%] h-[620px] w-[620px] rounded-full bg-white/10 blur-[180px]"
      />

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[36%] top-[28%] h-[440px] w-[440px] rounded-full border border-[#C9A84C]/20 bg-black/20 blur-[80px]"
      />

      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#F6D77A] shadow-[0_0_18px_rgba(246,215,122,0.75)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -42, 0],
              opacity: [0, 0.72, 0],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
