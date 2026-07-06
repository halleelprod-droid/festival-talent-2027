import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import type { TicketPass } from "@/types/tickets";

import TicketIcon from "./TicketIcon";

type TicketPassGridProps = {
  passes: TicketPass[];
};

const toneByColor: Record<TicketPass["color"], string> = {
  gold: "border-yellow-400/30 bg-yellow-400/[0.08]",
  white: "border-white/10 bg-white/[0.04]",
  red: "border-red-500/25 bg-red-500/[0.07]",
};

const availabilityLabel: Record<TicketPass["availability"], string> = {
  "coming-soon": "Bientot disponible",
  "request-only": "Sur demande",
  reserved: "Reserve",
};

export default function TicketPassGrid({ passes }: TicketPassGridProps) {
  return (
    <section id="passes" className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            Pass officiels
          </p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
            Une experience pour chaque role
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
            Les pass sont prepares comme des niveaux d&apos;experience. Ils ne
            sont pas encore vendus et ne declenchent aucune transaction.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {passes.map((pass) => (
            <PremiumCard
              key={pass.id}
              className={`group p-6 transition duration-300 hover:-translate-y-1 ${toneByColor[pass.color]}`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/25 bg-black/35 text-yellow-300">
                    <TicketIcon icon={pass.icon} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/65">
                    {availabilityLabel[pass.availability]}
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                  {pass.badge}
                </p>
                <h3 className="mt-3 text-2xl font-black uppercase text-white">
                  {pass.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {pass.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {pass.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm text-white/68">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <GradientButton
                    href={pass.availability === "reserved" ? "/contact" : "#processus"}
                    variant={pass.highlighted ? "gold" : "outline"}
                    className="w-full px-4 py-3 text-[10px]"
                  >
                    {pass.ctaLabel}
                  </GradientButton>
                </div>
              </article>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}
