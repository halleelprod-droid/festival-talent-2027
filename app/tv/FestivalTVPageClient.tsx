"use client";

import {
  BadgeCheck,
  Clapperboard,
  Film,
  Mic2,
  Play,
  Podcast,
  Radio,
  Sparkles,
  Tv,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type VideoCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

const videoCategories: VideoCategory[] = [
  { title: "Interviews", description: "Futures conversations avec talents, coachs, artistes et partenaires.", icon: Mic2, tone: "from-yellow-300 to-yellow-700" },
  { title: "Backstage", description: "Coulisses, preparation, emotions et moments humains du festival.", icon: Clapperboard, tone: "from-red-400 to-yellow-600" },
  { title: "Battles", description: "Futurs extraits de competitions, preselections et finales danse.", icon: Sparkles, tone: "from-orange-300 to-red-600" },
  { title: "Concerts", description: "Performances, showcases et grands moments de scene a venir.", icon: Radio, tone: "from-yellow-200 to-white" },
  { title: "Masterclass", description: "Capsules pedagogiques futures avec experts, coachs et mentors.", icon: Users, tone: "from-emerald-300 to-yellow-600" },
  { title: "Podcasts", description: "Discussions longues sur parcours, creation, strategie et culture.", icon: Podcast, tone: "from-sky-300 to-yellow-600" },
  { title: "Documentaires", description: "Recits premium pour raconter les talents, les regions et l'impact.", icon: Film, tone: "from-violet-300 to-yellow-600" },
];

const featuredRail = [
  { title: "Dans les coulisses des preselections", category: "Backstage", duration: "Bientot" },
  { title: "Le parcours d'un talent danse", category: "Battles", duration: "Bientot" },
  { title: "Conversation avec les coachs", category: "Interviews", duration: "Bientot" },
  { title: "Scenes et moments forts", category: "Concerts", duration: "Bientot" },
  { title: "Construire une carriere artistique", category: "Masterclass", duration: "Bientot" },
  { title: "La culture comme opportunite", category: "Podcasts", duration: "Bientot" },
] as const;

export default function FestivalTVPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.16),transparent_32%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:86px_86px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              <BadgeCheck size={15} aria-hidden="true" />
              Plateforme video preparatoire - aucune video reelle
            </p>

            <SectionHeader
              eyebrow="Festival TV"
              icon={Tv}
              title={
                <>
                  Festival Talent
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    TV
                  </span>
                </>
              }
              description="Une future plateforme video pour interviews, coulisses, battles, concerts, masterclass, podcasts et documentaires Festival Talent."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="#categories" icon={Play}>
                Explorer les categories
              </GradientButton>
              <GradientButton href="/media" variant="outline" icon={Video}>
                Voir le centre media
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-4 sm:p-5">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-yellow-300/25 bg-black/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.28),transparent_58%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%,rgba(185,28,28,0.22))]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
                  A venir
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
                  Le film de l&apos;aventure Festival Talent.
                </h2>
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-300 text-black shadow-2xl shadow-yellow-900/40">
                <Play size={32} fill="currentColor" aria-hidden="true" />
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section id="categories" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Catalogue"
            icon={Clapperboard}
            title="Categories video"
            description="Chaque categorie est une structure de navigation future. Les videos pourront etre branchees plus tard via YouTube, une API ou un CMS."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {videoCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.04, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className={`flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br ${category.tone} text-black`}>
                      <Icon size={42} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {category.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {category.description}
                    </p>
                  </PremiumCard>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Interface"
            icon={Play}
            title="Selection a venir"
            description="Une experience inspiree des plateformes de streaming : rails horizontaux, vignettes, categories et contenus editorialises."
          />

          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {featuredRail.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.04, duration: 0.45 }}
                className="min-w-[260px] sm:min-w-[320px]"
              >
                <PremiumCard className="p-4 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.2),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(185,28,28,0.18))]" />
                    <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-200">
                      {item.duration}
                    </div>
                    <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-yellow-300 text-black">
                      <Play size={18} fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-black uppercase leading-tight text-white">
                    {item.title}
                  </h3>
                </PremiumCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <Video size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Future integration YouTube.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Cette interface ne diffuse aucune vraie video pour le moment. Elle
              prepare une future connexion a YouTube, un CMS video ou une API
              officielle Festival Talent.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/presse" icon={Clapperboard}>
                Centre presse
              </GradientButton>
              <GradientButton href="/contact" variant="outline" icon={Users}>
                Proposer un contenu
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
