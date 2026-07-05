import { Gavel, Timer } from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";

export default function JuryComingSoonSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(234,179,8,0.08),transparent,rgba(185,28,28,0.08))]" />

      <div className="relative mx-auto max-w-7xl">
        <PremiumCard tone="gold" className="p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                <Timer size={14} />
                Annonce officielle a venir
              </div>

              <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                Les jurys seront annonces progressivement
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                Les membres du jury seront communiques officiellement avant les
                grandes phases de selection. Ils accompagneront l&apos;evaluation des
                talents selon les disciplines.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/30 bg-black/35 text-yellow-300">
                <Gavel size={30} />
              </div>
              <GradientButton href="/programme">Voir le programme</GradientButton>
            </div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
