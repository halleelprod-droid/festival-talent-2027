import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Crown,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20%C3%AAtre%20inform%C3%A9%20d%C3%A8s%20l'ouverture%20des%20r%C3%A9servations%20pour%20Festival%20Talent%202027.";

const reservationSteps = [
  {
    icon: Bell,
    title: "Recevoir l’alerte",
    description:
      "Soyez informé en priorité dès l’ouverture officielle des réservations.",
  },
  {
    icon: Ticket,
    title: "Accéder aux billets",
    description:
      "Les différentes catégories de billets seront communiquées officiellement.",
  },
  {
    icon: Crown,
    title: "Vivre l’expérience",
    description:
      "Profitez d’un événement international entre talents, culture, mode, musique et innovation.",
  },
];

const benefits = [
  "Information prioritaire sur l’ouverture des billets",
  "Accès aux annonces officielles du festival",
  "Possibilité de suivre les pré-sélections",
  "Mise à jour sur les artistes confirmés",
];

export default function TicketsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(10,8,2,0.98),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-28 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Ticket size={17} />
              Billetterie officielle
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Réservations
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                bientôt disponibles
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              La billetterie officielle de Festival Talent 2027 sera annoncée
              prochainement. Pour le moment, les réservations ne sont pas encore
              ouvertes. Vous pouvez toutefois demander à être informé en
              priorité dès l’ouverture.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Être informé
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/preselections"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Voir les pré-sélections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {reservationSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={30} />
                  </div>

                  <h2 className="mt-7 text-2xl font-black uppercase text-white">
                    {step.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <article className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 p-5 text-yellow-300">
                <Clock size={36} />
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                Information importante
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                La billetterie n’est pas encore ouverte
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/65">
                Festival Talent communiquera officiellement l’ouverture des
                réservations, les catégories de billets, les tarifs et les
                modalités d’accès. Toute information importante sera publiée sur
                le site officiel et les canaux de communication du festival.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
                >
                  Me prévenir sur WhatsApp
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/media"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  Voir les médias
                </Link>
              </div>
            </div>
          </article>

          <aside className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
              <ShieldCheck size={30} />
            </div>

            <h3 className="mt-7 text-3xl font-black uppercase text-white">
              Accès prioritaire
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/55">
              En demandant l’alerte, vous restez connecté aux annonces
              officielles autour de Festival Talent 2027.
            </p>

            <ul className="mt-7 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 text-sm leading-6 text-white/65"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-yellow-300"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
            <Sparkles size={38} />
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Festival Talent 2027
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Paris & Rome arrivent bientôt
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Les pré-sélections sont ouvertes pour les talents en danse, musique,
            mode, art, entrepreneuriat, technologie, culture urbaine et sports
            mécaniques.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
            >
              S’inscrire aux pré-sélections
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/programme"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              <CalendarDays size={16} />
              Voir le programme
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
