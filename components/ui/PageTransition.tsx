'use client';

import {
  AnimatePresence,
  motion
} from 'framer-motion';

import {
  usePathname
} from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({
  children
}: Props) {
  const pathname =
    usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.98
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: -40,
          scale: 0.98
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}