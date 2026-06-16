"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Clapperboard,
  Film,
  ImageIcon,
  Play,
  Sparkles,
} from "lucide-react";

const archiveStats = [
  {
    value: "01",
    label: "Édition passée",
  },
  {
    value: "07",
    label: "Archives photo",
  },
  {
    value: "100%",
    label: "Souvenirs officiels",
  },
];

const festivalGalleryImages = [
  {
    src: "/images/previous/scene.jpg",
    title: "Scène & ambiance",
    label: "Moment fort",
  },
  {
    src: "/images/previous/public.jpg",
    title: "Public du festival",
    label: "Énergie",
  },
  {
    src: "/images/previous/fashion.jpg",
    title: "Mode & création",
    label: "Fashion",
  },
  {
    src: "/images/previous/djyou.jpg",
    title: "DJ You",
    label: "Direction artistique",
  },
  {
    src: "/images/previous/dip.jpg",
    title: "Prestation live",
    label: "Performance",
  },
  {
    src: "/images/previous/zairah.jpg",
    title: "Zairah Diamant Noire",
    label: "Initiatrice",
  },
  {
    src: "/images/previous/official.jpg",
    title: "Festival Talent",
    label: "Archive officielle",
  },
];

const archiveHighlights = [
  {
    icon: Film,
    title: "Archives vidéo",
    description:
      "Retrouvez les contenus historiques du premier Festival Talent : prestations, interviews, ambiance et moments forts.",
  },
  {
    icon: Camera,
    title: "Galerie photo",
    description:
      "Une sélection d’images officielles pour revivre l’énergie, les coulisses et les temps forts de l’édition passée.",
  },
  {
    icon: Sparkles,
    title: "Mémoire du projet",
    description:
      "Ces archives racontent les fondations d’un projet culturel appelé à grandir entre le Sénégal et l’international.",
  },
];

export default function MediaPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(15,13,3,0.96),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-40 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Clapperboard size={17} />
              Média officiel
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl lg:text-8xl">
              Archives vidéo
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                du premier festival talent
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Revivez les premiers moments de Festival Talent : interviews,
              coulisses, performances et contenus officiels de la première
              édition. Ces archives racontent les fondations d&apos;un projet
              culturel, jeunesse et créatif appelé à grandir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3"
          >
            {archiveStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <p className="text-4xl font-black text-yellow-300">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.05] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-black">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/77w8NnB_B6A"
                  title="Archives vidéo du premier Festival Talent"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="absolute left-6 top-6 hidden items-center gap-3 rounded-full border border-yellow-400/30 bg-black/60 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-md sm:flex">
                <Play size={15} />
                Contenu historique
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {archiveHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-xl font-black uppercase text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-white sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <ImageIcon size={16} />
              Galerie officielle
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Images du
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                festival passé
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Revivez les images fortes de la précédente édition du Festival
              Talent : public, performances, coulisses, moments artistiques et
              ambiance générale.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {festivalGalleryImages.map((image, index) => (
              <motion.article
                key={`${image.src}-${index}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 transition duration-300 hover:border-yellow-400/40 ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    index === 0 ? "h-[420px]" : "h-[320px]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="rounded-full border border-yellow-400/30 bg-black/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-md">
                      {image.label}
                    </span>

                    <h3 className="mt-4 text-2xl font-black uppercase text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 text-center backdrop-blur-xl sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Mémoire officielle
          </p>

          <h2 className="mt-5 text-3xl font-black uppercase text-white sm:text-4xl">
            Les archives racontent le début d&apos;une vision
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
            Ces contenus permettent de valoriser l&apos;histoire du Festival
            Talent et de montrer l&apos;évolution du projet vers son ambition
            internationale : Paris & Rome 2027.
          </p>
        </div>
      </section>
    </main>
  );
}
