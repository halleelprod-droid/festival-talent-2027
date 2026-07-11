import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Crown,
  Handshake,
  MapPin,
  Plane,
  Sparkles,
  Trophy,
  Users,
  Video,
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
  "Battle All Style 3 vs 3 : Popping, Afro et Hip-Hop",
  "Candidatures physiques et en ligne selon les zones",
  "Grande finale prévue à Dakar le 26 septembre",
  "Inscription & infos : WhatsApp 781 948 606",
];

const physicalPreselections = [
  {
    city: "Saint-Louis",
    date: "Vendredi 17 juillet",
    place: "Centre Culturel Le Château",
    time: "10h",
    logo: "/images/venues/centre-culturel-le-chateau.jpeg",
    logoAlt: "Logo du Centre Culturel Le Château",
  },
  {
    city: "Mbour",
    date: "Samedi 15 août",
    place: "Lieu en validation",
    time: "10h",
  },
  {
    city: "Thiès",
    date: "Samedi 29 août",
    place: "Centre Culturel Régional de Thiès",
    time: "10h",
    logo: "/images/venues/centre-culturel-regional-thies.jpeg",
    logoAlt: "Logo du Centre Culturel Régional de Thiès",
  },
  {
    city: "Dakar",
    date: "Samedi 12 septembre",
    place: "Centre Culturel Blaise Senghor",
    time: "10h",
  },
];

const operationalHighlights = [
  {
    icon: Users,
    title: "Format 3 vs 3",
    description:
      "Chaque équipe régionale réunit 1 danseur Popping, 1 danseur Afro et 1 danseur Hip-Hop.",
  },
  {
    icon: Video,
    title: "Candidatures en ligne",
    description:
      "Les autres régions peuvent transmettre une vidéo de 1 minute 30 entre le 20 juillet et le 31 août.",
  },
  {
    icon: ClipboardCheck,
    title: "Jury spécialisé",
    description:
      "Ousmane Tall et Kara Bendo assurent l'évaluation, avec un juré Hip-Hop à confirmer pour la finale.",
  },
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

const officialDancePartners = [
  {
    name: "Agence Diassnor",
    role: "Organisation artistique, management et coordination des competitions.",
    badge: "Responsable du Pole Danse",
    icon: Handshake,
  },
  {
    name: "Centre Culturel Blaise Senghor",
    role: "Partenaire institutionnel et accompagnement du developpement de la danse.",
    badge: "Partenaire Danse",
    icon: Building2,
  },
];

export default function BattleDanceSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-20 lg:py-28">
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

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-red-500/25 bg-red-500/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-black/40 text-red-300">
              <Handshake size={30} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-red-300">
                Organisation du Battle
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Agence Diassnor, partenaire Danse
              </h3>
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

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                <CalendarDays size={30} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                Bilan d&apos;organisation
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Phase présélection Battle Dance
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Le Battle All Style 3 vs 3 oppose des équipes régionales issues
                des présélections physiques dans quatre villes et des
                candidatures en ligne pour les autres régions du Sénégal.
              </p>

              <div className="mt-8 grid gap-4">
                {operationalHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5"
                    >
                      <Icon className="text-yellow-300" size={24} />
                      <h4 className="mt-4 text-lg font-black uppercase text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {physicalPreselections.map((event) => (
                <article
                  key={event.city}
                  className="rounded-[1.6rem] border border-white/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  {"logo" in event && event.logo ? (
                    <div className="mb-5 flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3">
                      <Image
                        src={event.logo}
                        alt={event.logoAlt}
                        width={240}
                        height={120}
                        className="h-16 w-full max-w-full object-contain sm:h-20"
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>
                  ) : null}
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                    {event.date} · {event.time}
                  </p>
                  <h4 className="mt-4 text-2xl font-black uppercase text-white">
                    {event.city}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {event.place}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
              Nos partenaires officiels de la danse
            </p>
            <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Deux structures pour encadrer le Battle Dance
            </h3>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {officialDancePartners.map((partner) => {
              const Icon = partner.icon;

              return (
                <article
                  key={partner.name}
                  className="rounded-[1.8rem] border border-white/10 bg-black/35 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                    {partner.badge}
                  </p>
                  <h4 className="mt-3 text-2xl font-black uppercase text-white">
                    {partner.name}
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {partner.role}
                  </p>
                </article>
              );
            })}
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
