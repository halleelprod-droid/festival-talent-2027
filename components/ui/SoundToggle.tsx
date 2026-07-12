'use client';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  Volume2,
  VolumeX
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

export default function SoundToggle() {
  const [enabled, setEnabled] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      '/audio/le-monde-se-rassemble.mp3'
    );

    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }
  }, []);

  const toggleSound = async () => {
    if (!audioRef.current) return;

    if (!enabled) {
      await audioRef.current.play();
      setEnabled(true);
    } else {
      audioRef.current.pause();
      setEnabled(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <motion.button
        whileHover={{
          scale: 1.08
        }}
        whileTap={{
          scale: 0.94
        }}
        onClick={toggleSound}
        aria-label={enabled ? 'Couper le son d’ambiance' : 'Activer le son d’ambiance'}
        aria-pressed={enabled}
        className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl"
      >
        {/* GLOW */}
        <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C20,transparent_60%)]" />

        {/* ICON */}
        <AnimatePresence mode="wait">
          {enabled ? (
            <motion.div
              key="on"
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.5
              }}
              transition={{
                duration: 0.2
              }}
              className="relative z-10"
            >
              <Volume2 className="text-[#C9A84C]" />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.5
              }}
              transition={{
                duration: 0.2
              }}
              className="relative z-10"
            >
              <VolumeX className="text-zinc-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
