import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Crown,
  MapPin,
  Plane,
  Sparkles,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20m'inscrire%20ou%20avoir%20plus%20d'informations%20sur%20les%20Battles%20de%20Danse%20par%20zones.";

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

const battleInfos = [
  {
    icon: Trophy,
    title: "500.000 FCFA",
    label: "Cagnotte à gagner",
  },
  {
    icon: Plane,
    title: "Italie",
    label: "Voyage pour le gagnant",
  },
  {
    icon: Wallet,
    title: "2.000 FCFA",
    label: "Par personne ou groupe",
  },
  {
    icon: Users,
    title: "Solo / Groupe",
    label: "Toutes catégories",
  },
];

const requirements = [
  "Solos et groupes acceptés",
  "Tous les styles de danse sont ouverts",
  "Pré-sélections organisées par zones",
  "Sélection finale autour du Monument de la Renaissance",
  "Début prévu en septembre 2026",
  "Inscription & infos : WhatsApp 781 948 606",
];

const upcomingDisciplines = [
  "Danse",
  "Musique",
  "Mode",
  "Art",
  "Entrepreneuriat",
  "Technologie",
  "Culture urbaine",
  "Sports mécaniques",
];

export default function BattleDanceSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.13),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.13),transparent_35%)]" />
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-red-300">
              <Sparkles size={16} />
              Pré-sélections officielles
            </div>

            <h2 className="font-display mt-8 text-4xl uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Battle All Style
              <span className="block bg-gradient-to-r from-red-400 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                par zones
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent lance le Battle All Style par zones pour révéler
              les meilleurs danseurs et groupes. Une opportunité unique de
              montrer ton talent, représenter ta zone et rejoindre l’aventure
              Festival Talent 2027.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {battleInfos.map((info) => {
                const Icon = info.icon;

                return (
                  <div
                    key={info.title}
                    className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                  >
                    <Icon className="text-yellow-300" size={30} />

                    <h3 className="mt-4 text-2xl font-black uppercase text-white">
                      {info.title}
                    </h3>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-white/55">
                      {info.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/preselections"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black shadow-2xl shadow-yellow-900/30 transition hover:scale-105"
              >
                Remplir le formulaire
                <ArrowRight size={17} />
              </Link>

              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Infos WhatsApp
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
                <Crown size={38} />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                À retenir
              </p>

              <h3 className="mt-4 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                Ton talent peut t’emmener en Italie
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Les gagnants seront valorisés dans le cadre du Festival Talent
                2027, avec une exposition médiatique, des opportunités et un
                accès à une aventure internationale.
              </p>

              <ul className="mt-7 space-y-4">
                {requirements.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-white/70"
                  >
                    <BadgeCheck
                      size={18}
                      className="mt-1 shrink-0 text-yellow-300"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                  Départ officiel
                </p>

                <p className="mt-3 text-3xl font-black uppercase text-white">
                  Septembre 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                D’autres pré-sélections arrivent
              </p>

              <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                La danse ouvre la dynamique
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Les Battles de Danse par zones marquent une premiere phase des
                pre-selections Festival Talent 2027. D&apos;autres pre-selections
                seront progressivement annoncees dans les autres secteurs :
                musique, mode, art, entrepreneuriat, technologie, culture
                urbaine, sports mecaniques, peinture/design, influence,
                theatre et lutte.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {upcomingDisciplines.map((discipline) => (
                <span
                  key={discipline}
                  className="rounded-full border border-white/10 bg-black/35 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/75"
                >
                  {discipline}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
              <MapPin size={16} />
              Toutes zones
            </div>

            <h3 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Les zones concernées
            </h3>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          <div className="mt-12 flex justify-center">
            <Link
              href="/programme"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
            >
              Voir le programme complet
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
