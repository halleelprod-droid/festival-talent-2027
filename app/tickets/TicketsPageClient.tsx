"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  Gem,
  Sparkles,
  Ticket,
  Users,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const passes = [
  {
    name: "Pass Standard",
    label: "Accès public",
    status: "Réservation prochainement",
    icon: Ticket,
    description:
      "Une formule pensée pour vivre l’expérience Festival Talent 2027 et accéder aux grands moments ouverts au public.",
    features: [
      "Accès aux espaces publics du festival",
      "Expériences culturelles et créatives",
      "Animations, découvertes et moments live",
      "Accès selon programme officiel",
    ],
  },
  {
    name: "Pass VIP",
    label: "Expérience privilégiée",
    status: "Places limitées",
    icon: Crown,
    description:
      "Une expérience plus confortable avec un accès privilégié à certains espaces, rencontres et moments forts du festival.",
    features: [
      "Accès privilégié selon disponibilité",
      "Accueil dédié",
      "Meilleure expérience de circulation",
      "Accès aux temps forts sélectionnés",
    ],
    highlighted: true,
  },
  {
    name: "Pass Premium",
    label: "Expérience prestige",
    status: "Sur demande",
    icon: Gem,
    description:
      "Une formule haut de gamme pour partenaires, invités, entrepreneurs, institutions et profils premium.",
    features: [
      "Accès premium selon validation",
      "Networking et rencontres ciblées",
      "Expérience institutionnelle renforcée",
      "Accompagnement personnalisé",
    ],
  },
];

const infoCards = [
  {
    icon: Clock3,
    title: "Billetterie en préparation",
    text: "Les modalités officielles seront annoncées après validation du programme complet.",
  },
  {
    icon: ShieldCheck,
    title: "Réservation sécurisée",
    text: "Les pass seront communiqués uniquement via les canaux officiels Festival Talent.",
  },
  {
    icon: Users,
    title: "Public ciblé",
    text: "Jeunes talents, créateurs, entrepreneurs, étudiants, partenaires et passionnés de culture.",
  },
];

export default function TicketsPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-20 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute -left-32 bottom-20 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[120px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <Sparkles size={16} />
            Billetterie officielle
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl">
            Choisissez votre
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              expérience
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 prépare une billetterie pensée pour accueillir
            le public, les VIP, les partenaires et les profils premium dans les
            meilleures conditions. Les prix officiels seront communiqués après
            validation du programme complet.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {passes.map((pass, index) => {
            const Icon = pass.icon;

            return (
              <motion.article
                key={pass.name}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
                className={`group relative overflow-hidden rounded-[2.2rem] border p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 ${
                  pass.highlighted
                    ? "border-yellow-400/45 bg-yellow-400/[0.09]"
                    : "border-white/10 bg-white/[0.04] hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                {pass.highlighted && (
                  <div className="absolute right-5 top-5 rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-black">
                    Recommandé
                  </div>
                )}

                <div className="relative">
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 shadow-2xl shadow-yellow-950/30 transition duration-300 group-hover:scale-110">
                    <Icon size={30} />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                    {pass.label}
                  </p>

                  <h2 className="mt-4 text-3xl font-black uppercase text-white">
                    {pass.name}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    {pass.description}
                  </p>

                  <div className="mt-7 rounded-2xl border border-yellow-400/20 bg-black/35 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                      Statut
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {pass.status}
                    </p>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {pass.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-white/70"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/fr#newsletter"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition duration-300 ${
                      pass.highlighted
                        ? "bg-yellow-400 text-black hover:bg-white"
                        : "border border-white/15 bg-white/10 text-white hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                    }`}
                  >
                    Être informé
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {infoCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-black uppercase text-white">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl font-black uppercase text-white">
            Vous êtes une entreprise, une institution ou un sponsor ?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Des accès spécifiques pourront être proposés aux partenaires,
            invités officiels, médias et institutions dans le cadre du dispositif
            Festival Talent 2027.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/partners"
              className="rounded-full bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105 hover:bg-white"
            >
              Devenir partenaire
            </Link>

            <Link
              href="/fr#newsletter"
              className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Recevoir les infos
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}