'use client';

import { motion } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const articles = [
  {
    category: 'Press',
    title:
      'Festival Talent 2027 dévoile une nouvelle vision culturelle immersive.',
    date: 'Mai 2026'
  },
  {
    category: 'Music',
    title:
      'Une programmation pensée pour connecter Afrique et nouvelle génération.',
    date: 'Juin 2026'
  },
  {
    category: 'Experience',
    title:
      'FT2027 prepare une tournee europeenne entre Paris et Rome.',
    date: 'Juin 2026'
  }
];

export default function NewsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <SectionHeading
          eyebrow="News & Media"
          className="max-w-5xl"
          title={
            <>
              FT2027 dans
              <br />
              les médias.
            </>
          }
          description="Suivez les dernières annonces, collaborations et révélations autour du Festival Talent 2027."
        />

        {/* ARTICLES */}
        <div className="mt-24 space-y-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="group p-10">
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  {/* LEFT */}
                  <div className="max-w-4xl">
                    <span className="uppercase tracking-[0.3em] text-xs text-[#C9A84C]">
                      {article.category}
                    </span>

                    <h3 className="font-display mt-6 text-3xl leading-tight md:text-4xl">
                      {article.title}
                    </h3>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">
                    <span className="uppercase tracking-[0.3em] text-xs text-zinc-400">
                      {article.date}
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 transition duration-500 group-hover:border-[#C9A84C]/30">
                      →
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
