import { Download, FileText, Headphones, History, Ticket, WalletCards } from "lucide-react";

import type { TicketAccountFeature } from "@/types/tickets";

type TicketAccountMockupProps = {
  features: TicketAccountFeature[];
};

const iconByTitle: Record<string, typeof Ticket> = {
  "Mes billets": Ticket,
  Historique: History,
  Factures: FileText,
  Telechargements: Download,
  Wallet: WalletCards,
  Support: Headphones,
};

export default function TicketAccountMockup({ features }: TicketAccountMockupProps) {
  return (
    <section className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            Compte utilisateur
          </p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
            Maquettes uniquement
          </h2>
          <p className="mt-5 text-base leading-8 text-white/62">
            Aucun espace personnel n&apos;est active aujourd&apos;hui. Ces blocs
            preparent l&apos;architecture future sans authentification reelle.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconByTitle[feature.title] ?? Ticket;

            return (
              <div
                key={feature.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <Icon className="text-yellow-300" size={28} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black uppercase text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
