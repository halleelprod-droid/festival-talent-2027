import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Coins,
  CreditCard,
  Handshake,
  Landmark,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";

const bankReasons = [
  {
    title: "Inclusion financière",
    description:
      "Favoriser l'accès à une meilleure compréhension des services financiers utiles aux jeunes talents.",
    icon: PiggyBank,
  },
  {
    title: "Jeunesse",
    description:
      "Accompagner une génération de créateurs, artistes, entrepreneurs et porteurs de projets.",
    icon: Users,
  },
  {
    title: "Entrepreneuriat",
    description:
      "Préparer les talents à structurer une idée, un budget, une activité ou un projet créatif.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Éducation financière",
    description:
      "Créer des formats pédagogiques autour du budget, de l'épargne et de la gestion responsable.",
    icon: Lightbulb,
  },
  {
    title: "Impact social",
    description:
      "Soutenir des actions utiles aux régions, aux disciplines et aux parcours des jeunes.",
    icon: Handshake,
  },
  {
    title: "Économie créative",
    description:
      "Relier culture, innovation, création de contenu, mode, musique, danse et entrepreneuriat.",
    icon: TrendingUp,
  },
] as const;

const futureWorkshops = [
  { title: "Gérer son budget", icon: Coins },
  { title: "Ouvrir son premier compte", icon: CreditCard },
  { title: "Financer un projet", icon: Banknote },
  { title: "Comprendre l'épargne", icon: PiggyBank },
  { title: "Lancer une activité", icon: BriefcaseBusiness },
  { title: "Monétiser son talent", icon: Sparkles },
] as const;

const contactFields = [
  { id: "fullName", label: "Nom complet", type: "text" },
  { id: "phone", label: "Téléphone", type: "tel" },
  { id: "email", label: "Email", type: "email" },
  { id: "city", label: "Ville", type: "text" },
  { id: "project", label: "Discipline / projet", type: "text" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Banques & Finance | Festival Talent 2027",
  description:
    "Découvrez l'espace Banques & Finance du Festival Talent 2027, dédié à l'inclusion financière, l'éducation financière et l'accompagnement des jeunes talents.",
  path: "/finance/banques",
});

export default function BankingHubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,#050505_48%,#000)]" />
      <div className="pointer-events-none fixed -left-40 top-28 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
                <Landmark size={17} />
                Banking Hub
              </div>
              <h1 className="mt-8 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Banques
                <span className="block bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                  & Finance
                </span>
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-lg leading-8 text-white/70">
                Festival Talent souhaite connecter les jeunes talents à des
                opportunités d&apos;éducation financière, d&apos;accompagnement
                entrepreneurial et de mise en relation avec des partenaires
                bancaires.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="#mise-en-relation"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                >
                  Être contacté
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#opportunites"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white/80 transition hover:border-yellow-300/40 hover:text-yellow-200"
                >
                  Découvrir les opportunités
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opportunites" className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Banques & impact
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Pourquoi les banques rejoignent Festival Talent ?
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bankReasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-yellow-300/[0.055]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200">
                    <Icon size={25} />
                  </div>
                  <h3 className="mt-7 text-2xl font-black uppercase text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {reason.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
              <ShieldCheck size={17} />
              Talent Finance
            </div>
            <h2 className="mt-7 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Une vision d&apos;éducation financière responsable
            </h2>
          </div>
          <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.055] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-lg leading-8 text-white/72">
              Talent Finance est une vision portée par Festival Talent pour aider
              les jeunes talents à mieux comprendre la gestion financière,
              l&apos;épargne, l&apos;entrepreneuriat et les solutions bancaires adaptées à
              leurs projets.
            </p>
            <p className="mt-5 rounded-xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-white/58">
              Aucun service bancaire n&apos;est fourni par Festival Talent. Aucune
              donnée bancaire n&apos;est demandée sur cette interface.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Banques partenaires
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Bientôt annoncé
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
              Les partenaires bancaires officiels seront affichés uniquement
              après confirmation formelle. Aucun nom n&apos;est inventé ou présenté
              comme partenaire avant validation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-dashed border-yellow-300/25 bg-white/[0.035] p-7 text-center backdrop-blur-xl"
              >
                <Building2 className="mx-auto text-yellow-200" size={34} />
                <h3 className="mt-5 text-xl font-black uppercase text-white">
                  Banque partenaire
                </h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-yellow-200/75">
                  Bientôt annoncé
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="mise-en-relation"
        className="relative px-6 py-24 sm:px-10 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
              Mise en relation
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Une interface préparatoire, sans envoi réel.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/62">
              Ce formulaire prépare une future mise en relation. Il ne déclenche
              aucun traitement bancaire, ne collecte aucune donnée bancaire et ne
              remplace aucun contact officiel avec une institution financière.
            </p>
          </div>

          <form
            className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8"
            aria-labelledby="banking-form-title"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
                  Formulaire
                </p>
                <h3
                  id="banking-form-title"
                  className="mt-3 text-3xl font-black uppercase text-white"
                >
                  Demander à être contacté
                </h3>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/35 text-yellow-200">
                <CreditCard size={25} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {contactFields.map((field) => (
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
                placeholder="Présentez votre besoin ou votre projet."
              />
            </label>

            <p className="mt-5 rounded-xl border border-white/10 bg-black/35 p-4 text-xs leading-6 text-white/55">
              Festival Talent ne fournit pas de services bancaires. Cette demande
              sert uniquement à faciliter une mise en relation avec un partenaire
              bancaire officiel lorsque celui-ci sera confirmé.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.01] sm:w-auto"
            >
              Demander à être contacté
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Ateliers futurs
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Former avant de financer
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {futureWorkshops.map((workshop) => {
              const Icon = workshop.icon;

              return (
                <article
                  key={workshop.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35"
                >
                  <Icon className="text-yellow-200" size={28} />
                  <h3 className="mt-5 text-xl font-black uppercase text-white">
                    {workshop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Atelier préparatoire prévu pour une future programmation
                    éducative.
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-yellow-300/20 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <Banknote className="mx-auto text-yellow-200" size={42} />
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Une banque peut devenir un bâtisseur d&apos;opportunités.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
            Les institutions financières peuvent accompagner la jeunesse avec
            des programmes responsables, éducatifs et alignés avec l&apos;économie
            créative.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.02]"
            >
              Devenir partenaire
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
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
