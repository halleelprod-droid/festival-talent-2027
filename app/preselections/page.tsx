import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Crown,
  Globe2,
  Handshake,
  MapPin,
  Mic2,
  Plane,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import PreselectionForm from "@/components/preselections/PreselectionForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pré-sélections | Festival Talent 2027",
  description:
    "Inscrivez-vous aux pré-sélections Festival Talent 2027 : Battle All Style, musique, mode, art, entrepreneuriat, technologie, culture urbaine et sports mécaniques.",
  path: "/preselections",
});

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20les%20pr%C3%A9-s%C3%A9lections%20et%20les%20Battles%20de%20Danse.";

const disciplines = [
  "Danse",
  "Musique",
  "Mode",
  "Art",
  "Entrepreneuriat",
  "Technologie",
  "Culture urbaine",
  "Sports mécaniques",
];

const upcomingPreselections = [
  "Peinture / Designer",
  "Influenceurs",
  "Fashion",
  "Musique",
  "Théâtre",
  "Sports mécaniques",
  "Lutte",
  "Art",
  "Technologie",
  "Entrepreneuriat",
];

const battleDetails = [
  {
    icon: Wallet,
    title: "2.000 FCFA",
    description: "Frais d’inscription pour le Battle de Danse par zones.",
  },
  {
    icon: Trophy,
    title: "500.000 FCFA",
    description: "Cagnotte prévue pour récompenser les meilleurs talents.",
  },
  {
    icon: Plane,
    title: "Voyage en Italie",
    description: "Le gagnant ou le groupe gagnant remporte son voyage.",
  },
  {
    icon: Users,
    title: "Solo / Groupe",
    description: "Les participations sont ouvertes aux solos et groupes.",
  },
];

const zones = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Diourbel",
  "Kaolack",
  "Ziguinchor",
  "Tambacounda",
  "Kolda",
  "Matam",
  "Fatick",
  "Kédougou",
  "Louga",
];

export default function PreselectionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Sparkles size={17} />
              Pré-sélections officielles
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Rejoins
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                l’aventure
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Les pré-sélections Festival Talent 2027 sont ouvertes pour les
              jeunes talents en danse, musique, mode, art, entrepreneuriat,
              technologie, culture urbaine et sports mécaniques.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#formulaire-preselections"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Remplir le formulaire
                <ArrowRight size={17} />
              </a>

              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Infos WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <div
                key={discipline}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <BadgeCheck className="mx-auto text-yellow-300" size={28} />
                <p className="mt-4 text-lg font-black uppercase text-white">
                  {discipline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[3rem] border border-red-500/25 bg-red-500/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-black/40 text-red-300">
                <Handshake size={30} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-red-300">
                  Organisation du Battle
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Agence Diassnor coordonne le pole Danse
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                  Le Battle Dance du Festival Talent est organise en partenariat
                  avec l&apos;Agence Diassnor, structure specialisee dans le
                  management artistique et l&apos;evenementiel. Son expertise garantit
                  une organisation professionnelle des preselections, des battles
                  et de l&apos;accompagnement des danseurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-red-300">
                  <Crown size={16} />
                  Focus Battle All Style
                </div>

                <h2 className="mt-8 text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
                  Battle All Style
                  <span className="block bg-gradient-to-r from-red-400 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    par zones
                  </span>
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                  Dans le cadre des pré-sélections, Festival Talent lance les
                  Battles de Danse par zones. Les danseurs peuvent participer en
                  solo ou en groupe, tous styles confondus.
                </p>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                    Important
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Les frais d’inscription de 2.000 FCFA concernent le Battle
                    All Style par personne ou par groupe. La billetterie
                    officielle du Festival Talent 2027 sera annoncée
                    séparément.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#formulaire-preselections"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition hover:scale-105"
                  >
                    S’inscrire maintenant
                    <ArrowRight size={16} />
                  </a>

                  <Link
                    href="/programme"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                  >
                    Voir le programme
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {battleDetails.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div
                      key={detail.title}
                      className="rounded-[1.8rem] border border-white/10 bg-black/35 p-6 shadow-xl shadow-black/20 backdrop-blur-xl"
                    >
                      <Icon className="text-yellow-300" size={30} />

                      <h3 className="mt-4 text-2xl font-black uppercase text-white">
                        {detail.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/55">
                        {detail.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <MapPin size={16} />
              Zones concernées
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Toutes les
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                zones
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Les Battles de Danse par zones permettent aux talents de
              différentes localités de participer aux pré-sélections.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {zones.map((zone, index) => (
              <div
                key={zone}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/55">
                      Zone {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="mt-1 text-lg font-black uppercase text-white">
                      {zone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                  D’autres pré-sélections arrivent
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                  Plusieurs appels à talents
                </h2>

                <p className="mt-6 text-base leading-8 text-white/65">
                  Les Battles All Style par zones ouvrent la dynamique des
                  pré-sélections Festival Talent 2027. D’autres appels à talents
                  seront progressivement annoncés dans les secteurs
                  peinture/design, influence, mode, musique, théâtre, sports
                  mécaniques, entrepreneuriat, technologie et culture urbaine.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {upcomingPreselections.map((discipline) => (
                  <div
                    key={discipline}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-5 py-4"
                  >
                    <BadgeCheck className="shrink-0 text-yellow-300" size={19} />
                    <span className="text-sm font-black uppercase tracking-[0.16em] text-white/80">
                      {discipline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="formulaire-preselections"
        className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-black/40 text-yellow-300">
              <Mic2 size={30} />
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
              Formulaire officiel
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Dépose ta candidature
            </h2>

            <p className="mt-6 text-base leading-8 text-white/65">
              Remplis le formulaire avec tes informations. L’équipe Festival
              Talent pourra ensuite te contacter pour la suite des
              pré-sélections.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-3 text-sm leading-6 text-white/70">
                <BadgeCheck
                  size={18}
                  className="mt-1 shrink-0 text-yellow-300"
                />
                <span>Les champs nom, téléphone, ville et discipline sont obligatoires.</span>
              </div>

              <div className="flex gap-3 text-sm leading-6 text-white/70">
                <BadgeCheck
                  size={18}
                  className="mt-1 shrink-0 text-yellow-300"
                />
                <span>Ajoute un lien portfolio, vidéo ou réseau social si disponible.</span>
              </div>

              <div className="flex gap-3 text-sm leading-6 text-white/70">
                <BadgeCheck
                  size={18}
                  className="mt-1 shrink-0 text-yellow-300"
                />
                <span>Après l’envoi, tes informations sont enregistrées dans la base officielle.</span>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                Destination
              </p>

              <div className="mt-4 flex items-center gap-3 text-2xl font-black uppercase text-white">
                <Globe2 className="text-yellow-300" size={27} />
                Paris & Rome
              </div>

              <p className="mt-3 text-sm leading-7 text-white/55">
                Festival Talent 2027 s’inscrit dans une dynamique
                internationale entre Paris et Rome, avec des pré-sélections
                organisées en amont.
              </p>
            </div>
          </aside>

          <PreselectionForm />
        </div>
      </section>
    </main>
  );
}
