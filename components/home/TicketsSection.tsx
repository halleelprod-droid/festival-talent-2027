import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Ticket,
  Trophy,
  Wallet,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20les%20tickets%20d'inscription%20aux%20Battles%20de%20Danse.";

export default function TicketsSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.13),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
            <Ticket size={16} />
            Tickets & réservations
          </div>

          <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Deux accès,
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              deux objectifs
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Les tickets d’inscription au Battle All Style sont différents de la
            billetterie officielle du festival. Les inscriptions aux battles
            peuvent démarrer, tandis que la billetterie Festival Talent 2027 sera
            annoncée prochainement.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[3rem] border border-yellow-400/30 bg-yellow-400/[0.08] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-black/40 text-yellow-300">
                <Wallet size={30} />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                Disponible pour les pré-sélections
              </p>

              <h3 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                Ticket Battle All Style
              </h3>

              <div className="mt-7 rounded-[2rem] border border-yellow-400/25 bg-black/35 p-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
                  Frais d’inscription
                </p>

                <p className="mt-3 text-5xl font-black uppercase text-yellow-300 sm:text-6xl">
                  2.000
                  <span className="ml-2 text-2xl text-white">FCFA</span>
                </p>
              </div>

              <ul className="mt-7 space-y-4">
                <li className="flex gap-3 text-sm leading-6 text-white/70">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-yellow-300"
                  />
                  <span>Inscription au Battle All Style par zones.</span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/70">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-yellow-300"
                  />
                  <span>Solos et groupes acceptés.</span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/70">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-yellow-300"
                  />
                  <span>500.000 FCFA à gagner et voyage en Italie.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/preselections"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition hover:scale-105"
                >
                  S’inscrire
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  Infos WhatsApp
                </Link>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white">
                <Clock size={30} />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-white/40">
                Bientôt disponible
              </p>

              <h3 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                Billetterie Festival
              </h3>

              <p className="mt-6 text-base leading-8 text-white/60">
                La billetterie officielle de Festival Talent 2027 n’est pas
                encore ouverte. Les tarifs, catégories de billets et modalités
                d’accès seront communiqués officiellement.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5">
                  <Bell className="text-yellow-300" size={25} />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-white/40">
                    Alerte
                  </p>
                  <p className="mt-1 text-lg font-black uppercase text-white">
                    Ouverture bientôt
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5">
                  <CalendarDays className="text-yellow-300" size={25} />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-white/40">
                    Édition
                  </p>
                  <p className="mt-1 text-lg font-black uppercase text-white">
                    2027
                  </p>
                </div>
              </div>

              <Link
                href="/tickets"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
              >
                Voir la page tickets
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </div>

        <div className="mt-14 rounded-[2.5rem] border border-red-500/20 bg-red-500/10 p-8 text-center backdrop-blur-xl">
          <Trophy className="mx-auto text-yellow-300" size={38} />

          <p className="mt-5 text-sm font-black uppercase tracking-[0.32em] text-yellow-300">
            Important
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70">
            Le ticket d’inscription Battle All Style à 2.000 FCFA ne remplace pas
            le billet d’accès au Festival Talent 2027. La billetterie officielle
            du festival sera annoncée séparément.
          </p>
        </div>
      </div>
    </section>
  );
}
