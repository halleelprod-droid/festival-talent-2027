import { BadgeCheck, Globe2, Megaphone, Trophy } from "lucide-react";

const officialPartners = [
  {
    name: "Union Europeenne",
    label: "Partenaire Officiel Majeur",
    description:
      "Un partenaire institutionnel majeur qui renforce la credibilite, l'impact et l'ambition internationale de Festival Talent 2027.",
    icon: Globe2,
    featured: true,
  },
  {
    name: "Sen Influenceurs",
    label: "Partenaire Media & Influence Officiel",
    description:
      "Sen Influenceurs accompagne Festival Talent 2027 dans sa visibilite digitale, sa communication d'influence, la promotion des talents et la couverture mediatique des activites du festival.",
    icon: Megaphone,
  },
  {
    name: "Kaayfecc",
    label: "Partenaire Officiel Battle de Danse",
    description:
      "Kaayfecc accompagne la dynamique des Battles de Danse par zones, avec solos, groupes, tous styles et toutes zones.",
    icon: Trophy,
  },
];

const supportingPartners = [
  "MANO PERFETTO",
  "VAL2EVENTS",
  "H & HAIR",
  "UNIVERSAL SELFCARE",
];

export default function PartnersSection() {
  return (
    <section className="relative border-t border-white/10 bg-black px-6 py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Official Partners
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Nos partenaires
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Festival Talent 2027 rassemble institutions, medias, partenaires
            culturels et organisations autour de la jeunesse, de la creation et
            de l&apos;innovation.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {officialPartners.map((partner) => {
            const Icon = partner.icon;

            return (
              <article
                key={partner.name}
                className={`group relative overflow-hidden rounded-[2rem] border p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
                  partner.featured
                    ? "border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/15 lg:col-span-3"
                    : "border-yellow-400/25 bg-yellow-400/[0.06] hover:border-yellow-400/45"
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative z-10 grid gap-7 md:grid-cols-[auto_1fr] md:items-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                      partner.featured
                        ? "border-blue-300/35 bg-blue-300/10 text-blue-200"
                        : "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    <Icon size={30} />
                  </div>

                  <div>
                    <p
                      className={`text-xs font-black uppercase tracking-[0.28em] ${
                        partner.featured ? "text-blue-200" : "text-yellow-300"
                      }`}
                    >
                      {partner.label}
                    </p>

                    <h3 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-5xl">
                      {partner.name}
                    </h3>

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {supportingPartners.map((partner) => (
            <div
              key={partner}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <BadgeCheck className="mx-auto text-yellow-300" size={22} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/75">
                {partner}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
