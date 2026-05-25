'use client';

import { motion } from 'framer-motion';

const tickets = [
  {
    name: 'STANDARD',
    price: '15€',
    features: [
      'Accès festival',
      'Concerts',
      'Fashion shows',
      'Zones publiques'
    ]
  },

  {
    name: 'VIP',
    price: '50€',
    features: [
      'Fast access',
      'VIP Zone',
      'Premium seating',
      'Exclusive gifts'
    ]
  },

  {
    name: 'ULTRA',
    price: '120€',
    features: [
      'Backstage',
      'Artist access',
      'Private lounge',
      'Premium experience'
    ]
  }
];

export default function TicketsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Tickets
          </p>

          <h1
            className="
              mt-8
              text-6xl
              font-black
              leading-[0.9]
              tracking-[-0.07em]
              md:text-8xl
            "
          >
            Choose
            <br />
            Your Experience.
          </h1>

          <p
            className="
              mt-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Découvrez les différentes expériences
            proposées pour vivre FT2027.
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
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 1
                }}
                whileHover={{
                  y: -10
                }}
                className="
                  glass
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  p-10
                "
              >
                {/* GLOW */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_70%)] opacity-0 transition duration-700 hover:opacity-100" />

                <div className="relative z-10">
                  {/* NAME */}
                  <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
                    {ticket.name}
                  </p>

                  {/* PRICE */}
                  <h2 className="mt-8 text-6xl font-black">
                    {ticket.price}
                  </h2>

                  {/* FEATURES */}
                  <div className="mt-10 flex flex-col gap-5">
                    {ticket.features.map(
                      (
                        feature
                      ) => (
                        <div
                          key={feature}
                          className="flex items-center gap-4"
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
                    className="
                      mt-12
                      w-full
                      rounded-full
                      bg-[#C9A84C]
                      px-8
                      py-5
                      font-semibold
                      text-black
                      transition
                      hover:scale-[1.02]
                      hover:shadow-[0_0_35px_rgba(201,168,76,0.45)]
                    "
                  >
                    Réserver
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </main>
  );
}