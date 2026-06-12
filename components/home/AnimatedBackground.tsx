"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 11) % 90)}%`,
  top: `${8 + ((index * 17) % 84)}%`,
  delay: index * 0.16,
  duration: 4 + (index % 7) * 0.45,
  size: index % 3 === 0 ? "h-2 w-2" : "h-1.5 w-1.5",
}));

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%),linear-gradient(to_bottom,#000,#050505,#000)]" />

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-yellow-500/10 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -45, 0],
          y: [0, 35, 0],
          opacity: [0.18, 0.38, 0.18],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-48 bottom-10 h-[560px] w-[560px] rounded-full bg-orange-500/10 blur-[140px]"
      />

      <motion.div
        animate={{
          rotate: [-8, -2, -8],
          opacity: [0.12, 0.26, 0.12],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] top-0 h-[120vh] w-24 origin-top bg-gradient-to-b from-yellow-300/20 via-yellow-300/5 to-transparent blur-2xl"
      />

      <motion.div
        animate={{
          rotate: [8, 3, 8],
          opacity: [0.1, 0.22, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] top-0 h-[120vh] w-24 origin-top bg-gradient-to-b from-yellow-400/20 via-yellow-400/5 to-transparent blur-2xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:90px_90px] opacity-[0.035]" />

      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            animate={{
              y: [0, -32, 0],
              x: [0, particle.id % 2 === 0 ? 14 : -14, 0],
              opacity: [0.15, 0.85, 0.15],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${particle.size} rounded-full bg-yellow-300/70 shadow-[0_0_18px_rgba(250,204,21,0.8)]`}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent" />
    </div>
  );
}