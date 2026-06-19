"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Play,
  Sparkles,
  Users,
} from "lucide-react";

const heroStats = [
  {
    icon: CalendarDays,
    label: "Période",
    value: "Janvier - Avril 2027",
  },
  {
    icon: MapPin,
    label: "Tournée",
    value: "Paris & Rome",
  },
  {
    icon: Users,
    label: "Pré-sélections",
    value: "8 disciplines",
  },
];

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/previous/scene.jpg"
          alt="Festival Talent"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />

        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setShowVideo(false)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.14),transparent_30%)]" />
      </div>

      <div className="pointer-events-none absolute left-10 top-32 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-10 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-36 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300 backdrop-blur-xl">
            <Sparkles size={16} />
            Festival Talent 2027
            <span className="hidden h-1 w-1 rounded-full bg-yellow-300 sm:block" />
            <span>Paris & Rome</span>
          </div>

          <h1 className="mt-8 text-5xl font-black uppercase leading-[0.88] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[9.5rem]">
            Révèle
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              ton talent
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-lg lg:text-xl">
            Festival Talent 2027 prépare une tournée européenne entre Paris et
            Rome, précédée par des pré-sélections officielles dans huit
            disciplines : danse, musique, mode, art, entrepreneuriat,
            technologie, culture urbaine et sports mécaniques.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-yellow-400/25 bg-black/40 px-5 py-4 text-sm font-bold text-white/80 backdrop-blur-xl">
            <BadgeCheck size={20} className="text-yellow-300" />
            <span>
              Artiste confirmé :{" "}
              <strong className="text-yellow-300">Samba Peuzzi</strong>
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black shadow-2xl shadow-yellow-900/40 transition hover:scale-105"
            >
              S&apos;inscrire aux pré-sélections
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/programme"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/85 backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              Voir le programme
            </Link>

            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/85 backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              <Play size={16} />
              Archives
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={23} />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-white/45">
                  {stat.label}
                </p>

                <p className="mt-2 text-xl font-black uppercase text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}