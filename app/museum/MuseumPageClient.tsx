"use client";

import Image from "next/image";
import {
  Award,
  Camera,
  Clapperboard,
  Crown,
  Landmark,
  Medal,
  ScrollText,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import {
  museumPhotos,
  museumPosters,
  museumTimeline,
  museumTrophies,
  museumVideos,
} from "@/data/museum";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function MuseumPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-36 text-white sm:px-10 lg:px-20 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_38%),linear-gradient(to_bottom,#000,rgba(10,8,2,0.97),#000)]" />

      <div className="relative mx-auto max-w-7xl space-y-28">
        {/* HERO */}
        <motion.section {...fadeIn}>
          <SectionHeader
            eyebrow="Musee numerique"
            icon={Landmark}
            align="center"
            title={
              <>
                Festival Talent
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Museum
                </span>
              </>
            }
            description="La memoire vivante du festival : affiches, photos, trophees, videos et laureats de chaque edition, a commencer par 2027."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Badge icon={Sparkles}>Edition 2027 — en preparation</Badge>
            <Badge icon={Trophy} color="red">
              Laureats devoiles apres la finale
            </Badge>
          </div>
        </motion.section>

        {/* FRISE CHRONOLOGIQUE */}
        <motion.section {...fadeIn} aria-labelledby="museum-timeline">
          <SectionHeader
            as="h2"
            eyebrow="Frise chronologique"
            icon={ScrollText}
            title="Le parcours de l'edition 2027"
            description="Des origines du projet a l'annonce des laureats : chaque etape entre ici, au fur et a mesure qu'elle s'ecrit."
          />

          <ol className="relative mt-14 space-y-10 border-l border-yellow-400/25 pl-8">
            {museumTimeline.map((entry, index) => (
              <motion.li
                key={entry.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="relative"
              >
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.7)]" />

                <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                  {entry.period}
                </p>

                <h3 className="font-display mt-2 text-2xl uppercase text-white sm:text-3xl">
                  {entry.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                  {entry.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* AFFICHES */}
        <motion.section {...fadeIn} aria-labelledby="museum-posters">
          <SectionHeader
            as="h2"
            eyebrow="Affiches officielles"
            icon={Clapperboard}
            title="Les visuels de l'edition"
            description="Chaque affiche officielle rejoint la collection permanente du musee."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {museumPosters.map((poster) => (
              <PremiumCard
                key={poster.title}
                tone={poster.status === "disponible" ? "gold" : "default"}
                className="flex h-full flex-col p-7"
              >
                {poster.image ? (
                  <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/50">
                    <Image
                      src={poster.image}
                      alt={poster.title}
                      width={280}
                      height={180}
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="mb-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-xs font-black uppercase tracking-[0.25em] text-white/55"
                  >
                    A venir
                  </div>
                )}

                <h3 className="font-display text-xl uppercase text-white">
                  {poster.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-white/60">
                  {poster.description}
                </p>

                <div className="mt-5">
                  <Badge size="sm" color={poster.status === "disponible" ? "gold" : "red"}>
                    {poster.status === "disponible" ? "Exposee" : "A venir"}
                  </Badge>
                </div>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        {/* PHOTOS */}
        <motion.section {...fadeIn} aria-labelledby="museum-photos">
          <SectionHeader
            as="h2"
            eyebrow="Galerie photos"
            icon={Camera}
            title="Les archives en images"
            description="Une selection des archives du festival. La galerie complete est disponible dans l'espace Media."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {museumPhotos.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative aspect-square overflow-hidden rounded-lg border border-white/10"
              >
                <Image
                  src={src}
                  alt={`Archive Festival Talent ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <GradientButton href="/media" variant="outline">
              Voir toute la galerie
            </GradientButton>
          </div>
        </motion.section>

        {/* TROPHEES */}
        <motion.section {...fadeIn} aria-labelledby="museum-trophies">
          <SectionHeader
            as="h2"
            eyebrow="Trophees & distinctions"
            icon={Trophy}
            title="La salle des trophees"
            description="Les recompenses de l'edition 2027 seront exposees ici apres la finale."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {museumTrophies.map((trophy, index) => {
              const icons = [Trophy, Medal, Award];
              const Icon = icons[index % icons.length];

              return (
                <PremiumCard key={trophy.title} className="p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} aria-hidden="true" />
                  </div>

                  <h3 className="font-display mt-6 text-xl uppercase text-white">
                    {trophy.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {trophy.description}
                  </p>

                  <div className="mt-5">
                    <Badge size="sm" color="red">
                      A venir
                    </Badge>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </motion.section>

        {/* VIDEOS */}
        <motion.section {...fadeIn} aria-labelledby="museum-videos">
          <SectionHeader
            as="h2"
            eyebrow="Videos"
            icon={Clapperboard}
            title="Les archives filmees"
            description="Performances, ambiance et coulisses des archives du festival."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {museumVideos.map((video) => (
              <PremiumCard key={video.src} className="p-4">
                <video
                  src={video.src}
                  controls
                  preload="none"
                  playsInline
                  className="aspect-video w-full rounded-lg bg-black object-cover"
                />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/70">
                  {video.title}
                </p>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        {/* LAUREATS & HALL OF FAME */}
        <motion.section {...fadeIn} aria-labelledby="museum-laureates">
          <PremiumCard tone="gold" className="p-10 text-center md:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
              <Crown size={30} aria-hidden="true" />
            </div>

            <h2 className="font-display mt-8 text-3xl uppercase text-white sm:text-5xl">
              Les laureats 2027
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/65">
              Les premiers laureats de l&apos;histoire du festival seront
              devoiles lors de la finale de l&apos;edition 2027. Leurs noms,
              portraits et parcours entreront alors au musee — et au Hall of
              Fame.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <GradientButton href="/hall-of-fame">
                Decouvrir le Hall of Fame
              </GradientButton>
              <GradientButton href="/preselections" variant="outline">
                Devenir candidat
              </GradientButton>
            </div>
          </PremiumCard>
        </motion.section>
      </div>
    </main>
  );
}
