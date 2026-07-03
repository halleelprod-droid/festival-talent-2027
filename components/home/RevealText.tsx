'use client';

import {
  motion
} from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

export default function RevealText({
  text,
  className
}: Props) {
  return (
    <motion.h2
      initial={{
        opacity: 0,
        y: 120
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {text}
    </motion.h2>
  );
}