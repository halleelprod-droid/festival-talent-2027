"use client";

import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  HandCoins,
  LockKeyhole,
  PiggyBank,
  Rocket,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type FinanceCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const financeCategories: FinanceCategory[] = [
  {
    title: "Banques partenaires",
    description:
      "Architecture future pour accueillir des banques uniquement lorsque des accords officiels seront signes.",
    icon: Building2,
  },
  {
    title: "Education financiere",
    description:
      "Preparer des contenus pedagogiques simples sur budget, epargne, gestion et prudence financiere.",
    icon: BookOpen,
  },
  {
    title: "Entrepreneuriat",
    description:
      "Accompagner les jeunes talents qui souhaitent structurer un projet creatif ou culturel.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Opportunites",
    description:
      "Imaginer un futur pont entre talents, programmes d'appui, partenaires et dispositifs utiles.",
    icon: Rocket,
  },
  {
    title: "Accompagnement des jeunes",
    description:
      "Construire une approche responsable pour orienter, informer et proteger les candidats.",
    icon: Users,
  },
];

const architectureSteps = [
  "Accords officiels",
  "Validation juridique",
  "Demande securisee",
  "Transmission au partenaire",
  "Suivi transparent",
] as const;

export default function FinancePageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FinanceBackground />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <SafetyPill text="Architecture preparatoire - aucune banque reelle integree" />

            <SectionHeader
              eyebrow="Festival Talent Finance"
              icon={PiggyBank}
              title={
                <>
                  Finance
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    responsable
                  </span>
                </>
              }
              description="Une architecture future pour aider les talents a comprendre, structurer et transmettre des demandes financieres uniquement lorsque des partenaires officiels seront valides."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/finance/ouvrir-un-compte" icon={Send}>
                Demander a etre contacte
              </GradientButton>
              <GradientButton href="/finance/banques-partenaires" variant="outline" icon={Building2}>
                Banques partenaires
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-300/30 bg-black/35 text-yellow-200">
              <ShieldCheck size={32} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Ne jamais ouvrir un compte depuis cette interface.
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/65">
              Cette version prepare seulement un parcours de demande. Toute
              ouverture bancaire reelle devra etre faite plus tard par une
              banque partenaire officielle, dans son propre cadre legal.
            </p>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Categories"
            icon={BadgeCheck}
            title="Les piliers de l'espace Finance"
            description="Un socle modulaire pour ajouter, plus tard, contenus, formulaires, partenaires et suivis sans casser la plateforme."
            as="h2"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {financeCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.title}
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
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Architecture evolutive"
              icon={LockKeyhole}
              title="Un parcours a securiser avant activation"
              description="Avant toute transmission a une banque, Festival Talent devra valider les accords, la protection des donnees, le consentement et les responsabilites de chaque acteur."
              as="h2"
            />
          </PremiumCard>

          <PremiumCard className="p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {architectureSteps.map((step, index) => (
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
    </main>
  );
}

export function FinancePartnersPageClient() {
  const placeholders = ["Banque partenaire future", "Institution future", "Programme d'appui futur"] as const;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FinanceBackground />
      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SafetyPill text="Aucune banque reelle n'est annoncee sur cette page" />
          <SectionHeader
            eyebrow="Finance"
            icon={Building2}
            title="Banques partenaires"
            description="Cette page prepare l'emplacement des futurs partenaires financiers. Aucun nom de banque n'est affiche tant qu'aucun accord officiel n'est signe."
          />
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {placeholders.map((partner, index) => (
            <PremiumCard key={partner} tone={index === 0 ? "gold" : "default"} className="p-7">
              <Building2 className="text-yellow-300" size={30} aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-black uppercase text-white">
                {partner}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Emplacement reserve pour une structure validee. Cette carte ne
                represente aucun partenariat bancaire actif.
              </p>
            </PremiumCard>
          ))}
        </div>
      </section>
    </main>
  );
}

export function OpenAccountPageClient() {
  const fields = ["Nom complet", "Telephone", "Email", "Region", "Profil", "Message"] as const;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <FinanceBackground />
      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SafetyPill text="Aucune ouverture de compte bancaire n'est effectuee ici" />
            <SectionHeader
              eyebrow="Demande future"
              icon={HandCoins}
              title="Demander a etre contacte"
              description="Cette interface prepare seulement une future demande de contact. Elle ne transmet rien dans cette version et n'ouvre aucun compte bancaire."
            />
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <h2 className="text-2xl font-black uppercase text-white">
              Formulaire maquette
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/62">
              Plus tard, lorsque des accords seront signes, cette demande pourra
              etre transmise a une banque partenaire avec consentement clair.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm font-bold text-white/50"
                >
                  {field}
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled
              className="mt-8 inline-flex cursor-not-allowed items-center justify-center gap-3 rounded-full bg-white/10 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/45"
            >
              Demander a etre contacte
              <Send size={16} aria-hidden="true" />
            </button>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}

function FinanceBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:82px_82px]" />
    </>
  );
}

function SafetyPill({ text }: { text: string }) {
  return (
    <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
      <ShieldCheck size={15} aria-hidden="true" />
      {text}
    </p>
  );
}
