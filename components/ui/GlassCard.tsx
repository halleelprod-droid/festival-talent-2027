'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = ''
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -2
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 18
      }}
      className={`
        relative overflow-hidden rounded-[2rem]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        shadow-[0_0_40px_rgba(0,0,0,0.25)]
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff10,transparent_45%)]" />

      {/* GOLD GLOW */}
      <div className="absolute inset-0 opacity-0 transition duration-700 hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}