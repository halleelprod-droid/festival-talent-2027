"use client";

import { motion } from "framer-motion";
import { Building2, Gem, Handshake, Medal, Shield, Star } from "lucide-react";

import { partnerStats, sponsorOpportunities } from "@/components/sections/constants";

const sponsorTiers = [
  {
    name: "Gold",
    icon: Gem,
    tone: "border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#F6D77A]",
    description:
      "Visibilite dominante, activations de marque, presence scene et couverture media prioritaire.",
  },
  {
    name: "Silver",
    icon: Medal,
    tone: "border-white/20 bg-white/[0.06] text-zinc-100",
    description:
      "Presence premium sur les supports officiels, stand partenaire et campagnes digitales.",
  },
  {
    name: "Bronze",
    icon: Star,
    tone: "border-[#B8895B]/40 bg-[#B8895B]/10 text-[#E8B98B]",
    description:
      "Logo officiel, mentions reseaux sociaux et visibilite sur les supports de communication.",
  },
  {
    name: "Institutionnels",
    icon: Building2,
    tone: "border-blue-400/40 bg-blue-500/10 text-blue-200",
    description:
      "Partenariats publics, diplomatiques et culturels autour de la jeunesse et de l'innovation.",
  },
];

export default function PartnersPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />
      <motion.div
        animate={{ rotate: [-14, -8, -14], opacity: [0.14, 0.3, 0.14] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="stage-beam left-[9%]"
      />
      <motion.div
        animate={{ rotate: [16, 9, 16], opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="stage-beam right-[8%]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Partenaires & Sponsors
          </p>

          <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
            Construire
            <br />
            avec FT2027.
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Festival Talent 2027 ouvre ses portes aux marques, institutions et
            partenaires qui souhaitent soutenir une vision culturelle africaine
            moderne, jeune et internationale.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
          whileHover={{ y: -8, rotateX: 2 }}
          className="premium-card mt-20 overflow-hidden rounded-[2rem] p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.24),transparent_42%)]" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-300/30 bg-black/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
                <Shield size={16} />
                Premier partenaire officiel majeur
              </div>

              <h2 className="mt-8 text-5xl font-black leading-none md:text-7xl">
                Union
                <br />
                Europeenne
              </h2>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-blue-50/75">
                Union Europeenne accompagne Festival Talent 2027 dans sa
                mission de valorisation de la jeunesse, de la creativite, de
                innovation et des industries culturelles africaines.
              </p>
            </div>

            <div className="relative z-10 rounded-[1.5rem] border border-white/10 bg-black/40 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
                Mise en avant prioritaire
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  "Hero partenaires",
                  "Sections sponsors",
                  "SEO et partage social",
                  "Supports institutionnels",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 text-zinc-200"
                  >
                    <Handshake size={18} className="text-blue-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partnerStats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 1 }}
              whileHover={{ y: -8, rotateX: 4 }}
              className="premium-card rounded-[2rem] p-8"
            >
              <h2 className="text-5xl font-black text-[#C9A84C]">
                {item.value}
              </h2>
              <p className="mt-5 text-zinc-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <section className="mt-24">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
            Sponsors Premium
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sponsorTiers.map((tier) => {
              const Icon = tier.icon;

              return (
                <motion.div
                  key={tier.name}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className={`premium-card rounded-[2rem] p-8 ${tier.tone}`}
                >
                  <Icon size={28} />
                  <h2 className="mt-6 text-3xl font-black">{tier.name}</h2>
                  <p className="mt-5 leading-relaxed text-white/70">
                    {tier.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-24">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
            Opportunites
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            {sponsorOpportunities.map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -4, scale: 1.03 }}
                className="rounded-full border border-[#C9A84C]/20 bg-white/[0.03] px-8 py-4 text-zinc-300 shadow-[0_0_25px_rgba(201,168,76,0.06)]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          whileHover={{ y: -8 }}
          className="premium-card mt-24 rounded-[3rem] p-12 text-center"
        >
          <h2 className="text-5xl font-black leading-none md:text-7xl">
            Devenir
            <br />
            partenaire.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Rejoignez experience FT2027 et participez a la creation du prochain
            evenement culturel international nouvelle generation.
          </p>

          <button className="luxury-cta mt-12 rounded-full bg-[#C9A84C] px-10 py-5 font-semibold text-black transition hover:scale-105">
            <span className="relative z-10">Devenir partenaire</span>
          </button>
        </motion.section>
      </div>
    </main>
  );
}
