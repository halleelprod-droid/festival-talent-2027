'use client';

import {
  useEffect,
  useRef
} from 'react';

import gsap from 'gsap';

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger';

gsap.registerPlugin(
  ScrollTrigger
);

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  speed = 120,
  className = ''
}: Props) {
  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const tween = gsap.to(element, {
      y: speed,
      ease: 'none',

      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}