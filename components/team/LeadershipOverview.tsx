"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Building2,
  HeartHandshake,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import DirectionSection from "@/components/team/DirectionSection";
import { lifeCoaches } from "@/data/coaches";

const operationalDirections = [
  {
    name: "Agence Diassnor",
    role: "Direction du Pôle Danse",
    mission:
      "Pilote les battles, les présélections et le développement des talents chorégraphiques.",
    expertise: ["Danse", "Production", "Management artistique"],
    image: "/images/partners/agence-diassnor.png",
  },
  {
    name: "HALLEEL Media",
    role: "Direction Média & Communication",
    mission:
      "Conçoit la stratégie éditoriale, les contenus audiovisuels et le rayonnement médiatique de Festival Talent.",
    expertise: ["Média", "Communication", "Contenus"],
  },
  {
    name: "SIDRA Technologies",
    role: "Architecture Digitale & Innovation",
    mission:
      "Structure l'architecture numérique, la sécurité, l'innovation et l'évolution technologique de la plateforme.",
    expertise: ["Architecture", "Digital", "Innovation"],
  },
] as const;

const institutionalPartners = [
  {
    name: "Centre Culturel Blaise Senghor",
    role: "Partenaire institutionnel Danse",
    mission:
      "Contribue à la valorisation des arts chorégraphiques et à l'encadrement des jeunes talents.",
    image: "/images/partners/blaise-senghor.png",
  },
  {
    name: "Union Européenne",
    role: "Partenaire Officiel Majeur",
    mission:
      "Soutient le rayonnement international, la jeunesse, la culture et l'impact durable du projet.",
  },
  {
    name: "Partenaires confirmés",
    role: "Écosystème institutionnel et professionnel",
    mission:
      "Entreprises, médias et organisations engagés aux côtés de Festival Talent pour créer des opportunités durables.",
  },
] as const;

const timeline = [
  "Vision",
  "Organisation",
  "Innovation",
  "Partenariats",
  "Accompagnement",
  "Festival",
  "Impact",
] as const;

const expertise = [
  "Culture",
  "Innovation",
  "Management",
  "Communication",
  "Digital",
  "IA",
  "Événementiel",
  "Partenariats",
  "Ressources humaines",
  "Formation",
  "Coaching",
] as const;

function LevelHeader({ level, title }: { level: string; title: string }) {
  return (
    <header className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-yellow-300">
        {level}
      </p>
      <h2 className="font-display mt-4 text-3xl uppercase text-white sm:text-5xl">
        {title}
      </h2>
    </header>
  );
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-auto flex flex-wrap justify-center gap-2 pt-6">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-yellow-300/20 bg-yellow-300/[0.07] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-yellow-200/80">
          {item}
        </span>
      ))}
    </div>
  );
}

export default function LeadershipOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative px-4 pb-28 sm:px-6 lg:px-20">
      <DirectionSection showGovernance={false} />

      <section aria-labelledby="operations-title" className="mx-auto mt-28 max-w-7xl">
        <div id="operations-title"><LevelHeader level="Niveau 2" title="Directions Opérationnelles" /></div>
        <div className="grid gap-5 md:grid-cols-3">
          {operationalDirections.map((entity, index) => (
            <motion.article key={entity.name} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }} className="flex min-h-[25rem] flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-yellow-300/30 bg-black/45 p-4 text-yellow-200 shadow-[0_0_35px_rgba(234,179,8,0.12)]">
                {"image" in entity && entity.image ? <Image src={entity.image} alt={`Logo ${entity.name}`} width={80} height={80} className="h-16 w-16 object-contain" /> : <Building2 size={34} aria-hidden="true" />}
              </div>
              <h3 className="mt-6 text-2xl font-black uppercase text-white">{entity.name}</h3>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.15em] text-yellow-300">{entity.role}</p>
              <p className="mt-5 text-sm leading-7 text-white/62">{entity.mission}</p>
              <Tags items={entity.expertise} />
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="coaches-title" className="mx-auto mt-28 max-w-7xl">
        <div id="coaches-title"><LevelHeader level="Niveau 3" title="Coachs & Mentors" /></div>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {lifeCoaches.map((coach, index) => (
            <motion.article key={coach.name} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-yellow-300/30 bg-black/45">
                {coach.image ? <Image src={coach.image} alt={coach.name} fill sizes="128px" className="object-cover object-top" /> : <span className="flex h-full items-center justify-center text-3xl font-black text-yellow-200">{coach.initials}</span>}
              </div>
              <h3 className="mt-6 text-2xl font-black uppercase text-white">{coach.name}</h3>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.15em] text-yellow-300">{coach.role}</p>
              <p className="mt-5 text-sm leading-7 text-white/62">{coach.description}</p>
              <Tags items={coach.focus} />
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="partners-title" className="mx-auto mt-28 max-w-7xl">
        <div id="partners-title"><LevelHeader level="Niveau 4" title="Partenaires Institutionnels" /></div>
        <div className="grid gap-5 md:grid-cols-3">
          {institutionalPartners.map((partner, index) => (
            <motion.article key={partner.name} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }} className="flex min-h-80 flex-col items-center rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.05] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-300/30 bg-black/45 p-4 text-yellow-200">
                {"image" in partner && partner.image ? <Image src={partner.image} alt={`Logo ${partner.name}`} width={80} height={80} className="h-16 w-16 object-contain" /> : <HeartHandshake size={34} aria-hidden="true" />}
              </div>
              <h3 className="mt-6 text-xl font-black uppercase text-white">{partner.name}</h3>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-yellow-300">{partner.role}</p>
              <p className="mt-5 text-sm leading-7 text-white/62">{partner.mission}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl space-y-8">
        <div className="rounded-3xl border border-yellow-300/20 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_50%),rgba(255,255,255,0.035)] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
          <Lightbulb className="mx-auto text-yellow-300" size={30} aria-hidden="true" />
          <h2 className="font-display mt-5 text-3xl uppercase text-white sm:text-5xl">Notre Vision Commune</h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-white/68 sm:text-lg">
            Festival Talent réunit des femmes et des hommes issus de disciplines complémentaires, engagés autour d&apos;une même ambition : révéler les talents, créer des opportunités et bâtir un héritage durable pour la jeunesse.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <h2 className="font-display text-center text-3xl uppercase text-white sm:text-4xl">De la vision à l&apos;impact</h2>
          <ol className="mx-auto mt-9 flex max-w-6xl flex-col items-center gap-2 lg:flex-row lg:justify-center">
            {timeline.map((step, index) => (
              <li key={step} className="contents">
                <span className="flex min-h-12 w-full max-w-64 items-center justify-center rounded-full border border-yellow-300/20 bg-black/35 px-4 text-[10px] font-black uppercase tracking-[0.14em] text-white/80 lg:w-auto lg:min-w-28">{step}</span>
                {index < timeline.length - 1 && <ArrowDown className="text-yellow-300/55 lg:-rotate-90" size={18} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <Sparkles className="mx-auto text-yellow-300" size={26} aria-hidden="true" />
          <h2 className="font-display mt-4 text-3xl uppercase text-white sm:text-4xl">Nos Expertises</h2>
          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-3">
            {expertise.map((item) => <span key={item} className="rounded-full border border-yellow-300/20 bg-yellow-300/[0.07] px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-yellow-100/85">{item}</span>)}
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.055] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
          <h2 className="font-display text-3xl uppercase text-white sm:text-5xl">Notre Engagement</h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            Nous mettons nos compétences, notre expérience et notre engagement au service d&apos;un projet qui place les talents au cœur de son développement.
          </p>
        </div>
      </section>
    </div>
  );
}
