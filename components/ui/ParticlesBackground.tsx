'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function ParticlesBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map(
        (_, index) => ({
          id: index,
          size:
            Math.random() * 3 + 2,
          left:
            Math.random() * 100,
          duration:
            Math.random() * 12 + 10,
          delay:
            Math.random() * 6
        })
      ),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            y: '110vh',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration:
              particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute rounded-full bg-[#C9A84C]/20 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            willChange:
              'transform, opacity'
          }}
        />
      ))}
    </div>
  );
}