'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

function seededValue(index: number, salt: number) {
  const value =
    Math.sin(index * 97.13 + salt * 31.7) * 10000;

  return value - Math.floor(value);
}

export default function ParticlesBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map(
        (_, index) => ({
          id: index,
          size:
            seededValue(index, 1) * 3 + 2,
          left:
            seededValue(index, 2) * 100,
          duration:
            seededValue(index, 3) * 12 + 10,
          delay:
            seededValue(index, 4) * 6
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
