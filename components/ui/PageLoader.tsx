'use client';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  useEffect,
  useState
} from 'react';

const loadingMessages = [
  'Révéler les talents…',
  'Créer des opportunités…',
  'Transformer des vies…'
];

export default function PageLoader() {
  const [loading, setLoading] =
    useState(true);
  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 1800);

    const interval =
      setInterval(() => {
        setMessageIndex((current) =>
          (current + 1) % loadingMessages.length
        );
      }, 560);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 1
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-black
          "
        >
          {/* BG LIGHT */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-[#C9A84C]/20 blur-[140px]" />

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:70px_70px]" />

          {/* CONTENT */}
          <div className="relative z-10 text-center">
            {/* LOGO */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 1
              }}
              className="
                relative
                text-6xl
                font-black
                uppercase
                tracking-[0.35em]
                text-white
                md:text-8xl
              "
            >
              <span className="absolute -inset-8 -z-10 rounded-full bg-[#C9A84C]/10 blur-3xl" />
              FT
              <span className="text-[#C9A84C]">
                2027
              </span>
            </motion.div>

            {/* LINE */}
            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: '100%'
              }}
              transition={{
                delay: 0.5,
                duration: 1.2
              }}
              className="
                mx-auto
                mt-8
                h-px
                bg-[#C9A84C]
              "
            />

            {/* TEXT */}
            <motion.p
              key={messageIndex}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.35
              }}
              className="
                mt-6
                text-xs
                uppercase
                tracking-[0.45em]
                text-zinc-300
              "
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
