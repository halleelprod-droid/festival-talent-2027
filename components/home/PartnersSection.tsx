'use client';

import {
  motion
} from 'framer-motion';

const partners = [
  'EUROPEAN UNION',
  'FT2027',
  'DAKAR CULTURE',
  'AFRICA FUTURE',
  'LIVE EXPERIENCE',
  'GLOBAL PARTNER'
];

export default function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Official Partners
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-[0.9]
              tracking-[-0.05em]
              md:text-7xl
              lg:text-[8rem]
            "
          >
            Building
            <br />
            The Future Together.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            FT2027 collabore avec des partenaires internationaux,
            culturels et institutionnels pour créer une expérience
            unique à Dakar.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {partners.map(
            (
              partner,
              index
            ) => (
              <motion.div
                key={partner}
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
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition
                    duration-700
                    group-hover:opacity-100
                    bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_70%)]
                  "
                />

                <div className="relative z-10">
                  {/* LABEL */}
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Official Partner
                  </span>

                  {/* NAME */}
                  <h3 className="mt-8 text-3xl font-black leading-tight">
                    {partner}
                  </h3>

                  {/* LINE */}
                  <div className="mt-10 h-px w-full bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />

                  {/* FOOTER */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />

                    <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                      FT2027 Network
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}