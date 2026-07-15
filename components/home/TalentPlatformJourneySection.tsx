"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Camera,
  Car,
  CheckCircle2,
  Crown,
  Cpu,
  Eye,
  Gem,
  Handshake,
  HeartHandshake,
  Megaphone,
  Monitor,
  Music,
  Palette,
  Radio,
  Rocket,
  Shirt,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  platformImpactStatistics,
  type ImpactStatistic,
} from "@/data/statistics";

type TimelineStep = {
  title: string;
  icon: LucideIcon;
  color: string;
  glow: string;
};

type Discipline = {
  name: string;
  icon: LucideIcon;
};

const talentJourney: TimelineStep[] = [
  {
    title: "Je decouvre Festival Talent",
    icon: Eye,
    color: "text-yellow-300 border-yellow-400/35 bg-yellow-400/10",
    glow: "bg-yellow-400/15",
  },
  {
    title: "Je m'inscris",
    icon: UserPlus,
    color: "text-red-300 border-red-400/35 bg-red-500/10",
    glow: "bg-red-500/15",
  },
  {
    title: "Je participe aux preselections",
    icon: Trophy,
    color: "text-amber-200 border-amber-300/35 bg-amber-300/10",
    glow: "bg-amber-300/15",
  },
  {
    title: "Je rencontre des coachs",
    icon: Users,
    color: "text-sky-200 border-sky-300/35 bg-sky-300/10",
    glow: "bg-sky-300/15",
  },
  {
    title: "Je developpe mon talent",
    icon: Rocket,
    color: "text-emerald-200 border-emerald-300/35 bg-emerald-300/10",
    glow: "bg-emerald-300/15",
  },
  {
    title: "Je participe a la grande finale",
    icon: Crown,
    color: "text-fuchsia-200 border-fuchsia-300/35 bg-fuchsia-300/10",
    glow: "bg-fuchsia-300/15",
  },
  {
    title: "Je rejoins la communaute Festival Talent",
    icon: HeartHandshake,
    color: "text-orange-200 border-orange-300/35 bg-orange-300/10",
    glow: "bg-orange-300/15",
  },
];

const domains: Discipline[] = [
  { name: "Musique", icon: Music },
  { name: "Danse", icon: Zap },
  { name: "Mode", icon: Shirt },
  { name: "Culture urbaine", icon: Radio },
  { name: "Influence digitale", icon: Megaphone },
  { name: "Innovation", icon: Cpu },
  { name: "Entrepreneuriat", icon: Briefcase },
  { name: "Motors", icon: Car },
  { name: "Arts visuels", icon: Palette },
  { name: "Creation de contenu", icon: Camera },
];

const organization = [
  "Fondatrice",
  "Direction generale",
  "Direction des partenariats",
  "Structures partenaires",
  "Coachs",
  "Benevoles",
  "Talents",
];

const builders = [
  "Zairah Diamant Noire",
  "Pierre Ndiaye",
  "PIN EVENTS",
  "Agence Diassnor",
  "Mister Moo",
  "Oldy Sow",
  "Talents Festival Talent",
];

const trustedPartners = [
  { name: "PIN EVENTS", logo: "/images/partners/pin-events.png" },
  { name: "Agence Diassnor", logo: "/images/partners/agence-diassnor.png" },
  { name: "Futurs partenaires" },
];

function SectionEyebrow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: string;
}) {
  return (
    <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
      <Icon size={16} aria-hidden="true" />
      {children}
    </p>
  );
}

function AnimatedCounter({ goal }: { goal: ImpactStatistic }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(goal.value);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, goal.value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [goal.value, isInView]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString("fr-FR")}
      {goal.suffix ?? ""}
    </span>
  );
}

function PartnerLogo({ partner }: { partner: { name: string; logo?: string } }) {
  const [hasError, setHasError] = useState(false);

  if (!partner.logo || hasError) {
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg border border-yellow-400/20 bg-black/55 px-4 text-center text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
        {partner.name}
      </div>
    );
  }

  return (
    <Image
      src={partner.logo}
      alt={`Logo ${partner.name}`}
      width={220}
      height={110}
      className="mx-auto h-20 w-auto object-contain"
      onError={() => setHasError(true)}
    />
  );
}

export default function TalentPlatformJourneySection() {
  const parallaxRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section ref={parallaxRef} className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow icon={Sparkles}>Le parcours d&apos;un talent</SectionEyebrow>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl lg:text-7xl">
            Une aventure pensee pour accompagner, pas seulement selectionner.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent donne au candidat un chemin lisible : decouvrir,
            candidater, progresser, se produire, puis rejoindre une communaute
            qui continue apres la scene.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-yellow-300 via-red-500 to-yellow-300 lg:left-1/2" />
          <div className="space-y-8">
            {talentJourney.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.04 }}
                  className={`relative grid gap-5 lg:grid-cols-2 ${
                    index % 2 === 0 ? "" : "lg:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <div className="ml-16 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35 lg:ml-0">
                    <div className={`absolute left-2 top-5 flex h-9 w-9 items-center justify-center rounded-full border bg-black lg:left-1/2 lg:-translate-x-1/2 ${step.color}`}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div className={`pointer-events-none absolute -inset-4 -z-10 rounded-full blur-3xl ${step.glow}`} />
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-300">
                      Etape {index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 sm:px-10 lg:px-20">
        <motion.div
          style={{ y: parallaxY }}
          className="grid overflow-hidden rounded-lg border border-yellow-400/25 bg-yellow-400/[0.07] shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="p-8 sm:p-10 lg:p-12">
            <SectionEyebrow icon={Rocket}>Apres le Festival...</SectionEyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-5xl">
              L&apos;aventure ne s&apos;arrete pas apres la finale.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Chez Festival Talent, l&apos;aventure ne s&apos;arrete pas apres la
              finale.
            </p>
            <p className="mt-5 text-base leading-8 text-white/68">
              Les candidats continuent a beneficier d&apos;un reseau,
              d&apos;opportunites, de formations et de rencontres professionnelles.
            </p>
          </div>
          <div className="relative min-h-80 overflow-hidden border-t border-white/10 bg-black/35 p-8 lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.18),transparent_45%)]" />
            <div className="relative grid h-full place-items-center">
              <div className="relative h-64 w-64 rounded-full border border-yellow-400/25 bg-black/50">
                {["Reseau", "Formation", "Opportunites", "Mentorat"].map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                    className={`absolute rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300 ${
                      index === 0
                        ? "left-1/2 top-0 -translate-x-1/2"
                        : index === 1
                          ? "right-0 top-1/2 -translate-y-1/2"
                          : index === 2
                            ? "bottom-0 left-1/2 -translate-x-1/2"
                            : "left-0 top-1/2 -translate-y-1/2"
                    }`}
                  >
                    {label}
                  </motion.div>
                ))}
                <div className="absolute inset-16 grid place-items-center rounded-full border border-red-400/25 bg-red-500/10 text-center">
                  <Gem className="text-yellow-300" size={34} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow icon={Monitor}>Nos domaines</SectionEyebrow>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Toutes les disciplines meritent une scene.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((domain, index) => {
            const Icon = domain.icon;

            return (
              <motion.article
                key={domain.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.03, duration: 0.5 }}
                className="group min-h-48 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/25 bg-yellow-400/10 text-yellow-300 transition group-hover:scale-105">
                  <Icon size={27} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-2xl font-black uppercase leading-tight text-white">
                  {domain.name}
                </h3>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow icon={CheckCircle2}>Notre impact demain</SectionEyebrow>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Des objectifs mesurables pour une ambition collective.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformImpactStatistics.map((goal, index) => (
            <motion.article
              key={goal.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <p className="text-4xl font-black uppercase text-white sm:text-5xl">
                <AnimatedCounter goal={goal} />
              </p>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                {goal.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow icon={Users}>Ils construisent Festival Talent.</SectionEyebrow>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Une organisation humaine, lisible et evolutive.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl">
            {organization.map((level, index) => (
              <div key={level} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <BadgeCheck size={18} aria-hidden="true" />
                  </div>
                  {index < organization.length - 1 ? (
                    <div className="h-8 w-px bg-yellow-400/25" />
                  ) : null}
                </div>
                <p className="pb-6 text-sm font-black uppercase tracking-[0.18em] text-white/78">
                  {level}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {builders.map((builder, index) => (
              <motion.div
                key={builder}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.45 }}
                className="rounded-lg border border-yellow-400/15 bg-black/35 p-5 text-sm font-black uppercase tracking-[0.16em] text-white/78 shadow-xl shadow-black/20"
              >
                {builder}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow icon={Handshake}>Ils nous font confiance.</SectionEyebrow>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Des partenaires pour faire grandir l&apos;ecosysteme.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {trustedPartners.map((partner, index) => (
            <motion.article
              key={partner.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 text-center shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <PartnerLogo partner={partner} />
              <h3 className="mt-6 text-2xl font-black uppercase text-white">
                {partner.name}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative px-6 pb-32 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl rounded-lg border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12"
        >
          <Sparkles className="mx-auto text-yellow-300" size={38} aria-hidden="true" />
          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-6xl">
            Et si le prochain talent decouvert...
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              c&apos;etait vous ?
            </span>
          </h2>
          <div className="mt-10">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-10 py-6 text-xs font-black uppercase tracking-[0.24em] text-black shadow-2xl shadow-yellow-900/30 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              Je participe
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
