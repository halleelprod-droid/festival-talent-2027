"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Crown,
  Globe2,
  Handshake,
  Landmark,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const partnerCategories = [
  {
    title: "Partenaire officiel majeur",
    name: "Union Européenne",
    description:
      "Premier partenaire officiel mis en avant dans la vision institutionnelle, sociale et internationale du Festival Talent 2027.",
    icon: Globe2,
    featured: true,
  },
  {
    title: "Partenaires institutionnels",
    name: "Institutions publiques & organisations",
    description:
      "Des partenaires engagés pour accompagner la jeunesse, la culture, l’innovation et l’impact social.",
    icon: Landmark,
  },
  {
    title: "Sponsors officiels",
    name: "Entreprises & marques",
    description:
      "Des entreprises associées à une expérience culturelle, créative et médiatique de grande ampleur.",
    icon: Building2,
  },
  {
    title: "Médias partenaires",
    name: "Presse, digital & audiovisuel",
    description:
      "Des relais stratégiques pour amplifier la visibilité du festival au Sénégal et à l’international.",
    icon: Megaphone,
  },
];

const sponsorPacks = [
  {
    name: "Gold",
    icon: Crown,
    description:
      "Visibilité premium, présence forte sur les supports officiels, activations de marque et accès privilégié aux espaces partenaires.",
    benefits: [
      "Logo prioritaire sur supports officiels",
      "Présence sur site web et réseaux sociaux",
      "Activation de marque possible",
      "Accès partenaires selon dispositif",
    ],
  },
  {
    name: "Silver",
    icon: Star,
    description:
      "Un dispositif équilibré pour associer votre marque à l’énergie du festival et toucher une audience jeune et engagée.",
    benefits: [
      "Logo sur supports partenaires",
      "Mention digitale officielle",
      "Visibilité pendant les temps forts",
      "Opportunités de networking",
    ],
  },
  {
    name: "Bronze",
    icon: Handshake,
    description:
      "Une formule accessible pour soutenir Festival Talent 2027 et rejoindre l’écosystème des partenaires.",
    benefits: [
      "Mention partenaire",
      "Présence digitale",
      "Association à l’impact jeunesse",
      "Possibilité d’évolution vers une formule supérieure",
    ],
  },
  {
    name: "Institutionnel",
    icon: ShieldCheck,
    description:
      "Une catégorie dédiée aux institutions, organisations, programmes jeunesse, culture et innovation.",
    benefits: [
      "Valorisation de l’impact social",
      "Présence institutionnelle",
      "Panels, conférences et initiatives jeunesse",
      "Visibilité auprès des publics ciblés",
    ],
  },
];

const impactItems = [
  {
    icon: Users,
    title: "Jeunesse",
    text: "Un accès direct aux jeunes talents, étudiants, créateurs, porteurs de projets et entrepreneurs.",
  },
  {
    icon: Sparkles,
    title: "Culture & créativité",
    text: "Un événement multidisciplinaire mêlant musique, mode, art, technologie, leadership et culture urbaine.",
  },
  {
    icon: Globe2,
    title: "Rayonnement international",
    text: "Une plateforme pensée pour connecter le Sénégal, l’Afrique et l’Europe autour des talents.",
  },
];

export default function PartnersPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-20 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute -left-36 bottom-32 h-[460px] w-[460px] rounded-full bg-yellow-400/10 blur-[130px]" />
      <div className="absolute -right-36 top-52 h-[460px] w-[460px] rounded-full bg-orange-500/10 blur-[130px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <ShieldCheck size={16} />
            Partenaires officiels
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl">
            Construire
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              l’impact ensemble
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 rassemble entreprises, institutions, médias et
            partenaires internationaux autour d’une ambition commune : révéler
            les talents, soutenir la jeunesse, valoriser la culture et créer un
            événement majeur au Sénégal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-yellow-400/40 bg-gradient-to-br from-yellow-400/[0.14] via-white/[0.05] to-white/[0.02] p-8 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl lg:p-12"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-white/10 bg-black/45 p-8 backdrop-blur-xl">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 shadow-2xl shadow-yellow-900/30">
                  <Globe2 size={42} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                  Premier partenaire officiel
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  Union
                  <span className="block text-yellow-300">Européenne</span>
                </h2>
              </div>
            </div>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                <Sparkles size={15} />
                Partenaire majeur
              </p>

              <h3 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Une dimension institutionnelle et internationale renforcée.
              </h3>

              <p className="mt-5 text-base leading-8 text-white/65">
                L’Union Européenne est mise en avant comme premier partenaire
                officiel majeur du Festival Talent 2027. Cette présence renforce
                la crédibilité, l’impact et la portée internationale du projet,
                notamment autour de la jeunesse, de la culture, de
                l’entrepreneuriat, de la créativité et de l’innovation.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["Jeunesse", "Culture", "Innovation"].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
                      {item}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      Axe prioritaire pour l’impact et le rayonnement du
                      festival.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {partnerCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                className={`group relative overflow-hidden rounded-[2rem] border p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 ${
                  category.featured
                    ? "border-yellow-400/45 bg-yellow-400/[0.08]"
                    : "border-white/10 bg-white/[0.04] hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition duration-300 group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                    {category.title}
                  </p>

                  <h3 className="mt-4 text-2xl font-black uppercase text-white">
                    {category.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {category.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
              Packs sponsoring
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Des formules pensées pour
              <span className="block text-yellow-300">
                chaque niveau d’engagement
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
              Les packs sponsors permettent d’associer votre marque à un
              événement culturel majeur, avec une visibilité adaptée à vos
              objectifs : notoriété, impact jeunesse, présence institutionnelle,
              activation terrain ou rayonnement international.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {sponsorPacks.map((pack, index) => {
              const Icon = pack.icon;

              return (
                <motion.article
                  key={pack.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-2xl font-black uppercase text-white">
                    {pack.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {pack.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {pack.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-6 text-white/65"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {impactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-black uppercase text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.07] p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl font-black uppercase text-white">
            Devenir partenaire du Festival Talent 2027
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/65">
            Associez votre image à une initiative culturelle, jeunesse et
            internationale. Festival Talent 2027 offre aux partenaires une
            visibilité forte, une présence stratégique et une association directe
            à l’impact social et créatif.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/fr#newsletter"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105 hover:bg-white"
            >
              Être contacté
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/tickets"
              className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Voir les pass
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}