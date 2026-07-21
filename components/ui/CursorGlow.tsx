'use client';

import {
  motion
} from 'framer-motion';

import {
  useEffect,
  useState,
  useSyncExternalStore
} from 'react';

function subscribe(callback: () => void) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  fine.addEventListener('change', callback);
  reduced.addEventListener('change', callback);

  return () => {
    fine.removeEventListener('change', callback);
    reduced.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function getServerSnapshot() {
  return false;
}

export default function CursorGlow() {
  const [
    position,
    setPosition
  ] = useState({
    x: 0,
    y: 0
  });
  const [active, setActive] =
    useState(false);

  const enabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (
      e: MouseEvent
    ) => {
      const target = e.target instanceof Element ? e.target : null;
      const card = target?.closest('[data-premium-card]');

      setActive(Boolean(card));

      if (card instanceof HTMLElement) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          '--cursor-x',
          `${((e.clientX - rect.left) / rect.width) * 100}%`
        );
        card.style.setProperty(
          '--cursor-y',
          `${((e.clientY - rect.top) / rect.height) * 100}%`
        );
      }

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
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* MAIN GLOW */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: position.x - (active ? 170 : 120),
          y: position.y - (active ? 170 : 120),
          scale: active ? 1.18 : 1
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
        style={{
          width: active ? 340 : 240,
          height: active ? 340 : 240
        }}
      />

      {/* SMALL DOT */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: active ? 2.35 : 1
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
          border
          border-[#f6df9b]/70
          bg-[#C9A84C]
          shadow-[0_0_20px_rgba(201,168,76,0.9)]
          mix-blend-screen
        "
      />
    </>
  );
}
