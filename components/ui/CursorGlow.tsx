'use client';

import {
  motion
} from 'framer-motion';

import {
  useEffect,
  useState
} from 'react';

export default function CursorGlow() {
  const [
    position,
    setPosition
  ] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const moveCursor = (
      e: MouseEvent
    ) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener(
      'mousemove',
      moveCursor
    );

    return () =>
      window.removeEventListener(
        'mousemove',
        moveCursor
      );
  }, []);

  return (
    <>
      {/* MAIN GLOW */}
      <motion.div
        animate={{
          x: position.x - 120,
          y: position.y - 120
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
          mass: 0.3
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[999]
          h-[240px]
          w-[240px]
          rounded-full
          bg-[#C9A84C]/10
          blur-3xl
        "
      />

      {/* SMALL DOT */}
      <motion.div
        animate={{
          x: position.x - 6,
          y: position.y - 6
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[1000]
          h-3
          w-3
          rounded-full
          bg-[#C9A84C]
          shadow-[0_0_20px_rgba(201,168,76,0.9)]
        "
      />
    </>
  );
}