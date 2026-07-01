import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  Crown,
  Dumbbell,
  Flag,
  MapPin,
  Mic2,
  Palette,
  Plane,
  Shirt,
  Sparkles,
  Theater,
  Trophy,
  Users,
  Waves,
} from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Activités | Festival Talent 2027",
  description:
    "Découvrez les activités de Festival Talent 2027 : Battle All Style, peinture/design, jet ski, karting, fashion week, musique, influenceurs, lutte, théâtre et événements internationaux.",
  path: "/activites",
});

const activities = [
  {
    title: "Battle All Style",
    date: "À partir de septembre 2026",
    location: "Par zones",
    info:
      "Solos, groupes, tous styles, sélection finale autour du Monument de la Renaissance.",
    meta: ["Frais : 2.000 FCFA", "Cagnotte : 500.000 FCFA", "Prix : voyage en Italie"],
    icon: Trophy,
    accent: "from-red-500/20 to-yellow-400/10",
  },
  {
    title: "Peintres / Designer",
    date: "Octobre 2026",
    location: "Centre Culturel Douta Seck",
    info:
      "Mise en lumière, intégration dans le festival, opportunités et rencontres.",
    meta: ["Ateliers", "Masterclass", "Sélection créative"],
    icon: Palette,
    accent: "from-yellow-400/20 to-white/5",
  },
  {
    title: "Jet Ski",
    date: "Novembre 2026",
    location: "Plage de Saly, Sénégal",
    info:
      "Démonstrations, initiations, animations nautiques et village partenaires.",
    meta: ["Durée : 1 semaine stratégique", "Animations", "Nautisme"],
    icon: Waves,
    accent: "from-cyan-400/15 to-yellow-400/10",
  },
  {
    title: "Karting",
    date: "Mars 2027",
    location: "Saly, Sénégal",
    info:
      "Courses, exposition de karts, innovations, animations, stands et cadeaux.",
    meta: ["Entrée gratuite", "Exposition", "Sports mécaniques"],
    icon: Car,
    accent: "from-red-500/20 to-white/5",
  },
  {
    title: "Fashion Week",
    date: "Décembre 2026",
    location: "Sénégal",
    info:
      "Castings, ateliers design, défilés et sélection de créateurs.",
    meta: ["Mode", "Design", "Défilés"],
    icon: Shirt,
    accent: "from-pink-400/15 to-yellow-400/10",
  },
  {
    title: "Musique",
    date: "Janvier 2027",
    location: "Régions & scènes partenaires",
    info:
      "Castings régionaux, bootcamps, concerts de présélection et sélection d’artistes.",
    meta: ["Bootcamps", "Showcases", "Artistes"],
    icon: Mic2,
    accent: "from-yellow-400/20 to-red-500/10",
  },
  {
    title: "Influenceurs",
    date: "Novembre 2026",
    location: "Digital & terrain",
    info:
      "Formations, création de contenu, showcases et sélection d’influenceurs.",
    meta: ["Contenu", "Formation", "Influence"],
    icon: Users,
    accent: "from-white/10 to-yellow-400/10",
  },
  {
    title: "Lutte sénégalaise",
    date: "Mars 2027",
    location: "Sénégal",
    info:
      "Tournois régionaux, demi-finales, finales et valorisation des champions.",
    meta: ["Tournois", "Finales", "Champions"],
    icon: Dumbbell,
    accent: "from-red-500/20 to-yellow-400/10",
  },
  {
    title: "Théâtre & Peinture",
    date: "Février 2027",
    location: "Espaces culturels",
    info:
      "Castings, ateliers théâtre, création, exposition et sélection.",
    meta: ["Théâtre", "Exposition", "Création"],
    icon: Theater,
    accent: "from-yellow-400/20 to-white/5",
  },
  {
    title: "Italie",
    date: "Mars 2027",
    location: "Italie",
    info:
      "Voyage, installation de la délégation et participation au Festival Talent en Italie.",
    meta: ["Délégation", "Networking", "International"],
    icon: Plane,
    accent: "from-green-400/15 to-yellow-400/10",
  },
  {
    title: "Concert Final",
    date: "15 mai 2027",
    location: "Casino de Paris",
    info:
      "Concert final, célébration des talents et clôture officielle.",
    meta: ["Casino de Paris", "Clôture", "Célébration"],
    icon: Crown,
    accent: "from-yellow-400/25 to-red-500/10",
  },
];

export default function ActivitesPage() {
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
              Écosystème Festival Talent
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Activités
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                Festival Talent 2027
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent 2027 réunit plusieurs pôles d’expression, de
              compétition, de créativité et d’innovation pour révéler les
              talents du Sénégal et les connecter à des opportunités
              internationales.
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
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Voir le programme
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <article
                key={activity.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activity.accent} opacity-60 transition duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-black/45 text-yellow-300">
                    <Icon size={30} />
                  </div>

                  <p className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-yellow-300">
                    <MapPin size={15} />
                    {activity.location}
                  </p>

                  <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-white">
                    {activity.title}
                  </h2>

                  <p className="mt-3 text-sm font-black uppercase tracking-[0.2em] text-white/40">
                    {activity.date}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/65">
                    {activity.info}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {activity.meta.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/75"
                      >
                        <BadgeCheck size={13} className="text-yellow-300" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <Flag className="mx-auto text-yellow-300" size={38} />

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Plusieurs secteurs, plusieurs pré-sélections, plusieurs scènes
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Les détails, lieux précis et modalités seront confirmés
            progressivement via les canaux officiels de Festival Talent 2027.
          </p>
        </div>
      </section>
    </main>
  );
}
