"use client";

import {
  Award,
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  IdCard,
  Mail,
  Mic2,
  Rocket,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  UserRound,
  Users,
  Video,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type TalentFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type JourneyStep = {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
};

type Skill = {
  name: string;
  value: number;
};

type Appointment = {
  date: string;
  month: string;
  title: string;
  detail: string;
};

const talentFeatures: TalentFeature[] = [
  {
    title: "Mon Profil",
    description: "Identite, discipline, parcours et presentation artistique.",
    icon: UserRound,
  },
  {
    title: "Mes preselections",
    description: "Dates, lieux, convocations et prochaines instructions.",
    icon: CalendarDays,
  },
  {
    title: "Mes resultats",
    description: "Suivi des etapes, decisions et progression officielle.",
    icon: Trophy,
  },
  {
    title: "Mes coachs",
    description: "Recommandations, sessions et accompagnement futur.",
    icon: GraduationCap,
  },
  {
    title: "Notifications",
    description: "Messages importants envoyes par l'equipe du festival.",
    icon: Bell,
  },
  {
    title: "Documents",
    description: "Portfolio, autorisations, photos, videos et liens utiles.",
    icon: FileText,
  },
  {
    title: "Mon Pass Festival",
    description: "Pass candidat, acces et informations pratiques.",
    icon: Ticket,
  },
  {
    title: "Medias",
    description: "Videos, photos, contenus de candidature et souvenirs.",
    icon: Video,
  },
];

const journeySteps: JourneyStep[] = [
  {
    title: "Inscription",
    description: "Le talent cree son premier dossier.",
    color: "from-yellow-300 to-yellow-600",
    icon: ClipboardCheck,
  },
  {
    title: "Validation",
    description: "L'equipe verifie les informations.",
    color: "from-emerald-300 to-emerald-600",
    icon: CheckCircle2,
  },
  {
    title: "Preselections",
    description: "Le candidat passe devant l'organisation.",
    color: "from-sky-300 to-sky-600",
    icon: Mic2,
  },
  {
    title: "Coaching",
    description: "Les talents progressent avec des experts.",
    color: "from-violet-300 to-violet-600",
    icon: GraduationCap,
  },
  {
    title: "Battle",
    description: "Le talent defend son univers sur scene.",
    color: "from-red-300 to-red-600",
    icon: Zap,
  },
  {
    title: "Grande Finale",
    description: "Les meilleurs vivent le grand moment public.",
    color: "from-orange-300 to-orange-600",
    icon: Trophy,
  },
  {
    title: "Hall of Fame",
    description: "Le parcours continue dans la communaute.",
    color: "from-white to-yellow-300",
    icon: Star,
  },
];

const skills: Skill[] = [
  { name: "Creativite", value: 88 },
  { name: "Expression", value: 76 },
  { name: "Discipline", value: 82 },
  { name: "Leadership", value: 64 },
  { name: "Travail d'equipe", value: 91 },
];

const rewards = [
  "Premier inscrit",
  "Talent prometteur",
  "Battle Ready",
  "Finaliste",
] as const;

const appointments: Appointment[] = [
  {
    date: "12",
    month: "Aout",
    title: "Verification du profil",
    detail: "Preparation des documents et medias.",
  },
  {
    date: "19",
    month: "Aout",
    title: "Preselection locale",
    detail: "Convocation fictive pour la simulation du parcours.",
  },
  {
    date: "02",
    month: "Sept",
    title: "Session coaching",
    detail: "Atelier expression, discipline et posture scenique.",
  },
];

const notifications = [
  {
    title: "Profil en preparation",
    detail: "L'espace sera relie plus tard a une base de donnees securisee.",
  },
  {
    title: "Documents attendus",
    detail: "Prevoir une photo, une video ou un lien portfolio selon la discipline.",
  },
  {
    title: "Parcours candidat",
    detail: "Les statuts reels seront affiches uniquement apres connexion future.",
  },
];

const opportunities = [
  {
    title: "Casting",
    detail: "Opportunites artistiques proposees aux profils selectionnes.",
    icon: Camera,
  },
  {
    title: "Masterclass",
    detail: "Sessions avec coachs, artistes, mentors et professionnels.",
    icon: GraduationCap,
  },
  {
    title: "Rencontre partenaires",
    detail: "Mise en relation avec marques, institutions et structures culturelles.",
    icon: Users,
  },
];

const chartPoints = [42, 58, 50, 74, 68, 86, 92] as const;

export default function EspaceTalentPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <SectionHeader
              eyebrow="Portail evolutif"
              icon={Sparkles}
              className="max-w-4xl"
              title={
                <>
                  Bienvenue dans votre
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    Espace Talent
                  </span>
                </>
              }
              description="Suivez votre parcours, vos candidatures et preparez-vous a vivre l'experience Festival Talent."
            />

            <PremiumCard tone="gold" className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-200">
                    Profil demo
                  </p>
                  <h2 className="mt-4 text-3xl font-black uppercase text-white">
                    Talent 2027
                  </h2>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-300/35 bg-black/35 text-yellow-200">
                  <IdCard size={30} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Mock data", "Sans connexion", "Pret API"].map((label) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-black/25 p-4 text-center"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <GradientButton href="/preselections" icon={Rocket}>
              Creer mon profil
            </GradientButton>
            <GradientButton href="/activites" variant="outline" icon={Sparkles}>
              Decouvrir les disciplines
            </GradientButton>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {talentFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.04, duration: 0.45 }}
              >
                <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <Icon size={25} aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {feature.description}
                  </p>
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Parcours"
            icon={Rocket}
            title="Votre trajectoire"
            description="Une timeline fictive pour prefigurer le suivi candidat : chaque etape pourra plus tard etre alimentee par Supabase, Firebase ou PostgreSQL."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-7">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="relative"
                >
                  <PremiumCard className="h-full p-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-black shadow-lg shadow-black/30`}
                    >
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

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Progression"
              icon={Award}
              title="Mes competences"
              description="Des indicateurs fictifs pour visualiser la maturite artistique et humaine du candidat."
            />
          </PremiumCard>

          <PremiumCard className="p-7 sm:p-8">
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between gap-4 text-sm font-black uppercase tracking-[0.16em]">
                    <span className="text-white/80">{skill.name}</span>
                    <span className="text-yellow-300">{skill.value}%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Badges"
              icon={Star}
              title="Mes recompenses"
              description="Un systeme de badges pourra valoriser l'engagement, la progression et les etapes franchies."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {rewards.map((reward) => (
                <div
                  key={reward}
                  className="flex items-center gap-4 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.07] p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-black">
                    <Award size={21} aria-hidden="true" />
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-white">
                    {reward}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Calendrier"
              icon={CalendarDays}
              title="Mes prochains rendez-vous"
              description="Un calendrier elegant pour presenter convocations, ateliers et evenements a venir."
            />
            <div className="mt-8 space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.date}-${appointment.title}`}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="w-20 shrink-0 rounded-lg border border-yellow-400/25 bg-black/35 p-3 text-center">
                    <p className="text-2xl font-black text-yellow-200">
                      {appointment.date}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                      {appointment.month}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase text-white">
                      {appointment.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      {appointment.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Messages"
              icon={Mail}
              title="Messages du Festival"
              description="Les notifications officielles seront separees des informations publiques lorsque l'espace sera connecte."
            />
            <div className="mt-8 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.title}
                  className="rounded-xl border border-white/10 bg-black/25 p-5"
                >
                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-yellow-200">
                    {notification.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {notification.detail}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Ouvertures"
              icon={Sparkles}
              title="Mes opportunites"
              description="Festival Talent pourra recommander des opportunites selon la discipline, le niveau et le parcours du candidat."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {opportunities.map((opportunity) => {
                const Icon = opportunity.icon;

                return (
                  <div
                    key={opportunity.title}
                    className="rounded-xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5"
                  >
                    <Icon className="text-yellow-300" size={25} aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-black uppercase text-white">
                      {opportunity.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      {opportunity.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <SectionHeader
              eyebrow="Evolution"
              icon={Trophy}
              title="Mon evolution"
              description="Graphique statique de demonstration pour visualiser la progression du talent au fil du parcours."
            />
            <div className="mt-10 flex h-64 items-end gap-3 rounded-2xl border border-white/10 bg-black/30 p-5">
              {chartPoints.map((point, index) => (
                <motion.div
                  key={`${point}-${index}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${point}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="flex-1 rounded-t-xl bg-gradient-to-t from-red-600 via-yellow-500 to-yellow-200"
                  aria-label={`Progression ${index + 1}: ${point}%`}
                />
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="p-7 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-300">
              Architecture future
            </p>
            <h2 className="mt-5 text-3xl font-black uppercase text-white sm:text-4xl">
              Pret pour une vraie plateforme candidat
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/62">
              Cette interface ne contient aucune donnee reelle et aucun acces
              prive. Elle prepare simplement une future integration avec
              Supabase, Firebase ou PostgreSQL, avec authentification, statuts,
              notifications et documents securises.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Supabase", "Firebase", "PostgreSQL"].map((source) => (
                <div
                  key={source}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white/72"
                >
                  {source}
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
