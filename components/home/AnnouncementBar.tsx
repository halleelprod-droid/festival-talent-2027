'use client';

import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_70%)]" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="relative flex whitespace-nowrap py-4"
      >
        <div className="flex items-center gap-12 pr-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center gap-12">
              <span className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                Festival Talent 2027
              </span>

              <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                Deuxieme edition - Saison nationale 2026-2027
              </span>

              <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                Pre-selections officielles avant janvier 2027
              </span>

              <span className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                Union Europeenne - Premier partenaire officiel majeur
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
