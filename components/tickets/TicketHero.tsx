import { ArrowDown, CalendarDays, ShieldCheck, Sparkles } from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import { getTicketingSafetyNotice } from "@/lib/tickets/safety";

export default function TicketHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 text-white sm:px-10 lg:px-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.14),transparent_32%)]" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-yellow-400/10 bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-300">
            <Sparkles size={16} aria-hidden="true" />
            Experience officielle
          </div>

          <h1 className="font-display mt-8 text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl lg:text-8xl">
            Festival Talent
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Tickets
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/70 sm:text-xl">
            Reservez votre experience officielle Festival Talent 2027.
          </p>

          <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-white/55">
            Ici, le visiteur ne choisit pas seulement un billet. Il choisit un
            niveau d&apos;experience, un acces, une emotion et une place dans
            l&apos;histoire Festival Talent.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GradientButton href="#passes">Reserver mon Pass</GradientButton>
            <GradientButton href="#comparatif" variant="outline" icon={ArrowDown}>
              Decouvrir les Pass
            </GradientButton>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-yellow-300">
                <ShieldCheck size={17} aria-hidden="true" />
                Simulation securisee
              </div>
              <p className="mt-3 text-sm leading-6 text-white/58">
                {getTicketingSafetyNotice()}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-yellow-300">
                <CalendarDays size={17} aria-hidden="true" />
                Ouverture prochaine
              </div>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Les tarifs, dates de vente et conditions seront annonces par les
                canaux officiels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
