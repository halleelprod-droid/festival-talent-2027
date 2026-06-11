"use client";

import { motion } from "framer-motion";
import { Camera, Film, Play } from "lucide-react";
import Image from "next/image";

const archiveImages = [
  {
    title: "Conference de presse",
    image: "/images/previous/official.jpg",
  },
  {
    title: "Public & ambiance",
    image: "/images/previous/public.jpg",
  },
  {
    title: "Scene live",
    image: "/images/previous/scene.jpg",
  },
  {
    title: "Mode & creativite",
    image: "/images/previous/fashion.jpg",
  },
];

const localVideos = [
  {
    title: "Archive video 01",
    src: "/videos/reel1.mp4",
  },
  {
    title: "Archive video 02",
    src: "/videos/reel2.mp4",
  },
];

export default function MediaPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-40 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Media / Archives
          </p>

          <h1 className="mt-8 text-6xl font-black leading-none md:text-8xl">
            Premier
            <br />
            Festival Talent.
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Les videos et images ci-dessous sont les archives du premier
            Festival Talent. Elles presentent energie, public et moments
            fondateurs avant edition internationale 2027.
          </p>
        </motion.div>

        <section className="mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5 text-sm uppercase tracking-[0.3em] text-[#C9A84C]">
            <Play size={18} />
            Aftermovie archive
          </div>

          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/77w8NnB_B6A"
              title="Festival Talent - Aftermovie archive"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
            <Film size={18} />
            Videos archivees
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {localVideos.map((video) => (
              <div
                key={video.src}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <video controls muted playsInline className="h-full w-full">
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="border-t border-white/10 px-6 py-5">
                  <h2 className="text-xl font-black">{video.title}</h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Archive officielle du premier Festival Talent.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
            <Camera size={18} />
            Galerie archives
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {archiveImages.map((item) => (
              <div
                key={item.title}
                className="group relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C]">
                    Archive Festival Talent
                  </p>
                  <h2 className="mt-4 text-3xl font-black">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
