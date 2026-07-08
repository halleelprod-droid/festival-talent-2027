"use client";

import {
  BookOpen,
  Brain,
  CalendarDays,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  Lightbulb,
  MapPinned,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type FoundationAxis = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AmbitionItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const foundationAxes: FoundationAxis[] = [
  {
    title: "Education",
    description: "Imaginer des parcours qui renforcent les competences et la confiance.",
    icon: BookOpen,
  },
  {
    title: "Culture",
    description: "Valoriser les expressions artistiques comme moteurs d'identite et de lien.",
    icon: Sparkles,
  },
  {
    title: "Entrepreneuriat",
    description: "A terme, encourager les talents a transformer leurs idees en projets durables.",
    icon: Rocket,
  },
  {
    title: "Innovation",
    description: "Connecter creation, digital, medias et nouveaux usages.",
    icon: Lightbulb,
  },
  {
    title: "Femmes",
    description: "Nous souhaitons soutenir davantage les parcours de leadership feminin.",
    icon: HandHeart,
  },
  {
    title: "Jeunesse",
    description: "Placer les jeunes au coeur d'une vision africaine ambitieuse.",
    icon: Users,
  },
  {
    title: "Handicap",
    description: "Demain, mieux inclure les talents souvent eloignes des opportunites.",
    icon: ShieldCheck,
  },
  {
    title: "Formation",
    description: "Construire des formats d'apprentissage concrets et accessibles.",
    icon: GraduationCap,
  },
  {
    title: "Mentorat",
    description: "Creer, a terme, un reseau de transmission entre experts et talents.",
    icon: Brain,
  },
];

const ambitionItems: AmbitionItem[] = [
  {
    title: "Creer des bourses",
    description: "Notre ambition serait d'aider certains talents a franchir des obstacles financiers.",
    icon: Star,
  },
  {
    title: "Creer des formations",
    description: "Nous souhaitons developper des modules utiles, concrets et professionnalisants.",
    icon: GraduationCap,
  },
  {
    title: "Creer des residences artistiques",
    description: "A terme, offrir des temps de creation, d'experimentation et d'accompagnement.",
    icon: WandSparkles,
  },
  {
    title: "Creer des echanges internationaux",
    description: "Demain, connecter des talents africains a des scenes, experts et cultures.",
    icon: MapPinned,
  },
  {
    title: "Creer un reseau de mentors",
    description: "Notre vision est de reunir des professionnels capables de guider dans la duree.",
    icon: Handshake,
  },
];

const timelineItems: TimelineItem[] = [
  {
    year: "2027",
    title: "Naissance du Festival",
    description: "Le point de depart : une scene, des talents, des partenaires et une vision.",
  },
  {
    year: "2028",
    title: "Developpement",
    description: "Consolider les parcours, les methodes, les donnees et la communaute.",
  },
  {
    year: "2030",
    title: "Premiers grands programmes",
    description: "Notre ambition : structurer des programmes d'accompagnement plus durables.",
  },
  {
    year: "2035",
    title: "Vision Foundation",
    description: "A terme, imaginer une fondation capable d'amplifier l'impact du projet.",
  },
];

export default function FoundationPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:82px_82px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              <ShieldCheck size={15} aria-hidden="true" />
              Vision future - fondation non encore creee
            </p>

            <SectionHeader
              eyebrow="Notre ambition"
              icon={HeartHandshake}
              title={
                <>
                  Festival Talent
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Foundation
                  </span>
                </>
              }
              description="Une vision d'avenir pour accompagner durablement les talents africains."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="#vision" icon={Lightbulb}>
                Notre vision
              </GradientButton>
              <GradientButton href="/fr" variant="outline" icon={Sparkles}>
                Decouvrir Festival Talent
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="relative rounded-2xl border border-yellow-300/25 bg-black/30 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.22),transparent_62%)]" />
              <div className="relative">
                <HandHeart className="text-yellow-300" size={38} aria-hidden="true" />
                <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Demain, accompagner au-dela de l&apos;evenement.
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/65">
                  Cette page presente une ambition. Elle ne constitue pas
                  l&apos;annonce d&apos;une fondation deja creee.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section id="vision" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {[
            {
              title: "Pourquoi une fondation ?",
              text: "Notre vision est d'imaginer, a terme, une structure capable de prolonger l'impact du Festival Talent au-dela des temps forts evenementiels.",
              icon: HeartHandshake,
            },
            {
              title: "Pourquoi accompagner toute l'annee ?",
              text: "Nous souhaitons que les jeunes talents puissent progresser avec des reperes, des formations, des mentors et une communaute durable.",
              icon: CalendarDays,
            },
            {
              title: "Pourquoi investir dans les talents ?",
              text: "Investir dans les talents, c'est investir dans la culture, l'emploi, la confiance, l'innovation et l'avenir creatif de l'Afrique.",
              icon: Rocket,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <PremiumCard className="h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                  <Icon className="text-yellow-300" size={30} aria-hidden="true" />
                  <h2 className="mt-6 text-2xl font-black uppercase leading-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-white/62">
                    {item.text}
                  </p>
                </PremiumCard>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Axes futurs"
            icon={MapPinned}
            title="Axes d'action"
            description="Ces axes representent une direction possible pour une future structure d'impact, si elle voit le jour."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {foundationAxes.map((axis, index) => {
              const Icon = axis.icon;

              return (
                <motion.article
                  key={axis.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.035, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {axis.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {axis.description}
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
            eyebrow="Notre ambition"
            icon={Star}
            title="Ce que nous souhaitons construire"
            description="La Foundation est ici presentee comme une vision de long terme, non comme une structure deja operationnelle."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {ambitionItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                >
                  <PremiumCard
                    tone={index === 0 ? "gold" : "default"}
                    className="h-full p-6"
                  >
                    <Icon className="text-yellow-300" size={27} aria-hidden="true" />
                    <h2 className="mt-5 text-lg font-black uppercase leading-tight text-white">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {item.description}
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
            eyebrow="Timeline"
            icon={CalendarDays}
            title="Une vision progressive"
            description="La construction d'une fondation eventuelle doit suivre le rythme reel du projet, de ses preuves et de ses partenaires."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {timelineItems.map((item, index) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <PremiumCard
                  tone={index === timelineItems.length - 1 ? "gold" : "default"}
                  className="h-full p-6"
                >
                  <p className="text-5xl font-black uppercase text-white">
                    {item.year}
                  </p>
                  <h2 className="mt-5 text-xl font-black uppercase leading-tight text-yellow-200">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {item.description}
                  </p>
                </PremiumCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <HandHeart size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Construisons ensemble l&apos;avenir des talents africains.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Notre ambition est de faire grandir Festival Talent avec rigueur,
              preuves, partenaires et impact durable.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/sponsors" icon={Handshake}>
                Devenir partenaire
              </GradientButton>
              <GradientButton href="/histoire" variant="outline" icon={Sparkles}>
                Comprendre l&apos;histoire
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
