'use client';

import { motion } from 'framer-motion';

const tickets = [
  {
    name: 'Pass Standard',
    status: 'Reservation prochainement',
    features: [
      'Acces general',
      'Concerts live',
      'Village culturel',
      'Zones publiques',
    ],
  },
  {
    name: 'Pass VIP',
    status: 'Reservation prochainement',
    featured: true,
    features: [
      'Acces prioritaire',
      'Zone VIP',
      'Placement premium',
      'Accueil dedie',
    ],
  },
  {
    name: 'Pass Premium',
    status: 'Reservation prochainement',
    features: [
      'Lounge premium',
      'Backstage encadre',
      'Hospitalite premium',
      'Experience exclusive',
    ],
  },
];

export default function TicketsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Billetterie
          </span>

          <h2 className="mt-8 text-5xl font-black leading-none md:text-7xl lg:text-[8rem]">
            Choisissez
            <br />
            votre pass.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Reservez votre place pour vivre FT2027 entre Paris et Rome dans une
            experience immersive premium.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-8 [perspective:1200px] lg:grid-cols-3">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, rotateX: 4, rotateY: index === 0 ? -4 : index === 2 ? 4 : 0 }}
              className={`premium-card relative overflow-hidden rounded-[2rem] p-10 ${
                ticket.featured
                  ? 'ring-1 ring-[#C9A84C]/50'
                  : ''
              }`}
            >
              <div className="relative z-10">
                <span className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                  {ticket.name}
                </span>

                <div className="mt-8 inline-flex rounded-full border border-[#C9A84C]/35 bg-black/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F6D77A]">
                  {ticket.status}
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  {ticket.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#C9A84C]" />
                      <p className="text-zinc-300">{feature}</p>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-12 w-full rounded-full px-6 py-4 font-semibold transition ${
                    ticket.featured ? 'luxury-cta bg-[#C9A84C] text-black' : 'glass text-white'
                  }`}
                >
                  Etre informe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
