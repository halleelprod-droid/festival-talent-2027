'use client';

import { motion } from 'framer-motion';

import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

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
        <SectionHeading
          eyebrow="Why FT2027"
          className="max-w-4xl"
          title={
            <>
              More Than
              <br />
              A Festival.
            </>
          }
          description="FT2027 est une expérience culturelle immersive pensée pour connecter les talents, les cultures et les nouvelles générations créatives."
        />

        {/* GRID */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-10">
                <div className="flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                  <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                    FT2027
                  </p>
                </div>

                <h3 className="font-display mt-8 text-4xl">
                  {feature.title}
                </h3>

                <p className="mt-6 leading-relaxed text-zinc-400">
                  {feature.text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}