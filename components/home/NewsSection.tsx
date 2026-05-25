'use client';

import { motion } from 'framer-motion';

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
      'FT2027 transforme Dakar en plateforme culturelle immersive.',
    date: 'Août 2026'
  }
];

export default function NewsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            News & Media
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            FT2027 dans
            <br />
            les médias.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
            Suivez les dernières annonces, collaborations et
            révélations autour du Festival Talent 2027.
          </p>
        </motion.div>

        {/* ARTICLES */}
        <div className="mt-24 space-y-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{
                opacity: 0,
                y: 80
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.08,
                duration: 1
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -4
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl transition duration-500"
            >
              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="max-w-4xl">
                  <span className="uppercase tracking-[0.3em] text-xs text-[#C9A84C]">
                    {article.category}
                  </span>

                  <h3 className="mt-6 text-3xl font-black leading-tight md:text-4xl">
                    {article.title}
                  </h3>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">
                  <span className="uppercase tracking-[0.3em] text-xs text-zinc-500">
                    {article.date}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 transition duration-500 group-hover:border-[#C9A84C]/30">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}