"use client";

import {
  BadgeCheck,
  Camera,
  FileText,
  GraduationCap,
  IdCard,
  Link2,
  MapPinned,
  Medal,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

const skills = [
  { label: "Creativite", value: 92 },
  { label: "Expression", value: 84 },
  { label: "Discipline", value: 78 },
  { label: "Scene", value: 88 },
] as const;

const certificates = [
  "Preselection validee",
  "Session coaching",
  "Masterclass future",
] as const;

const badges = [
  "Talent prometteur",
  "Battle Ready",
  "Portfolio complet",
  "Ambassadeur region",
] as const;

export default function PassportPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.13),transparent_32%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:82px_82px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
              <ShieldCheck size={15} aria-hidden="true" />
              Maquette concept - aucune authentification
            </p>

            <SectionHeader
              eyebrow="Passeport Talent"
              icon={IdCard}
              title={
                <>
                  Le futur
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Passeport Talent
                  </span>
                </>
              }
              description="Une maquette pour imaginer comment un candidat pourrait presenter son parcours, ses competences, ses badges, ses certificats et son portfolio."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/espace-talent" icon={UserRound}>
                Espace Talent
              </GradientButton>
              <GradientButton href="/preselections" variant="outline" icon={Sparkles}>
                Preparer ma candidature
              </GradientButton>
            </div>
          </div>

          <TalentPassportCard />
        </motion.div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader as="h2"
              eyebrow="Competences"
              icon={GraduationCap}
              title="Progression du talent"
              description="Ces barres sont fictives. Elles prefigurent un futur suivi de progression relie a des evaluations, coachs et activites officielles."
            />

            <div className="mt-8 space-y-6">
              {skills.map((skill) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between gap-4 text-sm font-black uppercase tracking-[0.16em]">
                    <span className="text-white/80">{skill.label}</span>
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

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <SectionHeader as="h2"
              eyebrow="Identite verifiable"
              icon={QrCode}
              title="QR Code fictif"
              description="Le QR est une illustration non fonctionnelle. Plus tard, il pourrait pointer vers un profil securise, avec consentement du candidat."
            />

            <div className="mt-8 flex justify-center">
              <FakeQrCode />
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader as="h2"
              eyebrow="Certificats"
              icon={FileText}
              title="Certificats futurs"
              description="Aucun certificat reel n'est emis ici. Cette zone prepare une future logique de documents officiels."
            />
            <div className="mt-8 grid gap-4">
              {certificates.map((certificate) => (
                <div
                  key={certificate}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <BadgeCheck className="text-yellow-300" size={24} aria-hidden="true" />
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-white">
                    {certificate}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard className="p-7 sm:p-8">
            <SectionHeader as="h2"
              eyebrow="Badges"
              icon={Medal}
              title="Badges de parcours"
              description="Les badges sont illustratifs. Ils pourront plus tard refleter des etapes franchies, des validations et des distinctions."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-xl border border-yellow-400/20 bg-yellow-400/[0.07] p-5"
                >
                  <Star className="text-yellow-300" size={24} aria-hidden="true" />
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-white">
                    {badge}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <Link2 size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Un futur portfolio professionnel.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Le Passeport Talent pourrait demain rassembler portfolio, videos,
              photos, certificats, badges et recommandations, sans exposer de
              donnees privees sans autorisation.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton href="/connect" icon={Link2}>
                Voir Connect
              </GradientButton>
              <GradientButton href="/contact" variant="outline" icon={Sparkles}>
                Contacter l&apos;equipe
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}

function TalentPassportCard() {
  return (
    <PremiumCard tone="gold" className="p-5 sm:p-6">
      <div className="rounded-2xl border border-yellow-300/25 bg-black/35 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
              Passeport Talent
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase text-white">
              Talent Demo
            </h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-white/50">
              ID fictif FT-2027-0001
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-yellow-300">
            <Camera size={34} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <PassportField icon={Sparkles} label="Discipline" value="Danse urbaine" />
          <PassportField icon={UserRound} label="Coach" value="A attribuer" />
          <PassportField icon={MapPinned} label="Region" value="Dakar" />
          <PassportField icon={Link2} label="Portfolio" value="Lien futur" />
        </div>

        <div className="mt-8 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.08] p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
            Statut
          </p>
          <p className="mt-3 text-lg font-black uppercase text-white">
            Maquette non connectee
          </p>
        </div>
      </div>
    </PremiumCard>
  );
}

function PassportField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <Icon className="text-yellow-300" size={21} aria-hidden="true" />
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function FakeQrCode() {
  const cells = [
    0, 1, 2, 4, 5, 7, 8, 10, 12, 13, 16, 17, 18, 20, 22, 24, 25, 27, 31, 32, 34,
    36, 38, 39, 41, 42, 45, 47, 48, 50, 53, 54, 56, 57, 58, 60, 61, 63, 64, 66,
    68, 70, 72, 73, 75, 76, 78, 80,
  ];

  return (
    <div
      aria-label="QR Code fictif non fonctionnel"
      className="grid h-56 w-56 grid-cols-9 gap-1 rounded-2xl border border-white/15 bg-white p-4"
    >
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={`rounded-[2px] ${cells.includes(index) ? "bg-black" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}
