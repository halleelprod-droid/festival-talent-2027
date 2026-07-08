"use client";

import {
  Award,
  BadgeCheck,
  Crown,
  Gem,
  Handshake,
  HeartHandshake,
  Medal,
  Mic2,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type FameCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type LegacyStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const fameCategories: FameCategory[] = [
  {
    title: "Laureats Danse",
    description: "Les talents choregraphiques qui marqueront les battles et finales.",
    icon: Trophy,
  },
  {
    title: "Laureats Musique",
    description: "Les voix, auteurs et interpretes qui porteront l'emotion du festival.",
    icon: Mic2,
  },
  {
    title: "Laureats Mode",
    description: "Les createurs capables d'affirmer une signature et une vision.",
    icon: Crown,
  },
  {
    title: "Laureats Art & Design",
    description: "Les artistes visuels et designers qui donneront forme a l'imaginaire.",
    icon: Palette,
  },
  {
    title: "Laureats Influence",
    description: "Les createurs de contenu qui inspireront leur generation.",
    icon: Sparkles,
  },
  {
    title: "Laureats Entrepreneuriat",
    description: "Les porteurs de projets culturels, creatifs et innovants.",
    icon: Rocket,
  },
  {
    title: "Prix du Public",
    description: "Les talents choisis par l'adhesion, l'energie et l'emotion populaire.",
    icon: ThumbsUp,
  },
  {
    title: "Prix du Jury",
    description: "Les parcours distingues par l'exigence et le regard professionnel.",
    icon: BadgeCheck,
  },
  {
    title: "Mentors d'honneur",
    description: "Celles et ceux qui auront transmis, conseille et eleve les talents.",
    icon: Users,
  },
  {
    title: "Partenaires batisseurs",
    description: "Les structures qui auront contribue a faire grandir l'institution.",
    icon: Handshake,
  },
  {
    title: "Benevoles remarquables",
    description: "Les personnes dont l'engagement aura porte l'aventure humaine.",
    icon: HeartHandshake,
  },
  {
    title: "Ambassadeurs Festival Talent",
    description: "Les visages qui incarneront les valeurs et l'impact du projet.",
    icon: ShieldCheck,
  },
];

const legacySteps: LegacyStep[] = [
  {
    title: "Revelation",
    description: "Le talent est remarque pour son univers, son histoire et son potentiel.",
    icon: Sparkles,
  },
  {
    title: "Finale",
    description: "Le parcours atteint la scene ou l'exigence rencontre l'emotion.",
    icon: Trophy,
  },
  {
    title: "Distinction",
    description: "Le nom entre dans la memoire officielle du Festival Talent.",
    icon: Medal,
  },
  {
    title: "Accompagnement",
    description: "Le festival continue a soutenir la progression apres la victoire.",
    icon: WandSparkles,
  },
  {
    title: "Opportunites",
    description: "Le talent peut acceder a des rencontres, projets et visibilites.",
    icon: Gem,
  },
  {
    title: "Transmission",
    description: "Les anciens inspirent, conseillent et ouvrent la voie aux suivants.",
    icon: Users,
  },
];

export default function HallOfFamePageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.14),transparent_32%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:80px_80px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Memoire officielle"
              icon={Star}
              title={
                <>
                  Hall of Fame
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    Festival Talent
                  </span>
                </>
              }
              description="Honorer les talents, les parcours et les batisseurs qui marqueront l'histoire du Festival Talent."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="#categories" icon={Trophy}>
                Decouvrir les categories
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                S&apos;inscrire aux pre-selections
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center rounded-full border border-yellow-300/25 bg-black/35">
              <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.24),transparent_63%)] blur-sm" />
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -1.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-yellow-300/35 bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-600 text-black shadow-2xl shadow-yellow-900/40"
              >
                <Award size={82} strokeWidth={1.6} aria-hidden="true" />
              </motion.div>
              {[0, 1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.15, 0.9] }}
                  transition={{
                    duration: 2.7,
                    delay: item * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute h-3 w-3 rounded-full bg-yellow-200 ${
                    item === 0
                      ? "left-12 top-14"
                      : item === 1
                        ? "right-14 top-20"
                        : item === 2
                          ? "bottom-14 left-20"
                          : item === 3
                            ? "bottom-20 right-12"
                            : "right-1/2 top-9"
                  }`}
                />
              ))}
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PremiumCard className="p-8 sm:p-10">
            <SectionHeader as="h2"
              eyebrow="Pourquoi"
              icon={ShieldCheck}
              title="Pourquoi un Hall of Fame ?"
              description="Festival Talent ne veut pas seulement organiser un evenement. Le projet veut garder la memoire des talents reveles, des coachs, des partenaires et des personnes qui auront contribue a construire cette aventure."
            />
          </PremiumCard>
        </div>
      </section>

      <section id="categories" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Categories"
            icon={Crown}
            title="Ceux que l'histoire retiendra"
            description="Le Hall of Fame preparera une memoire vivante : talents, mentors, partenaires, benevoles et ambassadeurs."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {fameCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.035, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
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
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <BadgeCheck size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Edition 2027
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Les premiers noms du Hall of Fame seront reveles apres les grandes
              finales Festival Talent 2027.
            </p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Apres la victoire"
            icon={Rocket}
            title="Le parcours continue"
            description="Entrer dans l'histoire n'est pas une fin. C'est le debut d'un accompagnement, d'une responsabilite et d'une transmission."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-6">
            {legacySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <PremiumCard
                    tone={index === legacySteps.length - 1 ? "gold" : "default"}
                    className="h-full p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-600 text-black">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                      Etape {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-black uppercase text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      {step.description}
                    </p>
                  </PremiumCard>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <Star size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Le prochain nom dans l&apos;histoire pourrait etre le votre.
            </h2>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                S&apos;inscrire aux pre-selections
              </GradientButton>
              <GradientButton href="/awards" variant="outline" icon={Award}>
                Decouvrir les Awards
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
