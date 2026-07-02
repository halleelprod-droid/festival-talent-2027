import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Crown,
  Flag,
  Globe2,
  MapPin,
  Mic2,
  Plane,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Programme | Festival Talent 2027",
  description:
    "Découvrez le programme officiel Festival Talent 2027 : pré-sélections, Battle All Style, peinture/design, influenceurs, fashion week, musique, sports, Italie et concert final au Casino de Paris.",
  path: "/programme",
});

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20les%20Battles%20de%20Danse%20par%20zones.";

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

const timeline = [
  {
    date: "01 au 30 septembre 2026",
    title: "Pré-sélections Danse",
    description:
      "Campagnes d’information, inscriptions, présélections dans 6 zones de Dakar, sélection des danseurs, préparation et coaching.",
    icon: CalendarDays,
  },
  {
    date: "01 au 31 octobre 2026",
    title: "Sélections Peinture",
    description:
      "Appel à candidatures national, ateliers et masterclass, sélection de peintres/designers.",
    icon: Star,
  },
  {
    date: "01 au 30 novembre 2026",
    title: "Showcases Influenceurs",
    description:
      "Castings, formations, création de contenu et sélection d’influenceurs.",
    icon: Users,
  },
  {
    date: "01 au 31 décembre 2026",
    title: "Fashion Week",
    description:
      "Appel aux stylistes et créateurs, ateliers design, défilés régionaux et sélection de créateurs.",
    icon: Crown,
  },
  {
    date: "01 au 31 janvier 2027",
    title: "Sélections Musicales",
    description:
      "Castings régionaux, bootcamps, concerts de présélection et sélection d’artistes.",
    icon: Mic2,
  },
  {
    date: "01 au 15 février 2027",
    title: "Art du théâtre & Peintres",
    description:
      "Castings, ateliers théâtre, création et exposition.",
    icon: Flag,
  },
  {
    date: "01 au 28 février 2027",
    title: "Tournée nationale avec Samba Peuzzi",
    description:
      "Concerts et animations dans les régions, promotion des talents sélectionnés et rencontres avec les communautés.",
    icon: Globe2,
  },
  {
    date: "01 au 15 mars 2027",
    title: "Courses motos, voitures, avions, hélicoptères",
    description:
      "Compétitions régionales, sélection des meilleurs pilotes et épreuves finales.",
    icon: Trophy,
  },
  {
    date: "16 au 20 mars 2027",
    title: "Luttes sénégalaises",
    description:
      "Tournois régionaux, demi-finales, finales et valorisation des champions.",
    icon: Users,
  },
  {
    date: "21 au 31 mars 2027",
    title: "Festival Talent Italie",
    description:
      "Voyage et installation de la délégation, participation au Festival Talent en Italie, compétitions internationales, échanges culturels et networking.",
    icon: Plane,
  },
  {
    date: "15 mai 2027",
    title: "Concert final au Casino de Paris",
    description:
      "Prestation de Samba Peuzzi et autres artistes, célébration des talents du Sénégal et clôture officielle.",
    icon: Sparkles,
  },
];

const battleAdvantages = [
  {
    icon: Trophy,
    title: "500.000 FCFA à gagner",
    description:
      "Une cagnotte exceptionnelle est prévue pour récompenser les meilleurs talents.",
  },
  {
    icon: Plane,
    title: "Voyage en Italie",
    description:
      "Le gagnant ou le groupe gagnant remporte son voyage en Italie.",
  },
  {
    icon: Globe2,
    title: "Exposition médiatique",
    description:
      "Les participants bénéficient d’une visibilité sur les réseaux sociaux et les supports du Festival Talent.",
  },
  {
    icon: Users,
    title: "Opportunités professionnelles",
    description:
      "Les battles ouvrent la porte à des collaborations, rencontres et opportunités artistiques.",
  },
];

export default function ProgrammePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <CalendarDays size={17} />
              Programme officiel
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Festival Talent
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                2027
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Le programme de Festival Talent 2027 se construit autour des
              pré-sélections, des Battles de Danse par zones et d’une ambition
              internationale entre Paris et Rome.
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
          <div className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-red-300">
                  <Sparkles size={16} />
                  Battle All Style par zones
                </div>

                <h2 className="mt-8 text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
                  Révélons les talents,
                  <span className="block bg-gradient-to-r from-red-400 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    construisons l’avenir
                  </span>
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                  Le Battle All Style par zones ouvre la route vers Festival
                  Talent 2027. Les participants peuvent concourir en solo ou en
                  groupe, tous styles confondus, avec une grande finale autour
                  du Monument de la Renaissance.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.7rem] border border-white/10 bg-black/35 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                      Catégories
                    </p>
                    <p className="mt-3 text-lg font-black uppercase text-white">
                      Solos & Groupes
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-white/10 bg-black/35 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                      Styles
                    </p>
                    <p className="mt-3 text-lg font-black uppercase text-white">
                      Tous styles
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-white/10 bg-black/35 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                      Frais d’inscription
                    </p>
                    <p className="mt-3 text-lg font-black uppercase text-white">
                      2.000 FCFA
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-white/10 bg-black/35 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                      Début
                    </p>
                    <p className="mt-3 text-lg font-black uppercase text-white">
                      Septembre 2026
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition hover:scale-105"
                  >
                    S’inscrire par WhatsApp
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/tickets"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                  >
                    Voir le ticket
                  </Link>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                <div className="grid gap-5">
                  <div className="rounded-[2rem] border border-yellow-400/25 bg-yellow-400/10 p-6 text-center">
                    <Trophy className="mx-auto text-yellow-300" size={44} />
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
                      Cagnotte exceptionnelle
                    </p>
                    <p className="mt-3 text-5xl font-black uppercase text-white sm:text-6xl">
                      500.000
                    </p>
                    <p className="mt-2 text-xl font-black uppercase text-yellow-300">
                      FCFA à gagner
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-red-500/25 bg-red-500/10 p-6 text-center">
                    <Plane className="mx-auto text-red-300" size={42} />
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-red-300">
                      Prix spécial
                    </p>
                    <p className="mt-3 text-3xl font-black uppercase text-white">
                      Voyage en Italie
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      Le gagnant ou le groupe gagnant remporte son voyage.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
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
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                  Suite des pré-sélections
                </p>

                <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Après les Battles de Danse
                </h2>

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
                {disciplines
                  .filter((discipline) => discipline !== "Danse")
                  .map((discipline) => (
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
              Battles
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                par zones
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Les sélections couvrent plusieurs zones afin de donner une chance
              aux talents de différentes régions.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {zones.map((zone, index) => (
              <div
                key={zone}
                className="group rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
                      Zone {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-lg font-black uppercase text-white">
                      {zone}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Star size={16} />
              Opportunités
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Pourquoi
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                participer ?
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {battleAdvantages.map((advantage) => {
              const Icon = advantage.icon;

              return (
                <article
                  key={advantage.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-black uppercase text-white">
                    {advantage.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {advantage.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Flag size={16} />
              Timeline
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Les grandes
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                étapes
              </span>
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl space-y-6">
            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/40 sm:grid-cols-[auto_1fr] sm:p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                      <Icon size={26} />
                    </div>

                    <div className="sm:hidden">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                        Étape {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-2xl font-black uppercase text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                        Étape {String(index + 1).padStart(2, "0")} — {item.date}
                      </p>
                      <h3 className="mt-2 text-2xl font-black uppercase text-white">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-6 text-center backdrop-blur-xl">
            <p className="text-sm font-semibold leading-7 text-white/75">
              Les dates peuvent être ajustées selon les confirmations
              logistiques et partenaires.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Mic2 size={16} />
              Disciplines
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Tous les
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                talents
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Festival Talent valorise plusieurs disciplines pour révéler une
              nouvelle génération de créateurs, artistes, entrepreneurs et
              innovateurs.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <div
                key={discipline}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <BadgeCheck className="mx-auto text-yellow-300" size={28} />
                <h3 className="mt-4 text-lg font-black uppercase text-white">
                  {discipline}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
            <Crown size={38} />
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Festival Talent 2027
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Une scène. Un rêve. Une destination. Ton moment.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Les inscriptions aux pré-sélections sont ouvertes. Rejoins
            l’aventure et tente de représenter ton talent sur la grande scène du
            Festival Talent 2027.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/preselections"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
            >
              Remplir le formulaire
              <ArrowRight size={17} />
            </Link>

            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              <Wallet size={16} />
              Infos inscription
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
