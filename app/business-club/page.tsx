import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  Car,
  GraduationCap,
  Handshake,
  Hotel,
  Landmark,
  Network,
  Plane,
  RadioTower,
  ShieldCheck,
  Store,
  Trophy,
  Users,
} from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";

const joinReasons = [
  "Accès privilégié aux talents",
  "Networking B2B",
  "Visibilité nationale",
  "Relations institutionnelles",
  "Impact RSE",
  "Innovation",
  "Recrutement",
  "Économie créative",
] as const;

const memberTypes = [
  { title: "🏦 Banques", icon: Banknote },
  { title: "📱 Télécommunications", icon: RadioTower },
  { title: "✈ Compagnies aériennes", icon: Plane },
  { title: "🏨 Hôtellerie", icon: Hotel },
  { title: "🎓 Universités", icon: GraduationCap },
  { title: "🚗 Automobile", icon: Car },
  { title: "🛍 Grandes entreprises", icon: Store },
  { title: "🏛 Institutions", icon: Landmark },
  { title: "🌍 Organisations internationales", icon: Building2 },
] as const;

const benefits = [
  "Networking",
  "Conférences privées",
  "Village Business",
  "Rencontres VIP",
  "Business Forum",
  "Accès aux talents",
  "Visibilité digitale",
  "Études d'impact",
] as const;

const timeline = [
  "Business Breakfast",
  "Conférences",
  "Networking",
  "Festival",
  "Cocktail Partenaires",
] as const;

const foundingMembers = [
  "PIN EVENTS",
  "SIDRA",
  "HALLEEL",
  "Agence Diassnor",
  "Centre Culturel Blaise Senghor",
  "Union Européenne",
] as const;

const formFields = [
  { id: "company", label: "Entreprise", type: "text" },
  { id: "leader", label: "Responsable", type: "text" },
  { id: "position", label: "Fonction", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "phone", label: "Téléphone", type: "tel" },
  { id: "sector", label: "Secteur", type: "text" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Business Club | Festival Talent 2027",
  description:
    "Festival Talent Business Club : réseau officiel pour entreprises, banques, investisseurs, institutions et partenaires engagés dans la jeunesse, le business, le networking et l'économie créative.",
  path: "/business-club",
});

export default function BusinessClubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,#050505_48%,#000)]" />
      <div className="pointer-events-none fixed -left-40 top-28 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
                <Network size={17} />
                Réseau officiel partenaires
              </div>
              <h1 className="mt-8 max-w-6xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Festival Talent
                <span className="block bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                  Business Club
                </span>
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-lg leading-8 text-white/70">
                Le réseau officiel des partenaires qui investissent dans la
                jeunesse, la culture, l&apos;innovation et l&apos;économie
                créative.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="#adhesion"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                >
                  Devenir membre
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white/80 transition hover:border-yellow-300/40 hover:text-yellow-200"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Pourquoi rejoindre le Business Club ?
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Un cercle d&apos;opportunités et d&apos;impact
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {joinReasons.map((reason, index) => (
              <article
                key={reason}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-yellow-300/[0.055]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200">
                  <span className="text-sm font-black">{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-black uppercase text-white">
                  {reason}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
                <Handshake size={17} />
                Qui peut rejoindre ?
              </div>
              <h2 className="mt-7 text-4xl font-black uppercase leading-tight sm:text-6xl">
                Un réseau pour les organisations qui construisent demain
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {memberTypes.map((type) => {
                const Icon = type.icon;

                return (
                  <article
                    key={type.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:border-yellow-300/35"
                  >
                    <Icon className="text-yellow-200" size={28} />
                    <h3 className="mt-5 text-lg font-black uppercase text-white">
                      {type.title}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.055] p-8 shadow-2xl shadow-black/35 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
                Les avantages
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
                Une plateforme relationnelle à forte valeur
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-4 text-sm font-semibold text-white/72"
                >
                  <BadgeCheck size={17} className="shrink-0 text-yellow-200" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
              <CalendarDays size={17} />
              Calendrier
            </div>
            <h2 className="mt-7 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Des temps forts pour connecter les décideurs
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4">
            {timeline.map((step, index) => (
              <article
                key={step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-300/25 bg-yellow-300/10 text-sm font-black text-yellow-200">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white">
                    {step}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Membres fondateurs
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Partenaires confirmés uniquement
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
              Les banques seront ajoutées uniquement lorsqu&apos;elles seront
              officiellement confirmées comme partenaires.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {foundingMembers.map((member) => (
              <article
                key={member}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35"
              >
                <Trophy className="mx-auto text-yellow-200" size={30} />
                <h3 className="mt-5 text-xl font-black uppercase text-white">
                  {member}
                </h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-200/70">
                  Confirmé
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="adhesion" className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
              Adhésion
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Entrer dans le cercle des bâtisseurs.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/62">
              Ce formulaire prépare une prise de contact. Il ne crée aucune
              adhésion automatique et permet simplement à l&apos;équipe Festival
              Talent d&apos;orienter les demandes business, institutionnelles et
              partenariales.
            </p>
          </div>

          <form
            className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8"
            aria-labelledby="business-club-form-title"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
                  Formulaire Business Club
                </p>
                <h3
                  id="business-club-form-title"
                  className="mt-3 text-3xl font-black uppercase text-white"
                >
                  Être contacté
                </h3>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/35 text-yellow-200">
                <Users size={25} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {formFields.map((field) => (
                <label key={field.id} className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                    {field.label}
                  </span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/55"
                    placeholder={field.label}
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                Message
              </span>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/55"
                placeholder="Présentez votre organisation et votre intérêt pour le Business Club."
              />
            </label>

            <button
              type="button"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.01] sm:w-auto"
            >
              Être contacté
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-yellow-300/20 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <ShieldCheck className="mx-auto text-yellow-200" size={42} />
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Le Business Club transforme le partenariat en héritage.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
            Festival Talent construit un réseau d&apos;organisations capables
            d&apos;investir dans la jeunesse, la culture, l&apos;innovation et
            l&apos;économie créative avec exigence et vision.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.02]"
            >
              Voir les partenaires
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/institution/contact-institutionnel"
              className="inline-flex items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/10 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
            >
              Contact institutionnel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
