'use client';

import { motion } from 'framer-motion';

export default function ImmersiveBanner() {
  return (
    <section className="relative h-[120vh] overflow-hidden bg-black">
      {/* IMAGE */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{
          duration: 2
        }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2000&auto=format&fit=crop')"
          }}
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* GOLD LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C20,transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2
          }}
          viewport={{ once: true }}
          className="max-w-6xl"
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            FT2027 EXPERIENCE
          </span>

          <h2 className="mt-10 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-[10rem]">
            FEEL
            <br />
            THE ENERGY.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Une immersion totale dans la nouvelle génération
            des festivals culturels et musicaux africains.
          </p>
        </motion.div>
      </div>
    </section>
  );
}