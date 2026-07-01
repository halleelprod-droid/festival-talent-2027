import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  Mic2,
  Music,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const confirmedArtists = [
  {
    name: "Samba Peuzzi",
    image: "/images/samba.jpg",
    role: "Artiste confirmé",
    description:
      "Samba Peuzzi est officiellement confirmé pour Festival Talent 2027. Sa présence accompagne l’énergie du projet, les pré-sélections, les Battles de Danse par zones et la célébration des jeunes talents.",
  },
  {
    name: "Morijah",
    image: "/images/artists/morijah.jpg",
    role: "Artiste confirmée",
    description:
      "Morijah rejoint officiellement Festival Talent 2027 avec une présence forte autour de la musique, de l’inspiration et de la jeunesse.",
  },
  {
    name: "Cysoul",
    image: "/images/artists/cysoul.jpg",
    role: "Artiste confirmé",
    description:
      "Cysoul rejoint officiellement Festival Talent 2027 et apporte une dimension musicale internationale au projet.",
  },
];

const upcomingArtists = [
  {
    category: "Musique",
    description: "De nouveaux artistes pourront être annoncés prochainement.",
  },
  {
    category: "Danse",
    description: "Des talents et invités liés aux battles seront communiqués.",
  },
  {
    category: "Mode",
    description: "Les créateurs et invités mode seront dévoilés progressivement.",
  },
  {
    category: "Culture urbaine",
    description: "Les prochaines annonces seront validées officiellement.",
  },
];

export default function ArtistsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Mic2 size={17} />
              Line-up officiel
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Artistes
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                confirmés
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent 2027 confirme officiellement Samba Peuzzi,
              Morijah et Cysoul. Les prochaines confirmations seront publiées
              progressivement après validation de l’organisation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/programme"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Voir le programme
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/preselections"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Pré-sélections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-3">
          {confirmedArtists.map((artist) => (
            <article
              key={artist.name}
              className="group relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50"
            >
              <div className="relative h-[520px] overflow-hidden">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  priority={artist.name === "Samba Peuzzi"}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-yellow-300 backdrop-blur-xl">
                  <BadgeCheck size={15} />
                  Confirmé
                </div>

                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                    {artist.role}
                  </p>

                  <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                    {artist.name}
                  </h2>
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm leading-7 text-white/60">
                  {artist.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
                    <CalendarDays className="text-yellow-300" size={23} />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                      Édition
                    </p>
                    <p className="mt-1 text-sm font-black uppercase text-white">
                      2027
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
                    <Globe2 className="text-yellow-300" size={23} />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                      Projet
                    </p>
                    <p className="mt-1 text-sm font-black uppercase text-white">
                      Paris & Rome
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
              <Sparkles size={16} />
              Prochaines annonces
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Bientôt
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                annoncés
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
              D’autres artistes, invités et talents pourront être ajoutés après
              confirmation officielle par l’organisation.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingArtists.map((artist) => (
              <article
                key={artist.category}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Music size={26} />
                </div>

                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  {artist.category}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {artist.description}
                </p>

                <div className="mt-6 inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                  Bientôt
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
            <Star size={38} />
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Rejoins l’aventure
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Les talents de demain peuvent aussi faire partie de l’histoire
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Les pré-sélections sont ouvertes pour la danse, la musique, la mode,
            l’art, l’entrepreneuriat, la technologie, la culture urbaine et les
            sports mécaniques.
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
              Voir le programme
              <Users size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
