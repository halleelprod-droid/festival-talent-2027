"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Film,
  ImageIcon,
  Mic2,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";

const archiveVideos = [
  {
    title: "Interviews & témoignages",
    category: "Archives vidéo",
    description:
      "Retrouvez les paroles, impressions et retours des participants autour de la première édition de Festival Talent.",
    url: "https://www.youtube.com/watch?v=77w8NnB_B6A",
  },
  {
    title: "Coulisses du premier festival",
    category: "Backstage",
    description:
      "Un aperçu des préparatifs, de l’ambiance terrain et des moments forts vécus lors du premier Festival Talent.",
    url: "https://www.youtube.com/watch?v=77w8NnB_B6A",
  },
  {
    title: "Performances & moments live",
    category: "Live",
    description:
      "Des extraits et contenus officiels issus de la première édition, entre scène, énergie et public.",
    url: "https://www.youtube.com/watch?v=77w8NnB_B6A",
  },
];

const mediaTypes = [
  {
    icon: Film,
    title: "Archives vidéo",
    text: "Interviews, coulisses, performances et contenus officiels de la première édition.",
  },
  {
    icon: Camera,
    title: "Photos officielles",
    text: "Moments forts, portraits, public, scène, partenaires et ambiance du festival.",
  },
  {
    icon: Mic2,
    title: "Interviews",
    text: "Paroles d’artistes, jeunes talents, organisateurs, invités et partenaires.",
  },
  {
    icon: ImageIcon,
    title: "Galerie",
    text: "Une sélection visuelle pensée pour valoriser l’expérience Festival Talent.",
  },
];

export default function MediaPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-20 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute -left-36 bottom-32 h-[460px] w-[460px] rounded-full bg-yellow-400/10 blur-[130px]" />
      <div className="absolute -right-36 top-52 h-[460px] w-[460px] rounded-full bg-orange-500/10 blur-[130px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <Sparkles size={16} />
            Média officiel
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl">
            Archives vidéo
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              du premier Festival Talent
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Revivez les premiers moments de Festival Talent : interviews,
            coulisses, performances et contenus officiels de la première
            édition. Ces archives racontent les fondations d’un projet culturel,
            jeunesse et créatif appelé à grandir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.12] via-white/[0.05] to-white/[0.02] p-6 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl lg:p-10"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 p-6">
              <div className="aspect-video overflow-hidden rounded-[1.5rem] border border-yellow-400/20 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_40%),linear-gradient(135deg,#050505,#141414,#050505)]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="mx-auto text-yellow-300" size={74} />
                    <p className="mt-5 text-sm font-black uppercase tracking-[0.28em] text-yellow-300">
                      Première édition
                    </p>
                    <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                      Archives officielles
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                <Video size={15} />
                Contenus historiques
              </p>

              <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Les premières images d’une ambition devenue mouvement.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/65">
                Les vidéos actuellement affichées proviennent du premier
                Festival Talent. Elles ne sont pas aléatoires : elles témoignent
                des débuts du projet, de son énergie, de ses rencontres et de sa
                volonté de révéler les talents.
              </p>

              <Link
                href="https://www.youtube.com/watch?v=77w8NnB_B6A"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105 hover:bg-white"
              >
                Voir la vidéo archive
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mediaTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition duration-300 group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-xl font-black uppercase text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
              Sélection vidéo
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Revivre les moments
              <span className="block text-yellow-300">
                du premier Festival Talent
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
              Une sélection d’archives pensée pour présenter l’énergie, les
              coulisses et les contenus officiels qui ont marqué les débuts du
              festival.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {archiveVideos.map((video, index) => (
              <motion.article
                key={video.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
              >
                <div className="relative aspect-video bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_40%),linear-gradient(135deg,#050505,#141414,#050505)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle
                      size={58}
                      className="text-yellow-300 transition group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute left-5 top-5 rounded-full border border-yellow-400/30 bg-black/50 px-4 py-2 text-xs font-black uppercase tracking-wide text-yellow-300 backdrop-blur-xl">
                    {video.category}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black uppercase text-white">
                    {video.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {video.description}
                  </p>

                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 text-sm font-black uppercase tracking-wide text-yellow-300 transition hover:text-white"
                  >
                    Regarder
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl font-black uppercase text-white">
            Vous avez des contenus officiels du premier Festival Talent ?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Photos, vidéos, interviews, backstage ou moments forts peuvent être
            intégrés à la mémoire officielle du festival après validation.
          </p>

          <Link
            href="/fr#newsletter"
            className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105 hover:bg-white"
          >
            Proposer un contenu
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}