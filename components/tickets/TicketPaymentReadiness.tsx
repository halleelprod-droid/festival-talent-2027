import { CreditCard, Landmark, Smartphone } from "lucide-react";

import type { TicketPaymentMethod } from "@/types/tickets";

type TicketPaymentReadinessProps = {
  methods: TicketPaymentMethod[];
};

export default function TicketPaymentReadiness({
  methods,
}: TicketPaymentReadinessProps) {
  return (
    <section className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
              <CreditCard size={28} aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Paiements prepares
            </p>
            <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
              Aucun paiement n&apos;est connecte
            </h2>
            <p className="mt-5 text-base leading-8 text-white/62">
              Wave, Orange Money, Free Money, carte bancaire et wallets sont
              affiches uniquement comme architecture future. Aucune transaction
              n&apos;est possible dans cette version.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {methods.map((method) => {
              const Icon = method.region === "local" ? Smartphone : Landmark;

              return (
                <div
                  key={method.name}
                  className="rounded-lg border border-white/10 bg-black/35 p-5"
                >
                  <Icon className="text-yellow-300" size={24} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black uppercase text-white">
                    {method.name}
                  </h3>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-white/55">
                    {method.status === "coming-soon" ? "Bientot" : "Prevu"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
