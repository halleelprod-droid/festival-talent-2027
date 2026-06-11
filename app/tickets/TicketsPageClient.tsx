"use client";

import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Ticket } from "lucide-react";

const tickets = [
  {
    name: "Pass Standard",
    status: "Reservation prochainement",
    icon: Ticket,
    note: "Acces essentiel",
    features: [
      "Acces general au festival",
      "Concerts et scenes publiques",
      "Village culturel et food court",
      "Animations et experiences ouvertes",
    ],
  },
  {
    name: "Pass VIP",
    status: "Reservation prochainement",
    icon: Sparkles,
    note: "Experience recommandee",
    featured: true,
    features: [
      "Acces prioritaire",
      "Zone VIP dediee",
      "Placement premium selon disponibilite",
      "Accueil dedie et avantages partenaires",
    ],
  },
  {
    name: "Pass Premium",
    status: "Reservation prochainement",
    icon: Crown,
    note: "Experience luxe",
    features: [
      "Lounge premium",
      "Acces backstage encadre",
      "Hospitalite premium",
      "Experience exclusive Festival Talent",
    ],
  },
];

export default function TicketsPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />
      <motion.div
        animate={{ rotate: [-12, -6, -12], opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="stage-beam left-[8%]"
      />
      <motion.div
        animate={{ rotate: [14, 8, 14], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="stage-beam right-[10%]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Billetterie officielle
          </p>

          <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
            Choisissez
            <br />
            votre pass.
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Trois niveaux acces pour vivre Festival Talent 2027 avec le bon
            niveau de confort, de visibilite et exclusivite.
          </p>
        </motion.div>

        <div className="mt-24 grid gap-8 [perspective:1200px] lg:grid-cols-3">
          {tickets.map((ticket, index) => {
            const Icon = ticket.icon;

            return (
              <motion.div
                key={ticket.name}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1 }}
                whileHover={{ y: -14, rotateX: 4, rotateY: index === 0 ? -4 : index === 2 ? 4 : 0 }}
                className={`premium-card relative overflow-hidden rounded-[2rem] p-10 ${
                  ticket.featured
                    ? "ring-1 ring-[#C9A84C]/50 shadow-[0_0_80px_rgba(201,168,76,0.18)]"
                    : ""
                }`}
              >
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#C9A84C]/15 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
                        {ticket.note}
                      </p>
                      <h2 className="mt-5 text-3xl font-black">
                        {ticket.name}
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/40 text-[#C9A84C]">
                      <Icon size={24} />
                    </div>
                  </div>

                  <div className="mt-8 inline-flex rounded-full border border-[#C9A84C]/35 bg-black/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#F6D77A]">
                    {ticket.status}
                  </div>

                  <div className="mt-10 flex flex-col gap-5">
                    {ticket.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <Check
                          size={18}
                          className="mt-1 shrink-0 text-[#C9A84C]"
                        />
                        <p className="text-zinc-300">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <button className="luxury-cta mt-12 w-full rounded-full bg-[#C9A84C] px-8 py-5 font-semibold text-black transition hover:scale-[1.02]">
                    <span className="relative z-10">Etre informe</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
