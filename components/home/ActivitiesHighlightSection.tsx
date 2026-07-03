import Link from "next/link";
import {
  ArrowRight,
  Brush,
  Car,
  Dumbbell,
  Mic2,
  Palette,
  Shirt,
  Sparkles,
  Trophy,
  Waves,
} from "lucide-react";

const activities = [
  {
    title: "Battle All Style",
    detail: "Zones, solos, groupes et finale nationale.",
    icon: Trophy,
  },
  {
    title: "Peintres / Designer",
    detail: "Mise en lumière, ateliers et rencontres.",
    icon: Palette,
  },
  {
    title: "Jet Ski",
    detail: "Animations nautiques autour de Saly.",
    icon: Waves,
  },
  {
    title: "Karting",
    detail: "Courses, exposition et village partenaires.",
    icon: Car,
  },
  {
    title: "Fashion Week",
    detail: "Castings, ateliers design et défilés.",
    icon: Shirt,
  },
  {
    title: "Musique",
    detail: "Castings, bootcamps et concerts de sélection.",
    icon: Mic2,
  },
  {
    title: "Influenceurs",
    detail: "Formation, contenus et showcases influenceurs.",
    icon: Sparkles,
  },
  {
    title: "Lutte sénégalaise",
    detail: "Tournois régionaux, finales et champions.",
    icon: Dumbbell,
  },
];

export default function ActivitiesHighlightSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
              <Brush size={16} />
              Activités phares
            </div>

            <h2 className="font-display mt-8 text-4xl uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Plusieurs secteurs
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                un même festival
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent 2027 ne se limite pas à une seule discipline. Le
              projet réunit plusieurs secteurs : danse, musique, mode, art,
              influence, sports mécaniques, nautisme, entrepreneuriat, culture
              urbaine et innovation.
            </p>

            <Link
              href="/activites"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-105"
            >
              Découvrir toutes les activités
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <article
                key={activity.title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition group-hover:scale-110">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-xl font-black uppercase text-white">
                  {activity.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {activity.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
