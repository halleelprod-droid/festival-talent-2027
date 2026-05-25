'use client';

import {
  motion,
  useMotionValue,
  useSpring
} from 'framer-motion';

import {
  useEffect,
  useState
} from 'react';

export default function MouseTrail() {
  const [isMobile, setIsMobile] =
    useState(false);

  const [hovering, setHovering] =
    useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* ULTRA SMOOTH */
  const springConfig = {
    stiffness: 900,
    damping: 45,
    mass: 0.15
  };

  const cursorX = useSpring(
    mouseX,
    springConfig
  );

  const cursorY = useSpring(
    mouseY,
    springConfig
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024
      );
    };

    checkMobile();

    const moveCursor = (
      e: MouseEvent
    ) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (
      e: Event
    ) => {
      const target =
        e.target as HTMLElement;

      setHovering(
        !!target.closest(
          'button, a, .group'
        )
      );
    };

    window.addEventListener(
      'mousemove',
      moveCursor,
      {
        passive: true
      }
    );

    window.addEventListener(
      'mouseover',
      handleHover
    );

    window.addEventListener(
      'resize',
      checkMobile
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        moveCursor
      );

      window.removeEventListener(
        'mouseover',
        handleHover
      );

      window.removeEventListener(
        'resize',
        checkMobile
      );
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* OUTER */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY
        }}
        animate={{
          scale: hovering ? 2 : 1,
          opacity: hovering ? 0.6 : 1
        }}
        transition={{
          duration: 0.15
        }}
        className="
          pointer-events-none
          fixed
          left-[-16px]
          top-[-16px]
          z-[9999]
          h-8
          w-8
          rounded-full
          border
          border-[#C9A84C]/40
          bg-[#C9A84C]/10
          backdrop-blur-xl
          will-change-transform
        "
      />

      {/* INNER */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY
        }}
        animate={{
          scale: hovering ? 0.5 : 1
        }}
        transition={{
          duration: 0.1
        }}
        className="
          pointer-events-none
          fixed
          left-[-4px]
          top-[-4px]
          z-[9999]
          h-2
          w-2
          rounded-full
          bg-[#C9A84C]
          will-change-transform
        "
      />
    </>
  );
}