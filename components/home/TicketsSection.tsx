'use client';

import {
  motion
} from 'framer-motion';

const tickets = [
  {
    name: 'STANDARD',
    price: '25€',
    features: [
      'Accès général',
      'Concerts live',
      'Food village',
      'Experience zones'
    ]
  },

  {
    name: 'VIP',
    price: '80€',
    featured: true,
    features: [
      'Zone VIP',
      'Fast access',
      'VIP lounge',
      'Exclusive merch'
    ]
  },

  {
    name: 'ULTRA',
    price: '150€',
    features: [
      'Backstage access',
      'Meet & greet',
      'Premium experience',
      'Private zone'
    ]
  }
];

export default function TicketsSection() {
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
            Tickets
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
            Choose
            <br />
            Your Experience.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Réservez votre place pour vivre FT2027
            au cœur de Dakar dans une expérience immersive.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {tickets.map(
            (
              ticket,
              index
            ) => (
              <motion.div
                key={ticket.name}
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
                  y: -10
                }}
                className={`
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  p-10
                  ${
                    ticket.featured
                      ? 'border-[#C9A84C]/40 bg-[#C9A84C]/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }
                `}
              >
                {/* GLOW */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_70%)]
                  "
                />

                <div className="relative z-10">
                  {/* TYPE */}
                  <span className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                    {ticket.name}
                  </span>

                  {/* PRICE */}
                  <h3 className="mt-8 text-6xl font-black">
                    {ticket.price}
                  </h3>

                  {/* FEATURES */}
                  <div className="mt-10 flex flex-col gap-4">
                    {ticket.features.map(
                      (
                        feature
                      ) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />

                          <p className="text-zinc-300">
                            {feature}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  {/* BUTTON */}
                  <button
                    className={`
                      mt-12
                      w-full
                      rounded-full
                      px-6
                      py-4
                      font-semibold
                      transition
                      ${
                        ticket.featured
                          ? 'bg-[#C9A84C] text-black'
                          : 'glass text-white'
                      }
                    `}
                  >
                    Réserver
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}