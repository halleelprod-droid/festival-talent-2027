'use client';

import Image from 'next/image';

import {
  motion
} from 'framer-motion';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop'
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-40 text-[#F5F0E8]">
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
            Gallery Experience
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Une immersion
            <br />
            visuelle totale.
          </h2>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300">
            FT2027 mélange performances live, lumière, culture,
            énergie urbaine et storytelling dans une expérience
            pensée comme un film vivant.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
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
                scale: 1.02
              }}
              className={`
                group relative overflow-hidden rounded-[2.5rem]
                border border-white/10
              ${
                index % 2 === 0
                  ? 'md:translate-y-10'
                  : ''
              }
              `}
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src}
                  alt="FT2027 Gallery"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                {/* GOLD LIGHT */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="uppercase tracking-[0.3em] text-xs text-[#C9A84C]">
                  FT2027 EXPERIENCE
                </span>

                <h3 className="mt-4 text-3xl font-black md:text-5xl">
                  Dakar Nights
                </h3>

                <p className="mt-4 text-zinc-300">
                  Culture • Music • Future
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}