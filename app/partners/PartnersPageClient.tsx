"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Crown,
  Gem,
  Globe2,
  Handshake,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20recevoir%20le%20dossier%20sponsoring%20et%20les%20opportunit%C3%A9s%20partenaires.";

const partnerBenefits = [
  {
    icon: Users,
    title: "Impact jeunesse",
    description:
      "Associer votre marque à un projet qui valorise les jeunes talents, la créativité, l’entrepreneuriat et l’innovation.",
  },
  {
    icon: Megaphone,
    title: "Visibilité premium",
    description:
      "Bénéficier d’une exposition sur le site officiel, les supports de communication, les réseaux sociaux et les activations terrain.",
  },
  {
    icon: Globe2,
    title: "Rayonnement international",
    description:
      "S’inscrire dans une dynamique ambitieuse entre le Sénégal, Paris et Rome pour toucher des publics variés.",
  },
];

const sponsorPacks = [
  {
    name: "Partenaire Majeur",
    icon: Crown,
    level: "Premium",
    description:
      "Positionnement prioritaire sur l’ensemble du dispositif Festival Talent 2027.",
    benefits: [
      "Logo mis en avant sur le site officiel",
      "Présence sur les supports majeurs",
      "Mention dans les communications officielles",
      "Visibilité pendant les temps forts",
      "Activation personnalisée selon le partenariat",
    ],
  },
  {
    name: "Sponsor Gold",
    icon: Trophy,
    level: "Gold",
    description:
      "Pack conçu pour les marques souhaitant une forte présence sur le projet.",
    benefits: [
      "Logo sur supports digitaux",
      "Présence dans les annonces sponsorisées",
      "Mise en avant sur la page partenaires",
      "Possibilité d’activation de marque",
    ],
  },
  {
    name: "Sponsor Silver",
    icon: Gem,
    level: "Silver",
    description:
      "Pack adapté aux entreprises souhaitant accompagner le projet avec une visibilité ciblée.",
    benefits: [
      "Logo sur la page partenaires",
      "Mention sur certains contenus officiels",
      "Association à une discipline ou activité",
      "Visibilité digitale ciblée",
    ],
  },
  {
    name: "Partenaire Institutionnel",
    icon: Building2,
    level: "Institutionnel",
    description:
      "Pour les institutions, organisations et structures engagées dans l’impact social, culturel et jeunesse.",
    benefits: [
      "Association à l’impact du projet",
      "Valorisation institutionnelle",
      "Présence dans les supports officiels",
      "Participation aux temps forts",
    ],
  },
];

const focusAreas = [
  "Culture",
  "Jeunesse",
  "Entrepreneuriat",
  "Innovation",
  "Mode",
  "Musique",
  "Technologie",
  "Sport mécanique",
];

const officialPartners = [
  {
    icon: ShieldCheck,
    label: "Partenaire Officiel Majeur",
    name: "Union Européenne",
    description:
      "L'Union Européenne est mise en avant comme partenaire officiel majeur du projet Festival Talent. Cette présence renforce la crédibilité, l'impact et l'ambition internationale de l'initiative.",
  },
  {
    icon: Megaphone,
    label: "Partenaire Media & Influence Officiel",
    name: "Sen Influenceurs",
    description:
      "Sen Influenceurs accompagne Festival Talent 2027 dans la visibilité digitale, la communication d’influence, la promotion des talents et la couverture médiatique des activités.",
  },
  {
    icon: Trophy,
    label: "Partenaire Officiel Battle de Danse",
    name: "Kaayfecc",
    description:
      "Kaayfecc accompagne officiellement les Battles de Danse par zones, ouvertes aux solos et groupes, tous styles et toutes zones.",
  },
  {
    icon: Handshake,
    label: "Partenaire Événementiel & Production",
    name: "Pierre Ndiaye Events",
    description:
      "Pierre Ndiaye Events accompagne Festival Talent 2027 sur les volets événementiel, production, relations partenaires et activation terrain.",
  },
  {
    icon: Building2,
    label: "Partenaire Construction & Développement",
    name: "Mano Perfetto",
    description:
      "Mano Perfetto accompagne Festival Talent 2027 comme partenaire construction et développement.",
  },
  {
    icon: Sparkles,
    label: "Partenaire Beauté & Lifestyle",
    name: "H & Hair",
    description:
      "H & Hair accompagne Festival Talent 2027 sur l’univers beauté, lifestyle et image.",
  },
  {
    icon: Gem,
    label: "Partenaire Bien-être & Santé",
    name: "Universal Selfcare",
    description:
      "Universal Selfcare accompagne Festival Talent 2027 sur les dimensions bien-être, santé et selfcare.",
  },
];

export default function PartnersPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_34%),linear-gradient(to_bottom,#000,rgba(12,10,3,0.96),#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Handshake size={17} />
              Partenaires & Sponsors
            </div>

            <h1 className="mt-10 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Construire
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                l’impact ensemble
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent 2027 offre aux marques, institutions et partenaires
              une opportunité unique de s’associer à un projet culturel,
              entrepreneurial et international centré sur la jeunesse, les
              talents et l’innovation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
              >
                Demander le dossier sponsoring
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/preselections"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Voir les pré-sélections
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[3rem] border border-yellow-400/30 bg-yellow-400/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-14"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
                  <ShieldCheck size={38} />
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
                  Premier partenaire officiel majeur
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
                  Union Européenne
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                  L’Union Européenne est mise en avant comme premier partenaire
                  officiel majeur du projet Festival Talent. Cette présence
                  renforce la crédibilité, l’impact et l’ambition internationale
                  de l’initiative.
                </p>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-black/35 p-8 backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <div
                      key={area}
                      className="rounded-[1.5rem] border border-yellow-400/15 bg-yellow-400/[0.06] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-yellow-300"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <BadgeCheck size={16} />
              Partenaires officiels
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Ils accompagnent
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                Festival Talent 2027
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {officialPartners.map((partner, index) => {
              const Icon = partner.icon;

              return (
                <motion.article
                  key={partner.name}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="rounded-[2rem] border border-yellow-400/25 bg-yellow-400/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/45"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                    {partner.label}
                  </p>

                  <h3 className="mt-4 text-3xl font-black uppercase text-white">
                    {partner.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {partner.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Target size={16} />
              Pourquoi devenir partenaire ?
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Une visibilité
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                avec du sens
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Devenir partenaire de Festival Talent, c’est associer votre marque
              à une plateforme qui connecte culture, jeunesse, créativité et
              opportunités internationales.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {partnerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              <Crown size={16} />
              Offres partenaires
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
              Packs
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                sponsoring
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              Les packs peuvent être adaptés selon les objectifs de visibilité,
              d’impact, d’activation terrain ou de partenariat institutionnel.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sponsorPacks.map((pack, index) => {
              const Icon = pack.icon;

              return (
                <motion.article
                  key={pack.name}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.6 }}
                  className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition group-hover:scale-110">
                      <Icon size={26} />
                    </div>

                    <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-yellow-300">
                      {pack.level}
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl font-black uppercase text-white">
                    {pack.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {pack.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {pack.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-sm leading-6 text-white/60"
                      >
                        <BadgeCheck
                          size={17}
                          className="mt-1 shrink-0 text-yellow-300"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-4 text-xs font-black uppercase tracking-[0.22em] text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
                  >
                    Demander
                    <ArrowRight size={15} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-yellow-400/25 bg-yellow-400/[0.08] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/30 bg-black/40 text-yellow-300">
            <Sparkles size={38} />
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Rejoindre l’aventure
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            Votre marque peut devenir un acteur clé de Festival Talent 2027
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Demandez le dossier sponsoring pour découvrir les opportunités de
            visibilité, d’impact et de collaboration autour du projet.
          </p>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-105"
          >
            Demander le dossier sponsoring
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
