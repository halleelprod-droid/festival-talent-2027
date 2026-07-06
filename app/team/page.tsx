import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Building2, Handshake, Users } from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { staffMembers } from "@/data/staff";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Équipe",
  description:
    "Équipe officielle Festival Talent 2027 : direction, partenariats, communication, digital, entrepreneuriat, artistique et organisation.",
  path: "/team",
});

const partnerStructures = [
  {
    name: "PIN EVENTS",
    role: "Production evenementielle, partenariats et relations institutionnelles",
    logo: "/images/partners/pin-events.png",
  },
  {
    name: "Agence Diassnor",
    role: "Gestion du pole Danse, battles et coordination artistique",
  },
];

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Équipe officielle"
            icon={Users}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Les visages
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  de la plateforme
                </span>
              </>
            }
            description="Festival Talent 2027 s'appuie sur une equipe pluridisciplinaire pour structurer la vision, les partenariats, le digital, les medias, les activites et l'accompagnement des talents."
          />
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {staffMembers.map((member) => {
            const isPierre = member.name === "Pierre Ndiaye";

            return (
              <PremiumCard
                key={member.name}
                tone={member.featured || isPierre ? "gold" : "default"}
                className={`${
                  member.featured || isPierre ? "xl:col-span-2" : ""
                }`}
              >
                <article
                  className={`grid h-full ${
                    member.featured || isPierre ? "lg:grid-cols-[0.85fr_1.15fr]" : ""
                  }`}
                >
                  <div className="relative h-72 overflow-hidden bg-zinc-950">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority={member.featured || isPierre}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#050505,#17120a,#050505)]">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-3xl font-black text-yellow-300">
                          {member.initials}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                    <div className="absolute bottom-5 left-5 rounded-full border border-yellow-400/30 bg-black/65 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300 backdrop-blur">
                      {member.department}
                    </div>
                  </div>

                  <div className="flex flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/65">
                        <BadgeCheck size={13} className="text-yellow-300" />
                        Staff officiel
                      </span>

                      {isPierre && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300">
                          <Handshake size={13} />
                          PIN EVENTS
                        </span>
                      )}
                    </div>

                    <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                      {member.name}
                    </h2>

                    <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                      {member.role}
                    </p>

                    {member.subtitle && (
                      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-white/58">
                        {member.subtitle}
                      </p>
                    )}

                    <p className="mt-5 text-sm leading-7 text-white/62">
                      {member.description}
                    </p>

                    {member.logo && (
                      <div className="mt-6 w-fit rounded-lg border border-yellow-400/25 bg-black/45 p-3">
                        <Image
                          src={member.logo.src}
                          alt={member.logo.alt}
                          width={150}
                          height={70}
                          className="h-12 w-auto object-contain"
                        />
                      </div>
                    )}

                    {member.achievements && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {member.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/68"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </PremiumCard>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Structures partenaires"
            icon={Handshake}
            align="center"
            className="max-w-4xl"
            title="Organisation & terrain"
            description="Festival Talent s'appuie sur des structures partenaires pour renforcer la production, les relations institutionnelles et la coordination artistique des disciplines."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {partnerStructures.map((structure) => (
              <PremiumCard key={structure.name} tone="gold" className="p-7">
                <article className="flex h-full flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg border border-yellow-400/25 bg-black/45 p-4">
                    {structure.logo ? (
                      <Image
                        src={structure.logo}
                        alt={`Logo ${structure.name}`}
                        width={140}
                        height={70}
                        className="h-14 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-center text-xs font-black uppercase tracking-[0.16em] text-yellow-300">
                        {structure.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-300">
                      Structure partenaire
                    </p>
                    <h2 className="mt-3 text-2xl font-black uppercase text-white">
                      {structure.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/62">
                      {structure.role}
                    </p>
                  </div>
                </article>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-10">
            <Building2 className="mx-auto text-yellow-300" size={34} />
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Une organisation pensee pour durer
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              La V5 installe une base plus lisible pour les annonces, les
              contacts, les partenaires et les futures extensions de plateforme.
            </p>
            <div className="mt-8">
              <GradientButton href="/contact">Contacter l&apos;equipe</GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
