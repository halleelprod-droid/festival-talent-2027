"use client";

import { motion } from "framer-motion";

type HomeActTransitionProps = {
  act: string;
  title: string;
  description?: string;
};

export default function HomeActTransition({
  act,
  title,
  description,
}: HomeActTransitionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
      className="relative overflow-hidden border-y border-white/10 bg-black px-6 py-16 text-white sm:px-10 lg:px-20"
      aria-label={`${act} - ${title}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(234,179,8,0.12),transparent)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-300">
            {act}
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-none text-white sm:text-6xl">
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-xl text-sm leading-7 text-white/58 md:text-right">
            {description}
          </p>
        ) : null}
      </div>
    </motion.section>
  );
}
