import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Mail, Phone, Sparkles, Users } from "lucide-react";

import Badge from "@/components/ui/Badge";
import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { officialPartners } from "@/data/partners";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agence Diassnor | Festival Talent 2027",
  description:
    "Agence Diassnor, responsable du Pole Danse Festival Talent 2027 : management artistique, evenementiel, battles, preselections et talents choregraphiques.",
  path: "/partners/diassnor",
});

type DiassnorPartner = (typeof officialPartners)[number] & {
  responsibility: string;
};

function isDiassnorPartner(
  partner: (typeof officialPartners)[number],
): partner is DiassnorPartner {
  return partner.name === "Agence Diassnor" && "responsibility" in partner;
}

const diassnor = officialPartners.find(isDiassnorPartner);

const logoPath = "/images/partners/agence-diassnor.png";
const logoExists = existsSync(
  join(process.cwd(), "public", "images", "partners", "agence-diassnor.png"),
);

function DiassnorLogo() {
  if (logoExists) {
    return (
      <Image
        src={logoPath}
        alt="Logo Agence Diassnor"
        width={420}
        height={320}
        className="max-h-64 w-auto object-contain"
      />
    );
  }

  return (
    <div className="text-center">
      <p className="text-4xl font-black uppercase tracking-[0.16em] text-yellow-300 sm:text-5xl">
        Diassnor
      </p>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.28em] text-white/55">
        Management artistique
      </p>
    </div>
  );
}

export default function DiassnorPartnerPage() {
  if (!diassnor) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.13),transparent_34%),linear-gradient(to_bottom,#000,rgba(12,8,3,0.98),#000)]" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <SectionHeader
            eyebrow="Partenaire officiel"
            icon={Sparkles}
            title={
              <>
                Agence
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                  Diassnor
                </span>
              </>
            }
            description="Management artistique, evenementiel et responsabilite officielle du Pole Danse Festival Talent."
          />

          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <div className="mx-auto flex aspect-[4/3] max-w-md items-center justify-center rounded-lg border border-yellow-400/25 bg-black/55 p-8">
              <DiassnorLogo />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Badge size="sm">Responsable du Pole Danse</Badge>
              <Badge size="sm" color="red">
                Battles
              </Badge>
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PremiumCard className="p-8 sm:p-10">
            <Badge icon={BadgeCheck}>Responsabilite officielle</Badge>
            <h2 className="mt-7 text-3xl font-black uppercase text-white sm:text-4xl">
              Pole Danse Festival Talent
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65">
              {diassnor.description}
            </p>
            <p className="mt-6 rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-5 text-sm leading-7 text-white/68">
              {diassnor.responsibility}
            </p>
          </PremiumCard>

          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <Badge icon={Users}>Coordonnees</Badge>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:diassnor098@gmail.com"
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-black/35 p-5 text-white/75 transition hover:border-yellow-400/35 hover:text-yellow-300"
              >
                <Mail size={20} className="shrink-0" aria-hidden="true" />
                <span className="text-sm font-black uppercase tracking-[0.12em]">
                  diassnor098@gmail.com
                </span>
              </a>
              <a
                href="tel:+221756324394"
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-black/35 p-5 text-white/75 transition hover:border-yellow-400/35 hover:text-yellow-300"
              >
                <Phone size={20} className="shrink-0" aria-hidden="true" />
                <span className="text-sm font-black uppercase tracking-[0.12em]">
                  +221 75 632 43 94
                </span>
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GradientButton href="/preselections">Preselections</GradientButton>
              <GradientButton href="/partners" variant="outline">
                Partenaires
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
