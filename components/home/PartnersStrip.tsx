'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import {
  partnersLogos
} from '@/components/sections/constants';

export default function PartnersStrip() {
  const duplicatedLogos = [
    ...partnersLogos,
    ...partnersLogos
  ];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-16">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C08,transparent_70%)]" />

      {/* TOP */}
      <div className="relative z-10 mb-14 text-center">
        <p className="text-sm uppercase tracking-[0.45em] text-[#C9A84C]">
          Official Partners
        </p>
      </div>

      {/* MARQUEE */}
      <div className="relative overflow-hidden">
        {/* LEFT FADE */}
        <div className="absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-black to-transparent" />

        {/* RIGHT FADE */}
        <div className="absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-black to-transparent" />

        <motion.div
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            repeat: Infinity,
            duration: 24,
            ease: 'linear'
          }}
          className="flex w-max gap-8"
        >
          {duplicatedLogos.map(
            (
              partner,
              index
            ) => (
              <motion.div
                key={`${partner.name}-${index}`}
                whileHover={{
                  y: -5,
                  scale: 1.03
                }}
                className="
                  glass
                  flex
                  h-[140px]
                  w-[240px]
                  items-center
                  justify-center
                  rounded-[1.8rem]
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-10
                "
              >
                {partner.image ? (
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={180}
                    height={70}
                    className="
                      max-h-[70px]
                      w-auto
                      object-contain
                      opacity-75
                      transition
                      duration-500
                      hover:opacity-100
                    "
                  />
                ) : (
                  <span className="text-center text-lg font-black uppercase tracking-[0.2em] text-blue-200">
                    {partner.name}
                  </span>
                )}
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
