'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  className = ''
}: FadeInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{
        once: true,
        margin: '-80px'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}