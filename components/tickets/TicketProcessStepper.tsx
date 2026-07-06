import { ArrowDown, CircleDot } from "lucide-react";

import type { TicketProcessStep } from "@/types/tickets";

type TicketProcessStepperProps = {
  steps: TicketProcessStep[];
};

export default function TicketProcessStepper({ steps }: TicketProcessStepperProps) {
  return (
    <section id="processus" className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            Processus simule
          </p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
            De la selection au billet electronique
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
            Le parcours est prepare pour la future billetterie. Cette version ne
            collecte pas d&apos;information, ne facture pas et ne genere aucun billet.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <article className="h-full rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-sm font-black text-yellow-300">
                    {index + 1}
                  </div>
                  <CircleDot size={18} className="text-yellow-300" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-black uppercase text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {step.description}
                </p>
              </article>

              {index < steps.length - 1 && (
                <ArrowDown
                  className="mx-auto my-4 text-yellow-300/70 lg:absolute lg:-right-5 lg:top-1/2 lg:my-0 lg:-translate-y-1/2 lg:-rotate-90"
                  size={22}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
