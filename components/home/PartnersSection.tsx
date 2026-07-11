import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Gem,
  Globe2,
  Handshake,
  Megaphone,
  Sparkles,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

const officialPartners = [
  {
    name: "Union Européenne",
    label: "Partenaire Officiel Majeur",
    description:
      "L’Union Européenne accompagne Festival Talent 2027 dans sa vision de promotion des jeunes talents, de la culture, de l’innovation et de l’entrepreneuriat.",
    icon: Globe2,
    featured: true,
  },
  {
    name: "Sen Influenceurs",
    label: "Partenaire Média & Influence Officiel",
    description:
      "Sen Influenceurs accompagne Festival Talent 2027 dans sa stratégie digitale, la communication d’influence, la promotion des talents et la couverture médiatique des activités.",
    icon: Megaphone,
  },
  {
    name: "PIN EVENTS",
    label: "Partenaire Événementiel, Production & Relations Institutionnelles",
    description:
      "PIN EVENTS accompagne Festival Talent 2027 dans l’organisation des activités, la production événementielle, les partenariats stratégiques, les relations institutionnelles et les activations terrain.",
    icon: Handshake,
    logo: "/images/partners/pin-events.png",
  },
  {
    name: "Agence Diassnor",
    label: "Responsable du Pole Danse",
    description:
      "Agence specialisee dans le management artistique et l'evenementiel, Diassnor pilote le Pole Danse, les battles, les preselections et l'accompagnement des danseurs.",
    icon: Sparkles,
    logo: "/images/partners/agence-diassnor.png",
  },
  {
    name: "Centre Culturel Blaise Senghor",
    label: "Partenaire Danse",
    description:
      "Partenaire institutionnel, le Centre Culturel Blaise Senghor contribue a la valorisation des arts choregraphiques et a l'encadrement des jeunes talents.",
    icon: Building2,
    logo: "/images/partners/blaise-senghor.png",
  },
  {
    name: "Mano Perfetto",
    label: "Partenaire Construction & Développement",
    description:
      "Mano Perfetto accompagne Festival Talent 2027 comme partenaire construction et développement.",
    icon: Building2,
  },
  {
    name: "H & Hair",
    label: "Partenaire Beauté & Lifestyle",
    description:
      "H & Hair accompagne Festival Talent 2027 sur l’univers beauté, lifestyle et image.",
    icon: Sparkles,
  },
  {
    name: "Universal Selfcare",
    label: "Partenaire Bien-être & Santé",
    description:
      "Universal Selfcare accompagne Festival Talent 2027 sur les dimensions bien-être, santé et selfcare.",
    icon: Gem,
  },
];

const associatedPartners = ["VAL2EVENTS"];

function hasPublicAsset(src: string) {
  return existsSync(join(process.cwd(), "public", src));
}

export default function PartnersSection() {
  return (
    <section className="section-cinema relative border-t border-white/10 bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Official Partners"
          tone="amber"
          align="center"
          titleClassName="uppercase"
          title="Nos partenaires"
          description="Festival Talent 2027 rassemble institutions, medias, partenaires culturels et organisations autour de la jeunesse, de la creation et de l'innovation."
        />

        <div className="mt-12 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {officialPartners.map((partner) => {
            const Icon = partner.icon;

            return (
              <article
                key={partner.name}
                data-premium-card
                className={`world-card group relative overflow-hidden rounded-2xl border p-5 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 sm:rounded-[2rem] sm:p-8 ${
                  partner.featured
                    ? "border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/15 lg:col-span-3"
                    : "border-yellow-400/25 bg-yellow-400/[0.06] hover:border-yellow-400/45"
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative z-10 grid gap-7 md:grid-cols-[auto_1fr] md:items-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                      partner.featured
                        ? "border-blue-300/35 bg-blue-300/10 text-blue-200"
                        : "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    <Icon size={30} />
                  </div>

                  <div>
                    <p
                      className={`text-xs font-black uppercase tracking-[0.28em] ${
                        partner.featured ? "text-blue-200" : "text-yellow-300"
                      }`}
                    >
                      {partner.label}
                    </p>

                    <h3 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-5xl">
                      {partner.name}
                    </h3>

                    {"logo" in partner && partner.logo ? (
                      <div className="mt-4 inline-flex rounded-2xl border border-yellow-400/25 bg-black/40 p-3">
                        {hasPublicAsset(partner.logo) ? (
                          <Image
                            src={partner.logo}
                            alt={`Logo ${partner.name}`}
                            width={150}
                            height={48}
                            className="h-16 w-full max-w-full object-contain sm:h-20"
                          />
                        ) : (
                          <span className="flex h-12 min-w-36 items-center justify-center text-center text-xs font-black uppercase tracking-[0.16em] text-yellow-300">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    ) : null}

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <GlassCard variant="gold" className="mt-12 p-6 text-center">
          <BadgeCheck className="mx-auto text-yellow-300" size={24} />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/70">
            Liste officielle des partenaires Festival Talent 2027
          </p>
        </GlassCard>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {associatedPartners.map((partner) => (
            <GlassCard key={partner} className="p-5 text-center">
              <BadgeCheck className="mx-auto text-yellow-300" size={22} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/75">
                {partner}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
