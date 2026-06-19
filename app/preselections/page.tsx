import type { Metadata } from "next";
import Link from "next/link";
import PreselectionForm from "@/components/preselections/PreselectionForm";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Brush,
  Building2,
  Car,
  Cpu,
  Gem,
  Mic2,
  Music,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pré-sélections | Festival Talent 2027",
  description:
    "Inscrivez-vous aux pré-sélections officielles de Festival Talent 2027 : danse, musique, mode, art, entrepreneuriat, technologie, culture urbaine et sports mécaniques.",
};

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20m%27inscrire%20aux%20pr%C3%A9-s%C3%A9lections%20officielles%202027.";

const disciplines = [
  {
    title: "Danse",
    description:
      "Pour les danseurs, crews et performers capables de transmettre une énergie forte sur scène.",
    icon: Music,
  },
  {
    title: "Musique",
    description:
      "Pour les chanteurs, rappeurs, musiciens, beatmakers et talents vocaux émergents.",
    icon: Mic2,
  },
  {
    title: "Mode",
    description:
      "Pour les stylistes, mannequins, créateurs et passionnés de fashion design.",
    icon: Shirt,
  },
  {
    title: "Art",
    description:
      "Pour les artistes visuels, peintres, illustrateurs, photographes et créateurs d’univers.",
    icon: Brush,
  },
  {
    title: "Entrepreneuriat",
    description:
      "Pour les jeunes porteurs de projets, entrepreneurs, leaders et bâtisseurs d’idées.",
    icon: Building2,
  },
  {
    title: "Technologie",
    description:
      "Pour les développeurs, créateurs digitaux, innovateurs et passionnés de tech.",
    icon: Cpu,
  },
  {
    title: "Culture urbaine",
    description:
      "Pour les talents issus du lifestyle, de la scène urbaine, du digital et des mouvements créatifs.",
    icon: Users,
  },
  {
    title: "Sports mécaniques",
    description:
      "Pour les passionnés de moteurs, show mécaniques, culture automobile et performance.",
    icon: Car,
  },
];

const steps = [
  {
    title: "Choisir sa discipline",
    description:
      "Le participant choisit la catégorie qui correspond le mieux à son talent ou à son projet.",
  },
  {
    title: "Remplir le formulaire",
    description:
      "La candidature est enregistrée dans la base officielle des pré-sélections Festival Talent.",
  },
  {
    title: "Passer la sélection",
    description:
      "Les profils retenus seront contactés pour la suite du processus de pré-sélection.",
  },
];

export default function PreselectionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_34%),linear-gradient(to_bottom,#000,rgba(12,10,3,0.96),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/fr"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white/70 transition hover:border-yellow-400/40 hover:text-yellow-300"
          >
            <ArrowLeft size={16} />
            Retour accueil
          </Link>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                <BadgeCheck size={17} />
                Inscriptions aux pré-sélections
              </div>

              <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Pré-
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  sélections
                </span>
              </h1>

              <p className="mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
                Festival Talent 2027 lance ses pré-sélections officielles pour
                détecter, accompagner et valoriser les jeunes talents dans
                plusieurs disciplines : danse, musique, mode, art,
                entrepreneuriat, technologie, culture urbaine et sports
                mécaniques.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#formulaire-preselections"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
                >
                  Remplir le formulaire
                  <ArrowRight size={17} />
                </a>

                <Link
                  href="/programme"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  Voir le programme
                </Link>
              </div>
            </div>

            <div className="rounded-[3rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                <Sparkles size={30} />
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                Paris & Rome 2027
              </p>

              <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Une passerelle pour révéler les talents
              </h2>

              <p className="mt-6 text-base leading-8 text-white/65">
                Les pré-sélections permettent d&apos;identifier les profils les
                plus prometteurs avant les grandes étapes internationales du
                Festival Talent 2027.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-3xl font-black text-yellow-300">08</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Disciplines
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-3xl font-black text-yellow-300">2027</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Objectif Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Gem size={16} />
              Catégories officielles
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Disciplines des
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                pré-sélections
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Chaque discipline représente un espace d&apos;expression, de
              compétition, de créativité et de mise en lumière pour les jeunes
              talents.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => {
              const Icon = discipline.icon;

              return (
                <article
                  key={discipline.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition duration-300 group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase text-white">
                    {discipline.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {discipline.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="formulaire-preselections"
        className="relative px-6 py-20 sm:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
              Formulaire officiel
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase text-white sm:text-5xl">
              Candidature pré-sélections
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Remplis le formulaire pour intégrer la base officielle des talents
              candidats au Festival Talent 2027.
            </p>
          </div>

          <PreselectionForm />
        </div>
      </section>

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-black text-black">
                  {index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 text-center backdrop-blur-xl sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
              Assistance
            </p>

            <h2 className="mt-5 text-3xl font-black uppercase text-white sm:text-4xl">
              Besoin d&apos;aide pour ta candidature ?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Si tu rencontres un problème avec le formulaire, tu peux contacter
              directement l&apos;équipe Festival Talent via WhatsApp.
            </p>

            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
            >
              Contacter sur WhatsApp
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}