"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  Globe2,
  MapPin,
  Mic2,
  Plane,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20les%20pr%C3%A9-s%C3%A9lections%20et%20les%20Battles%20de%20Danse.";

const highlights = [
  {
    icon: Globe2,
    label: "Destination",
    value: "Paris & Rome",
  },
  {
    icon: Sparkles,
    label: "Pré-sélections",
    value: "Ouvertes",
  },
  {
    icon: Trophy,
    label: "Battle All Style",
    value: "500.000 FCFA",
  },
  {
    icon: Plane,
    label: "Prix spécial",
    value: "Voyage en Italie",
  },
];

const quickFacts = [
  "Samba Peuzzi, Morijah et Cysoul confirmés",
  "Union Européenne partenaire officiel majeur",
  "PIN EVENTS partenaire événementiel officiel",
  "Solos, groupes, tous styles, toutes zones",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 pb-20 pt-36 text-white sm:px-10 lg:px-20 lg:pt-44">
      <div className="absolute inset-0">
        <Image
          src="/images/previous/scene.jpg"
          alt="Festival Talent"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.22),transparent_35%)]" />
      </div>

      <div className="pointer-events-none absolute -left-40 top-28 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300 backdrop-blur-xl">
            <Crown size={16} />
            Festival Talent 2027
          </div>

          <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
            Révélons
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              les talents
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            Festival Talent 2027 ouvre ses pré-sélections et lance le Battle
            All Style par zones. Une aventure culturelle et internationale entre
            le Sénégal, Paris, Rome et l’Italie.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {quickFacts.map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl"
              >
                {fact}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black shadow-2xl shadow-yellow-900/30 transition hover:scale-105"
            >
              S’inscrire aux pré-sélections
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/programme"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/85 backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              Voir le programme
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-bold text-white/60 transition hover:text-yellow-300"
            >
              Infos & inscriptions WhatsApp : 781 948 606
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-black/45 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">
              <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                  Battle All Style par zones
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  500.000
                  <span className="block text-2xl text-yellow-300 sm:text-3xl">
                    FCFA à gagner
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/60">
                  Solos, groupes, tous styles et toutes zones. Le gagnant ou le
                  groupe gagnant remporte son voyage en Italie.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <MapPin className="text-yellow-300" size={24} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Zones
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      12 régions
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <Users className="text-yellow-300" size={24} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Catégories
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      Solo / Groupe
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <Mic2 className="text-yellow-300" size={24} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Artiste
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      Samba Peuzzi
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <Plane className="text-yellow-300" size={24} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Prix
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      Italie
                    </p>
                  </div>
                </div>

                <Link
                  href="/programme"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
                >
                  Découvrir les battles
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
            >
              <Icon className="text-yellow-300" size={26} />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-white/35">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-black uppercase text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
