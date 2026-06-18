import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Mic2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Artiste confirmé | Festival Talent 2027",
  description:
    "Samba Peuzzi est le premier artiste officiellement confirmé pour Festival Talent 2027.",
};

const confirmedArtist = {
  name: "Samba Peuzzi",
  role: "Artiste confirmé",
  image: "/images/samba.jpg",
  description:
    "Samba Peuzzi est le premier artiste officiellement confirmé pour Festival Talent 2027. Sa présence marque une étape forte dans la construction de la programmation artistique du festival.",
  tags: ["Musique", "Culture urbaine", "Performance live"],
};

export default function ArtistsPage() {
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

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                <BadgeCheck size={17} />
                Artiste confirmé
              </div>

              <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Samba
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Peuzzi
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                {confirmedArtist.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {confirmedArtist.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <Mic2 className="text-yellow-300" size={24} />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-white/45">
                    Statut
                  </p>
                  <p className="mt-2 text-lg font-black uppercase text-white">
                    Confirmé
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <MapPin className="text-yellow-300" size={24} />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-white/45">
                    Tournée
                  </p>
                  <p className="mt-2 text-lg font-black uppercase text-white">
                    Paris & Rome
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <CalendarDays className="text-yellow-300" size={24} />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-white/45">
                    Année
                  </p>
                  <p className="mt-2 text-lg font-black uppercase text-white">
                    2027
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-yellow-400/10 blur-3xl" />

              <div className="group relative overflow-hidden rounded-[3rem] border border-yellow-400/30 bg-white/[0.04] p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="relative h-[520px] overflow-hidden rounded-[2.4rem] bg-zinc-950 sm:h-[620px]">
                  <Image
                    src={confirmedArtist.image}
                    alt={confirmedArtist.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300 backdrop-blur-md">
                      <Sparkles size={15} />
                      Premier artiste confirmé
                    </div>

                    <h2 className="mt-5 text-4xl font-black uppercase text-white sm:text-5xl">
                      {confirmedArtist.name}
                    </h2>

                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-white/55">
                      Festival Talent 2027
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 text-center backdrop-blur-xl sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
              Programmation officielle
            </p>

            <h2 className="mt-5 text-3xl font-black uppercase text-white sm:text-4xl">
              Les prochaines annonces arrivent bientôt
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              Festival Talent 2027 dévoilera progressivement les autres artistes
              et invités officiels. Pour le moment, Samba Peuzzi est le seul
              artiste confirmé publiquement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}