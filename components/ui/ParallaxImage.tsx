'use client';

import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion';
import { useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
}

export default function ParallaxImage({
  src,
  alt
}: ParallaxImageProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['-10%', '10%']
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[3rem]"
    >
      <motion.div
        style={{ y }}
        className="relative h-[120%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}