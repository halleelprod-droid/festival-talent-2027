import { ShieldCheck, Ticket } from "lucide-react";

export default function TicketVisualPreview() {
  return (
    <section className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            Billet electronique
          </p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
            Une preview premium, pas un vrai billet
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
            Le visuel ci-contre prepare l&apos;experience Apple Wallet / Google
            Wallet et le controle d&apos;acces futur. Il ne contient aucun QR Code
            reel et ne donne aucun droit d&apos;entree.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-yellow-400/30 bg-[linear-gradient(135deg,rgba(250,204,21,0.18),rgba(255,255,255,0.04),rgba(185,28,28,0.12))] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
                Festival Talent 2027
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase text-white">
                Pass Premium
              </h3>
              <p className="mt-2 text-sm text-white/58">Experience officielle</p>
            </div>
            <Ticket className="text-yellow-300" size={36} aria-hidden="true" />
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] gap-5">
            <div className="space-y-3 text-sm text-white/65">
              <p>Statut : Simulation</p>
              <p>Edition : 2027</p>
              <p>Canal : Officiel</p>
            </div>

            <div
              aria-label="QR Code visuel non fonctionnel"
              className="grid h-28 w-28 grid-cols-5 gap-1 rounded-lg border border-white/15 bg-white p-3"
            >
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className={`rounded-[2px] ${
                    [0, 1, 2, 5, 10, 12, 14, 18, 20, 21, 22, 24].includes(index)
                      ? "bg-black"
                      : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-lg border border-white/10 bg-black/40 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-yellow-300" size={18} />
              <p className="text-sm leading-6 text-white/65">
                Le QR Code officiel sera genere apres l&apos;ouverture de la
                billetterie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
