"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const galleryItems = [
  {
    src: "/images/previous/gallery/festival-passe-01.jpg",
    title: "Performance live",
    label: "Scene",
  },
  {
    src: "/images/previous/gallery/festival-passe-10.jpg",
    title: "Public & energie",
    label: "Ambiance",
  },
  {
    src: "/images/previous/gallery/festival-passe-21.jpg",
    title: "Moment culturel",
    label: "Culture",
  },
  {
    src: "/images/previous/gallery/festival-passe-24.jpg",
    title: "Coulisses",
    label: "Backstage",
  },
  {
    src: "/images/previous/gallery/festival-passe-29.jpg",
    title: "Expression artistique",
    label: "Talent",
  },
  {
    src: "/images/previous/gallery/festival-passe-37.jpg",
    title: "Experience festival",
    label: "Archive",
  },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % galleryItems.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.13),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
            <Camera size={16} />
            Galerie immersive
          </div>

          <h2 className="font-display mt-8 text-4xl uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Moments
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Festival Talent
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Une selection visuelle des editions precedentes pour montrer
            l&apos;energie, le public, les scenes et les coulisses de
            l&apos;experience.
          </p>
        </div>

        <div className="mt-16 grid auto-rows-[260px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => {
            const isFeatured = index === 0 || index === 3;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300 ${
                  isFeatured ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                aria-label={`Ouvrir ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  quality={72}
                  sizes={
                    isFeatured
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-flex rounded-full border border-yellow-400/30 bg-black/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-yellow-300 backdrop-blur-xl">
                    {item.label}
                  </span>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <h3 className="text-2xl font-black uppercase leading-tight text-white">
                      {item.title}
                    </h3>
                    <Maximize2
                      size={20}
                      className="shrink-0 text-yellow-300 opacity-80"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-yellow-400/40 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300"
            aria-label="Fermer la galerie"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex(
                (activeIndex - 1 + galleryItems.length) % galleryItems.length
              )
            }
            className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-yellow-400/40 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300 sm:flex"
            aria-label="Image precedente"
          >
            <ChevronLeft size={24} />
          </button>

          <figure className="w-full max-w-6xl">
            <div className="relative aspect-[4/3] max-h-[78vh] overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-black shadow-2xl shadow-black">
              <Image
                src={activeItem.src}
                alt={activeItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <figcaption className="mx-auto mt-5 max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                {activeItem.label}
              </p>
              <p className="mt-2 text-2xl font-black uppercase text-white">
                {activeItem.title}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex + 1) % galleryItems.length)
            }
            className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-yellow-400/40 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300 sm:flex"
            aria-label="Image suivante"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
