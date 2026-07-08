"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Compass,
  Globe2,
  MapPinned,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type RegionStatus = "Ouverture prochaine" | "En preparation" | "Annonce a venir";

type SenegalRegion = {
  name: string;
  path: string;
  preselections: string;
  discipline: string;
  date: string;
  status: RegionStatus;
};

const regions: SenegalRegion[] = [
  {
    name: "Dakar",
    path: "M72 214 L128 196 L142 234 L104 266 L62 250 Z",
    preselections: "Pole urbain pilote",
    discipline: "Danse, musique, influence",
    date: "A annoncer",
    status: "En preparation",
  },
  {
    name: "Thies",
    path: "M130 178 L214 168 L236 224 L142 234 L128 196 Z",
    preselections: "Zone ouest",
    discipline: "Danse, mode, musique",
    date: "A confirmer",
    status: "Ouverture prochaine",
  },
  {
    name: "Diourbel",
    path: "M236 168 L318 154 L350 202 L302 252 L236 224 Z",
    preselections: "Zone centre",
    discipline: "Musique, art, entrepreneuriat",
    date: "A annoncer",
    status: "Annonce a venir",
  },
  {
    name: "Louga",
    path: "M168 86 L342 72 L388 136 L318 154 L214 168 Z",
    preselections: "Antenne nord-ouest",
    discipline: "Culture urbaine, musique",
    date: "A annoncer",
    status: "Annonce a venir",
  },
  {
    name: "Saint-Louis",
    path: "M218 22 L442 28 L458 92 L388 136 L342 72 L168 86 Z",
    preselections: "Antenne nord",
    discipline: "Musique, mode, innovation",
    date: "A confirmer",
    status: "Ouverture prochaine",
  },
  {
    name: "Matam",
    path: "M458 92 L604 104 L648 178 L558 218 L466 172 Z",
    preselections: "Couloir fleuve",
    discipline: "Musique, danse, entrepreneuriat",
    date: "A annoncer",
    status: "Annonce a venir",
  },
  {
    name: "Kaffrine",
    path: "M350 202 L466 172 L512 248 L452 316 L352 292 L302 252 Z",
    preselections: "Zone centre-est",
    discipline: "Danse, entrepreneuriat, art",
    date: "A confirmer",
    status: "En preparation",
  },
  {
    name: "Kaolack",
    path: "M236 224 L302 252 L352 292 L304 362 L214 338 L184 270 Z",
    preselections: "Bassin culturel",
    discipline: "Musique, danse, mode",
    date: "A annoncer",
    status: "Ouverture prochaine",
  },
  {
    name: "Fatick",
    path: "M104 266 L184 270 L214 338 L154 384 L86 342 Z",
    preselections: "Zone delta",
    discipline: "Danse, chant, arts visuels",
    date: "A confirmer",
    status: "Annonce a venir",
  },
  {
    name: "Tambacounda",
    path: "M512 248 L658 236 L724 332 L666 430 L536 390 L452 316 Z",
    preselections: "Grand est",
    discipline: "Innovation, musique, entrepreneuriat",
    date: "A annoncer",
    status: "Annonce a venir",
  },
  {
    name: "Kedougou",
    path: "M536 390 L666 430 L650 514 L540 538 L466 462 Z",
    preselections: "Sud-est",
    discipline: "Musique, danse, culture urbaine",
    date: "A confirmer",
    status: "Annonce a venir",
  },
  {
    name: "Kolda",
    path: "M304 362 L452 316 L536 390 L466 462 L330 456 L254 408 Z",
    preselections: "Casamance est",
    discipline: "Danse, musique, art",
    date: "A annoncer",
    status: "En preparation",
  },
  {
    name: "Sedhiou",
    path: "M154 384 L254 408 L330 456 L276 518 L158 500 L112 438 Z",
    preselections: "Casamance centre",
    discipline: "Musique, mode, danse",
    date: "A confirmer",
    status: "Annonce a venir",
  },
  {
    name: "Ziguinchor",
    path: "M72 444 L112 438 L158 500 L276 518 L248 574 L104 558 L46 502 Z",
    preselections: "Casamance ouest",
    discipline: "Danse, musique, arts visuels",
    date: "A annoncer",
    status: "Ouverture prochaine",
  },
];

const statusClass: Record<RegionStatus, string> = {
  "Ouverture prochaine": "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  "En preparation": "border-yellow-300/30 bg-yellow-400/10 text-yellow-200",
  "Annonce a venir": "border-white/15 bg-white/[0.06] text-white/70",
};

export default function SenegalMapPageClient() {
  const [selectedName, setSelectedName] = useState("Dakar");
  const selected = useMemo(
    () => regions.find((region) => region.name === selectedName) ?? regions[0],
    [selectedName],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.13),transparent_32%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:84px_84px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Carte interactive"
              icon={MapPinned}
              title={
                <>
                  Carte du
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Senegal
                  </span>
                </>
              }
              description="Explorez les regions et preparez la future organisation des preselections Festival Talent. Les dates restent indicatives tant qu'elles ne sont pas annoncees officiellement."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="/preselections" icon={Sparkles}>
                Preselections
              </GradientButton>
              <GradientButton href="/contact" variant="outline" icon={Globe2}>
                Extension Afrique
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-yellow-300/30 bg-black/35 text-yellow-200">
                <MousePointerClick size={25} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
                  Cliquez une region
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase text-white">
                  {selected.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  La carte est une interface preparatoire. Elle pourra plus tard
                  etre connectee a une base de donnees, a un calendrier officiel
                  et a une extension vers toute l&apos;Afrique.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <PremiumCard className="p-4 sm:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-3 sm:p-6">
              <svg
                viewBox="0 0 780 620"
                role="img"
                aria-label="Carte interactive stylisee des quatorze regions du Senegal"
                className="h-auto w-full"
              >
                <defs>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="780" height="620" rx="34" fill="rgba(255,255,255,0.025)" />
                <path
                  d="M36 594 C126 570 214 604 318 568 C442 524 506 568 648 522 C710 502 742 474 754 444"
                  fill="none"
                  stroke="rgba(250,204,21,0.22)"
                  strokeWidth="2"
                  strokeDasharray="8 12"
                />

                {regions.map((region) => {
                  const active = region.name === selected.name;

                  return (
                    <g key={region.name}>
                      <path
                        d={region.path}
                        tabIndex={0}
                        role="button"
                        aria-label={`${region.name}, ${region.discipline}, ${region.status}`}
                        onClick={() => setSelectedName(region.name)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedName(region.name);
                          }
                        }}
                        className="cursor-pointer outline-none transition duration-300"
                        fill={active ? "rgba(250,204,21,0.72)" : "rgba(255,255,255,0.08)"}
                        stroke={active ? "rgba(250,204,21,1)" : "rgba(255,255,255,0.26)"}
                        strokeWidth={active ? 4 : 2}
                        filter={active ? "url(#goldGlow)" : undefined}
                      />
                    </g>
                  );
                })}

                {regions.map((region) => {
                  const match = region.path.match(/M(\d+) (\d+)/);
                  const x = match ? Number(match[1]) + 18 : 0;
                  const y = match ? Number(match[2]) + 20 : 0;

                  return (
                    <text
                      key={`${region.name}-label`}
                      x={x}
                      y={y}
                      fill={region.name === selected.name ? "#111" : "rgba(255,255,255,0.74)"}
                      fontSize="16"
                      fontWeight="800"
                      letterSpacing="0"
                      pointerEvents="none"
                    >
                      {region.name}
                    </text>
                  );
                })}
              </svg>
            </div>
          </PremiumCard>

          <div className="grid gap-6">
            <PremiumCard tone="gold" className="p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
                Region selectionnee
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase text-white">
                {selected.name}
              </h2>
              <div className={`mt-5 inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${statusClass[selected.status]}`}>
                {selected.status}
              </div>
            </PremiumCard>

            <PremiumCard className="p-7">
              <div className="grid gap-4">
                <InfoRow icon={BadgeCheck} label="Preselections" value={selected.preselections} />
                <InfoRow icon={Compass} label="Discipline" value={selected.discipline} />
                <InfoRow icon={CalendarDays} label="Date" value={selected.date} />
              </div>
            </PremiumCard>

            <PremiumCard className="p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                Future extension
              </p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Cette carte pourra evoluer vers une cartographie africaine :
                pays, villes, editions, disciplines, partenaires locaux et
                calendriers officiels.
              </p>
            </PremiumCard>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
            {label}
          </p>
          <p className="mt-2 text-base font-bold leading-7 text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
