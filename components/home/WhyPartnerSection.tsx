'use client';

import { motion } from 'framer-motion';

import {
  partnerStats
} from '@/data/partners';

export default function WhyPartnerSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C9A84C]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
              Partnership
            </p>

            <h2 className="font-display mt-8 text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl">
              Why Partner
              <br />
              With FT2027.
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-400">
              FT2027 crée une plateforme culturelle moderne
              réunissant jeunesse, innovation, musique,
              mode et expérience immersive au Sénégal.
            </p>

            {/* BUTTON */}
            <button
              className="
                mt-12
                rounded-full
                bg-[#C9A84C]
                px-8
                py-5
                font-semibold
                text-black
                transition
                hover:scale-105
                hover:shadow-[0_0_35px_rgba(201,168,76,0.45)]
              "
            >
              Become a Partner
            </button>
          </motion.div>

          {/* RIGHT */}
          <div className="grid gap-6 md:grid-cols-2">
            {partnerStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 70
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
                  <h3 className="text-5xl font-black text-[#C9A84C]">
                    {item.value}
                  </h3>

                  <p className="mt-6 text-zinc-400">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}