'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Culture',
    text: 'Une rencontre entre traditions africaines et vision moderne internationale.'
  },

  {
    title: 'Jeunesse',
    text: 'Un festival pensé pour révéler les talents et créer des opportunités réelles.'
  },

  {
    title: 'Innovation',
    text: 'Expériences immersives, art digital, performances et technologies créatives.'
  },

  {
    title: 'Impact',
    text: 'Créer une plateforme culturelle durable pour le Sénégal et l’Afrique.'
  }
];

export default function WhyFTSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Why FT2027
          </p>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[8rem]">
            More Than
            <br />
            A Festival.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            FT2027 est une expérience culturelle immersive
            pensée pour connecter les talents, les cultures
            et les nouvelles générations créatives.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                y: -8
              }}
              className="
                glass
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                p-10
              "
            >
              {/* LIGHT */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_70%)]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                  <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                    FT2027
                  </p>
                </div>

                <h3 className="mt-8 text-4xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-6 leading-relaxed text-zinc-400">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}