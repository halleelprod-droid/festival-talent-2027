"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CircleDot,
  Gem,
  Handshake,
  Lightbulb,
  Mic2,
  Network,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const offerCards = [
  { title: "Visibilite", icon: Star },
  { title: "Coaching", icon: Target },
  { title: "Networking", icon: Network },
  { title: "Accompagnement", icon: Handshake },
  { title: "Rencontres professionnelles", icon: BriefcaseBusiness },
  { title: "Opportunites artistiques", icon: Sparkles },
  { title: "Experience scenique", icon: Mic2 },
  { title: "Communaute", icon: Users },
];

const methodSteps = [
  "Inscription",
  "Preselections",
  "Formation",
  "Coaching",
  "Mentorat",
  "Finale",
  "Accompagnement apres le festival",
];

const differentiators = [
  { value: "8+", label: "Disciplines", text: "Plusieurs univers artistiques et creatifs." },
  { value: "2", label: "Coachs reconnus", text: "Mister Moo, Oldy Sow et un reseau en evolution." },
  { value: "3", label: "Artistes confirmes", text: "Samba Peuzzi, Morijah et Cysoul." },
  { value: "6+", label: "Partenaires", text: "Structures strategiques, medias et institutions." },
  { value: "10 ans", label: "Vision long terme", text: "Une plateforme pensee au-dela d'une edition." },
];

const partnerCards = [
  {
    name: "PIN EVENTS",
    role: "Production evenementielle, partenariats et relations institutionnelles",
    logo: "/images/partners/pin-events.png",
  },
  {
    name: "Agence Diassnor",
    role: "Pole Danse, battles et coordination artistique",
    logo: "/images/partners/agence-diassnor.png",
  },
  {
    name: "Futurs partenaires",
    role: "Institutions, marques, medias, academies et acteurs culturels",
  },
];

function PartnerLogo({ src, name }: { src?: string; name: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg border border-yellow-400/20 bg-black/55 px-4 text-center text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
        {name}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Logo ${name}`}
      width={220}
      height={110}
      className="mx-auto h-20 w-auto object-contain"
      onError={() => setHasError(true)}
    />
  );
}

export default function PourquoiFestivalTalentPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(12,8,3,0.98),#000)]" />

      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Sparkles size={16} aria-hidden="true" />
              Plateforme culturelle africaine
            </div>

            <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Pourquoi
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                Festival Talent ?
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
              Plus qu&apos;un festival, une plateforme qui revele, accompagne et
              propulse les talents africains.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/preselections"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
              >
                Je participe
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/preselections"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-white/85 transition hover:border-yellow-400/45 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
              >
                Decouvrir les preselections
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="relative overflow-hidden rounded-lg border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto flex aspect-square max-w-sm items-center justify-center rounded-lg border border-white/10 bg-black/45 p-10">
                <Image
                  src="/images/festival-talent-logo.webp"
                  alt="Logo Festival Talent"
                  width={360}
                  height={360}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {["Reveler", "Former", "Propulser"].map((word) => (
                  <div
                    key={word}
                    className="rounded-lg border border-yellow-400/20 bg-black/35 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-yellow-300"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Target size={16} aria-hidden="true" />
              Notre Mission
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Creer des opportunites concretes
            </h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
            <p className="text-base leading-8 text-white/68 sm:text-lg">
              Festival Talent est ne d&apos;une conviction simple : chaque jeune
              possede un talent qui merite d&apos;etre decouvert.
            </p>
            <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
              Notre mission est de creer des opportunites concretes dans les
              domaines de la musique, de la danse, de la mode, de la culture
              urbaine, du digital et de l&apos;innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Gem size={16} aria-hidden="true" />
              Ce que nous offrons
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Une plateforme, plusieurs leviers
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offerCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.55 }}
                  className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/45"
                >
                  <Icon className="text-yellow-300" size={28} aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-black uppercase text-white">
                    {card.title}
                  </h3>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Rocket size={16} aria-hidden="true" />
              Notre methode
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              De l&apos;inscription a l&apos;apres festival
            </h2>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-yellow-300 via-red-500 to-yellow-300 md:left-1/2" />
            <div className="space-y-8">
              {methodSteps.map((step, index) => (
                <motion.article
                  key={step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className={`relative grid gap-5 md:grid-cols-2 ${
                    index % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <div className="ml-16 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:ml-0">
                    <div className="absolute left-3 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-yellow-400/35 bg-black text-yellow-300 md:left-1/2 md:-translate-x-1/2">
                      <CircleDot size={15} aria-hidden="true" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-300">
                      Etape {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-black uppercase text-white">
                      {step}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Trophy size={16} aria-hidden="true" />
              Pourquoi nous sommes differents
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Des preuves, pas seulement des promesses
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {differentiators.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.55 }}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <BadgeCheck className="text-yellow-300" size={25} aria-hidden="true" />
                <p className="mt-5 text-4xl font-black uppercase text-white">
                  {item.value}
                </p>
                <h3 className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              <Handshake size={16} aria-hidden="true" />
              Nos partenaires
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Des structures qui renforcent la mission
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {partnerCards.map((partner, index) => (
              <motion.article
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 text-center shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/45"
              >
                <PartnerLogo src={partner.logo} name={partner.name} />
                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  {partner.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {partner.role}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-lg border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <Lightbulb className="mx-auto text-yellow-300" size={38} aria-hidden="true" />
          <h2 className="mx-auto mt-7 max-w-4xl text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
            Nous ne cherchons pas uniquement les meilleurs.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-8 text-white/75">
            Nous revelons ceux que personne n&apos;avait encore remarques.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
            Le talent est un don.
            <span className="block text-yellow-300">Le travail est un choix.</span>
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              Festival Talent vous donne l&apos;opportunite.
            </span>
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              Participer
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/activites"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-white/85 transition hover:border-yellow-400/45 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              Decouvrir les activites
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
