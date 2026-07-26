import Image from "next/image";
import { BadgeCheck, Camera, Sparkles, Star } from "lucide-react";

import { finalConcertGuests, type Guest } from "@/data/guests";

function GuestCard({ guest }: { guest: Guest }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[3rem] border bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
        guest.featured
          ? "border-amber-300/60 ring-1 ring-amber-300/30 hover:border-amber-300/80"
          : "border-white/10 hover:border-amber-400/40"
      }`}
    >
      <div className="relative h-[440px] overflow-hidden sm:h-[480px]">
        <Image
          src={guest.image}
          alt={guest.name}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
          style={{ objectPosition: guest.objectPosition ?? "center center" }}
        />

        {/* Dégradé sombre en bas pour la lisibilité des textes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        {/* Badge statut (doré pour la tête d'affiche invitée, orange pour les guests) */}
        <div
          className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl ${
            guest.featured
              ? "border-amber-300/50 bg-amber-400/20 text-amber-200"
              : "border-orange-400/40 bg-orange-500/15 text-orange-200"
          }`}
        >
          {guest.featured ? <Star size={14} /> : <BadgeCheck size={14} />}
          {guest.status}
        </div>

        {/* Mention événement */}
        <div className="absolute right-5 top-5 inline-flex items-center rounded-full border border-white/20 bg-black/55 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl">
          {guest.event}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          {guest.category && (
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-300">
              {guest.category}
            </p>
          )}

          <h3 className="mt-2 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            {guest.name}
          </h3>

          {guest.fullName && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {guest.fullName}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-7">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
            Rôle
          </p>
          <p className="mt-1 text-sm font-black uppercase text-white">
            {guest.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
              guest.featured
                ? "border-amber-300/40 bg-amber-400/10 text-amber-200"
                : "border-orange-400/30 bg-orange-500/10 text-orange-200"
            }`}
          >
            {guest.status}
          </span>

          <span className="inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
            {guest.event}
          </span>
        </div>

        {guest.instagram && (
          <a
            href={guest.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-amber-200 transition hover:border-amber-300/60 hover:bg-amber-400/20 hover:text-amber-100"
          >
            <Camera size={16} />
            {guest.instagramHandle ?? "Instagram"}
          </a>
        )}
      </div>
    </article>
  );
}

export default function FinalConcertGuests() {
  return (
    <section
      aria-labelledby="final-concert-guests-title"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.12),transparent_38%),linear-gradient(to_bottom,#000,rgba(14,8,2,0.98),#000)]" />
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-amber-300">
            <Sparkles size={16} />
            Concert final
          </div>

          <h2
            id="final-concert-guests-title"
            className="font-display mt-8 text-4xl uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            Guests du
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              concert final
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Des invités spéciaux rejoignent la scène du concert final aux côtés
            des artistes confirmés, pour une clôture placée sous le signe de la
            musique et de la danse.
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {finalConcertGuests.map((guest) => (
            <GuestCard key={guest.name} guest={guest} />
          ))}
        </div>
      </div>
    </section>
  );
}
