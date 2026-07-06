import { AlertTriangle, CheckCircle2 } from "lucide-react";

import type { TicketFutureCapability } from "@/types/tickets";

type TicketFutureArchitectureProps = {
  capabilities: TicketFutureCapability[];
};

const riskLabel: Record<TicketFutureCapability["riskLevel"], string> = {
  low: "Risque faible",
  medium: "Risque moyen",
  high: "Risque eleve",
};

export default function TicketFutureArchitecture({
  capabilities,
}: TicketFutureArchitectureProps) {
  return (
    <section className="relative px-6 pb-28 pt-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-lg border border-yellow-400/25 bg-yellow-400/[0.07] p-7 backdrop-blur-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <AlertTriangle className="text-yellow-300" size={34} aria-hidden="true" />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Architecture future
            </p>
            <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
              Pret a connecter, pas encore connecte
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65">
              La phase suivante devra etre contractualisee, auditee et securisee
              avant toute integration paiement, QR Code, PDF, emails ou wallet.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="rounded-lg border border-white/10 bg-black/35 p-5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-yellow-300" size={19} aria-hidden="true" />
                  <h3 className="font-black uppercase text-white">
                    {capability.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {capability.description}
                </p>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-red-200">
                  {riskLabel[capability.riskLevel]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
