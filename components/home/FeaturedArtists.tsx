"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Mic2, Sparkles } from "lucide-react";

const confirmedArtist = {
  name: "Samba Peuzzi",
  role: "Artiste confirmé",
  image: "/images/samba.jpg",
  description:
    "Samba Peuzzi est le premier artiste officiellement confirmé pour Festival Talent 2027. Sa présence marque une étape forte dans la construction de la programmation artistique du festival.",
  tags: ["Musique", "Culture urbaine", "Performance live"],
};

export default function FeaturedArtists() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,10,3,0.96),#000)]" />
      <div className="absolute -left-36 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -right-36 bottom-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
            <BadgeCheck size={17} />
            Artiste confirmé
          </div>

          <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Premier artiste
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              officiellement confirmé
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 dévoile progressivement sa programmation
            artistique. Pour le moment, Samba Peuzzi est le seul artiste
            officiellement confirmé.
          </p>
        </motion.div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-[3rem] border border-yellow-400/30 bg-white/[0.04] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="relative h-[520px] overflow-hidden rounded-[2.4rem] bg-zinc-950 sm:h-[620px] lg:h-[680px]">
              <Image
                src={confirmedArtist.image}
                alt={confirmedArtist.name}
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-md">
                  <Sparkles size={15} />
                  Confirmé 2027
                </div>

                <h3 className="mt-5 text-4xl font-black uppercase text-white sm:text-5xl">
                  {confirmedArtist.name}
                </h3>

                <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-white/55">
                  {confirmedArtist.role}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 lg:p-12"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
              <Mic2 size={30} />
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              Programmation officielle
            </p>

            <h3 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Samba Peuzzi
            </h3>

            <p className="mt-6 text-base leading-8 text-white/65">
              {confirmedArtist.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {confirmedArtist.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-6">
              <p className="text-sm leading-7 text-white/65">
                Les prochaines annonces artistiques seront communiquées
                progressivement via les canaux officiels du Festival Talent.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/artists"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Voir la page artiste
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/programme"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Voir le programme
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}