"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mic2,
  Users,
  Sparkles,
  Globe2,
  CalendarDays,
  MapPin,
} from "lucide-react";

const speakers = [
  {
    name: "Mistermoo Mindset",
    role: "Fondateur & CEO — Xel Koom Consulting",
    tags: ["Coach", "Formateur", "Conférencier"],
    description:
      "Expert en développement personnel et en accompagnement vers la réussite, engagé auprès de la jeunesse et des entrepreneurs.",
    image: "/images/speakers/mistermoo-mindset.jpg",
    initials: "MM",
  },
  {
    name: "Coach Oldy Sow",
    role: "Conférencier • Écrivain • Juriste de formation",
    tags: ["Leadership", "Motivation", "Excellence"],
    description:
      "Intervenant inspirant autour du leadership, de l’éveil des consciences, de la discipline et du développement personnel.",
    image: "/images/speakers/oldy-sow.jpg",
    initials: "OS",
  },
];

const highlights = [
  {
    icon: Mic2,
    title: "Conférences",
    text: "Des prises de parole fortes autour du leadership, de la motivation et de la réussite.",
  },
  {
    icon: Users,
    title: "Ateliers",
    text: "Des espaces pratiques pour accompagner les jeunes talents et porteurs de projets.",
  },
  {
    icon: Sparkles,
    title: "Inspiration",
    text: "Des rencontres pensées pour révéler le potentiel et renforcer la confiance.",
  },
  {
    icon: Globe2,
    title: "Rayonnement international",
    text: "Une dynamique qui positionne Festival Talent comme une plateforme d’impact.",
  },
];

function SpeakerImage({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_38%),linear-gradient(135deg,#050505,#171717,#050505)]">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-3xl font-black text-yellow-300 shadow-2xl shadow-yellow-900/30">
          {initials}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setImageError(true)}
      className="object-cover object-top transition duration-700 group-hover:scale-105"
    />
  );
}

export default function TalentTalksSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-4xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            <Sparkles size={16} />
            Leadership • Motivation • Excellence
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-7xl">
            Talent Talks
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Panels & Coaching
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Festival Talent 2027 accueillera des panels exceptionnels autour du
            leadership, de la motivation, du développement personnel, de
            l’excellence, de l’entrepreneuriat et de la réussite. Ces rencontres
            réuniront coachs de vie, conférenciers, formateurs, entrepreneurs et
            figures inspirantes pour accompagner les jeunes talents.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/[0.06]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition group-hover:scale-110">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-bold text-white">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 shadow-2xl shadow-yellow-950/20 backdrop-blur-xl"
          >
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
              Invités d’honneur
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {speakers.map((speaker) => (
                <article
                  key={speaker.name}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-black/40 transition duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/[0.05]"
                >
                  <div className="relative h-80 overflow-hidden bg-zinc-950">
                    <SpeakerImage
                      src={speaker.image}
                      alt={speaker.name}
                      initials={speaker.initials}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black uppercase text-white">
                      {speaker.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-yellow-300">
                      {speaker.role}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {speaker.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 text-sm leading-6 text-white/65">
                      {speaker.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-400/20 blur-3xl" />

            <p className="relative text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
              Tournée Italie 2027
            </p>

            <h3 className="relative mt-4 text-3xl font-black uppercase text-white sm:text-4xl">
              Une vision internationale pour la jeunesse
            </h3>

            <p className="relative mt-5 text-sm leading-7 text-white/70">
              Dans le cadre de son rayonnement international, Festival Talent
              2027 prépare une série de rencontres en Italie autour du
              leadership, de la motivation, de l’excellence et de
              l’accompagnement des jeunes talents.
            </p>

            <div className="relative mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-yellow-300" size={22} />
                <div>
                  <p className="font-bold text-white">Lieu</p>
                  <p className="text-sm text-white/60">
                    Italie, plusieurs villes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CalendarDays className="mt-1 text-yellow-300" size={22} />
                <div>
                  <p className="font-bold text-white">Date</p>
                  <p className="text-sm text-white/60">
                    À partir de mars 2027
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="mt-1 text-yellow-300" size={22} />
                <div>
                  <p className="font-bold text-white">Public</p>
                  <p className="text-sm text-white/60">
                    Jeunes talents, entrepreneurs, porteurs de projets,
                    étudiants et leaders.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 rounded-2xl border border-yellow-400/20 bg-black/35 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-yellow-200">
                Au programme
              </p>

              <p className="mt-2 text-sm text-white/65">
                Conférences, ateliers, échanges, networking et rencontres
                inspirantes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}