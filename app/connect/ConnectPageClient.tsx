"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Handshake,
  Megaphone,
  Network,
  RadioTower,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type ConnectRole = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const connectRoles: ConnectRole[] = [
  {
    title: "Talents",
    description: "Demain, permettre aux candidats de rendre leur parcours plus visible.",
    icon: Sparkles,
  },
  {
    title: "Entreprises",
    description: "Creer un pont futur entre besoins professionnels et talents creatifs.",
    icon: Building2,
  },
  {
    title: "Managers",
    description: "Imaginer un espace de mise en relation avec des accompagnateurs serieux.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Producteurs",
    description: "Faciliter, a terme, la rencontre entre projets, scenes et production.",
    icon: RadioTower,
  },
  {
    title: "Sponsors",
    description: "Connecter les marques a des initiatives culturelles et sociales lisibles.",
    icon: Handshake,
  },
  {
    title: "Coachs",
    description: "Structurer une future relation entre expertise, mentorat et progression.",
    icon: Target,
  },
  {
    title: "Mentors",
    description: "Faire grandir une communaute de transmission autour des talents.",
    icon: Users,
  },
];

const networkSteps = [
  "Identifier les talents",
  "Structurer les besoins",
  "Creer les rencontres",
  "Suivre les opportunites",
] as const;

export default function ConnectPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.14),transparent_32%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:82px_82px]" />

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
              Vision future - aucun profil reel
            </p>

            <SectionHeader
              eyebrow="Festival Talent Connect"
              icon={Network}
              title={
                <>
                  Connecter les
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    opportunites
                  </span>
                </>
              }
              description="Une vision de futur reseau professionnel pour rapprocher talents, entreprises, managers, producteurs, sponsors, coachs et mentors."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/espace-talent" icon={Sparkles}>
                Espace Talent
              </GradientButton>
              <GradientButton href="/sponsors" variant="outline" icon={Handshake}>
                Espace Sponsors
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="relative rounded-2xl border border-yellow-300/25 bg-black/30 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.22),transparent_62%)]" />
              <div className="relative">
                <Network className="text-yellow-300" size={40} aria-hidden="true" />
                <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Pas un annuaire. Une ambition.
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/65">
                  Cette interface ne contient aucun faux profil. Elle presente
                  uniquement la structure possible d&apos;un futur reseau
                  professionnel Festival Talent.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader as="h2"
            eyebrow="Roles"
            icon={Users}
            title="Les futurs acteurs du reseau"
            description="Chaque carte est illustrative. Les profils reels, s'ils existent un jour, devront etre verifies, securises et relies a une vraie base de donnees."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {connectRoles.map((role, index) => {
              const Icon = role.icon;

              return (
                <motion.article
                  key={role.title}
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
                      {role.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {role.description}
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
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <SectionHeader as="h2"
              eyebrow="Vision produit"
              icon={Rocket}
              title="Un reseau a construire avec methode"
              description="A terme, Connect pourrait devenir un portail de mise en relation professionnelle, avec validation, moderation, donnees securisees et opportunites suivies."
            />
          </PremiumCard>

          <PremiumCard className="p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {networkSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                    Etape {index + 1}
                  </p>
                  <p className="mt-3 text-lg font-black uppercase text-white">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <Trophy size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Demain, connecter le talent a l&apos;opportunite.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Festival Talent Connect reste une vision preparatoire. Aucun profil
              public, aucune promesse de recrutement et aucune mise en relation
              reelle ne sont actives dans cette version.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                Preparer ma candidature
              </GradientButton>
              <GradientButton href="/contact" variant="outline" icon={Megaphone}>
                Contacter l&apos;equipe
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
