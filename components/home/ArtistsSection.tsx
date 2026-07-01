import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  Mic2,
} from "lucide-react";

const artists = [
  {
    name: "Samba Peuzzi",
    image: "/images/samba.jpg",
    role: "Artiste confirmé",
    description:
      "Artiste confirmé pour Festival Talent 2027. Sa présence accompagne l’énergie du festival, les pré-sélections et la célébration des talents.",
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

export default function ArtistsSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.13),transparent_35%),linear-gradient(to_bottom,#000,rgba(12,9,2,0.98),#000)]" />
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
            <Mic2 size={16} />
            Artistes confirmés
          </div>

          <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Line-up
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              officiel
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 confirme officiellement Samba Peuzzi, Morijah
            et Cysoul. D’autres annonces pourront être publiées progressivement
            après validation de l’organisation.
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {artists.map((artist, index) => (
            <article
              key={artist.name}
              className={`group relative overflow-hidden rounded-[3rem] border bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
                index === 0
                  ? "border-yellow-400/30"
                  : "border-white/10 hover:border-yellow-400/40"
              }`}
            >
              <div className="relative h-[430px] overflow-hidden">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300 backdrop-blur-xl">
                  <BadgeCheck size={14} />
                  Confirmé
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                    {artist.role}
                  </p>

                  <h3 className="mt-3 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                    {artist.name}
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm leading-7 text-white/60">
                  {artist.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.3rem] border border-white/10 bg-black/35 p-4">
                    <CalendarDays className="text-yellow-300" size={22} />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      Édition
                    </p>
                    <p className="mt-1 text-sm font-black uppercase text-white">
                      2027
                    </p>
                  </div>

                  <div className="rounded-[1.3rem] border border-white/10 bg-black/35 p-4">
                    <Globe2 className="text-yellow-300" size={22} />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
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

        <div className="mt-14 flex justify-center">
          <Link
            href="/artists"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
          >
            Voir tous les artistes
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
