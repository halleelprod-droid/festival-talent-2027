import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Mic2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const upcomingSlots = [
  "Musique",
  "Danse",
  "Mode",
  "Culture urbaine",
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
            Artistes
          </div>

          <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Artiste
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              confirmé
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent communique uniquement les confirmations officielles.
            Pour le moment, Samba Peuzzi est l’artiste confirmé. Les prochaines
            annonces seront publiées progressivement.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
          <article className="relative overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.07] shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-black/60" />

            <div className="grid min-h-[560px] gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
                <Image
                  src="/images/samba.jpg"
                  alt="Samba Peuzzi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/55 px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-yellow-300 backdrop-blur-xl">
                  <BadgeCheck size={15} />
                  Confirmé
                </div>
              </div>

              <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="inline-flex w-fit items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                  <Star size={15} />
                  Line-up officiel
                </div>

                <h3 className="mt-8 text-5xl font-black uppercase leading-none text-white sm:text-6xl lg:text-7xl">
                  Samba
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                    Peuzzi
                  </span>
                </h3>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                  Artiste confirmé pour Festival Talent 2027. Une présence forte
                  pour accompagner l’énergie du festival, les pré-sélections et
                  la célébration des talents.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5">
                    <Mic2 className="text-yellow-300" size={25} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-white/40">
                      Statut
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      Confirmé
                    </p>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5">
                    <CalendarDays className="text-yellow-300" size={25} />
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-white/40">
                      Édition
                    </p>
                    <p className="mt-1 text-lg font-black uppercase text-white">
                      2027
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/artists"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition hover:scale-105"
                  >
                    Voir l’artiste
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/preselections"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
                  >
                    Pré-sélections
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
              <Sparkles size={30} />
            </div>

            <h3 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Prochaines annonces bientôt disponibles
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Les autres artistes, invités et talents seront annoncés uniquement
              après confirmation officielle. Le site sera mis à jour au fur et à
              mesure des validations.
            </p>

            <div className="mt-8 grid gap-4">
              {upcomingSlots.map((slot) => (
                <div
                  key={slot}
                  className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/35 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Users className="text-yellow-300" size={20} />
                    <span className="text-sm font-black uppercase tracking-[0.18em] text-white/75">
                      {slot}
                    </span>
                  </div>

                  <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                    Bientôt
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                Note officielle
              </p>

              <p className="mt-4 text-sm leading-7 text-white/65">
                Aucun autre artiste ne doit être présenté comme confirmé tant
                que l’annonce officielle n’a pas été validée par l’organisation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}