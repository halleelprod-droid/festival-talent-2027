import { Check, Minus } from "lucide-react";

import type { TicketComparisonFeature } from "@/types/tickets";

type TicketComparisonProps = {
  features: TicketComparisonFeature[];
};

export default function TicketComparison({ features }: TicketComparisonProps) {
  const columns = [
    { key: "standard", label: "Standard" },
    { key: "premium", label: "Premium" },
    { key: "vip", label: "VIP" },
  ] as const;

  return (
    <section id="comparatif" className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Comparatif
            </p>
            <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
              Choisir le bon niveau d&apos;experience
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/58">
            Ce tableau est une maquette preparatoire. Les avantages finaux
            seront confirmes avant l&apos;ouverture officielle.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">
              Comparatif des Pass Standard, Premium et VIP.
            </caption>
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.18em] text-white/55">
                  Avantage
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-5 py-5 text-center text-xs font-black uppercase tracking-[0.18em] text-yellow-300"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-b border-white/10 last:border-b-0">
                  <th className="px-5 py-4 text-sm font-semibold text-white/75">
                    {feature.label}
                  </th>
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 text-center">
                      {feature[column.key] ? (
                        <Check className="mx-auto text-yellow-300" size={20} aria-label="Inclus" />
                      ) : (
                        <Minus className="mx-auto text-white/25" size={20} aria-label="Non inclus" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
