"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Camera,
  CreditCard,
  Gem,
  Handshake,
  HeartHandshake,
  Landmark,
  Laptop,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Store,
  Swords,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { officialPartners, type PartnerGroup } from "@/data/partners";

// Présentation des catégories (titres, blurb, icône). Les PARTENAIRES eux-mêmes
// proviennent exclusivement de data/partners.ts (source unique), regroupés par
// `group`. Aucun tableau local de partenaires ici.
type CategoryPartner = {
  name: string;
  label: string;
  description: string;
  image?: string;
  href?: string;
  whiteBg?: boolean;
};

type PartnerCategory = {
  title: string;
  description: string;
  partners: CategoryPartner[];
  icon: LucideIcon;
};

const GROUP_META: Record<PartnerGroup, { title: string; description: string; icon: LucideIcon }> = {
  institutionnel: {
    title: "🏛 Partenaires Institutionnels",
    description:
      "Institutions publiques, organisations internationales et structures culturelles engagées pour la jeunesse.",
    icon: Landmark,
  },
  digital: {
    title: "💻 Partenaires Digitaux",
    description:
      "Technologie, plateforme, sécurité, référencement, maintenance et innovation numérique.",
    icon: Laptop,
  },
  "media-comm": {
    title: "🎥 Média & Communication",
    description:
      "Production audiovisuelle, stratégie de communication, contenus, couverture et relations médias.",
    icon: Camera,
  },
  strategique: {
    title: "🤝 Partenaires Stratégiques",
    description:
      "Production, relations institutionnelles, activations terrain et structuration du projet.",
    icon: Handshake,
  },
  artistique: {
    title: "💃 Partenaires Artistiques",
    description:
      "Encadrement artistique, disciplines, battles, présélections et accompagnement des talents.",
    icon: Sparkles,
  },
  "media-influence": {
    title: "📺 Partenaires Média",
    description:
      "Influence, diffusion, amplification digitale et visibilité des talents.",
    icon: Megaphone,
  },
  lutte: {
    title: "🤼 Partenaires Lutte & Sports",
    description:
      "Encadrement, valorisation et développement des talents de la lutte sénégalaise et des disciplines sportives.",
    icon: Swords,
  },
  nautique: {
    title: "🌊 Sports nautiques",
    description:
      "Jet-Ski, croisière et expériences nautiques du Festival Talent organisées à Saly.",
    icon: Waves,
  },
  lifestyle: {
    title: "🛍 Lifestyle & Bien-être",
    description:
      "Beauté, image, soin, bien-être, hospitalité et expérience premium des publics.",
    icon: Store,
  },
};

// Ordre d'affichage des groupes ; le placeholder bancaire (non-partenaire) est
// inséré juste après l'institutionnel.
const GROUP_ORDER: PartnerGroup[] = [
  "institutionnel", "digital", "media-comm", "strategique",
  "artistique", "media-influence", "lutte", "nautique", "lifestyle",
];

const bankCategory: PartnerCategory = {
  title: "🏦 Partenaires Bancaires & Finance",
  description:
    "Un espace préparé pour les futurs partenaires bancaires, l'éducation financière et l'accompagnement des projets.",
  partners: [
    {
      name: "Partenaire bancaire à venir",
      label: "Architecture prête",
      description:
        "Festival Talent prépare un cadre de mise en relation responsable, sans proposer directement de services bancaires.",
    },
  ],
  icon: Banknote,
};

const partnerCategories: PartnerCategory[] = (() => {
  const derived = GROUP_ORDER.map((group): PartnerCategory | null => {
    const partners = officialPartners
      .filter((partner) => partner.group === group)
      .map((partner): CategoryPartner => ({
        name: partner.name,
        label: partner.label,
        description: partner.description,
        image: partner.image,
        href: partner.href,
        whiteBg: partner.whiteLogo,
      }));
    return partners.length ? { ...GROUP_META[group], partners } : null;
  }).filter((category): category is PartnerCategory => category !== null);

  const [first, ...rest] = derived;
  return first ? [first, bankCategory, ...rest] : [bankCategory, ...rest];
})();

const bankReasons = [
  {
    icon: Users,
    title: "Jeunesse bancarisable demain",
    description:
      "Les talents accompagnés aujourd'hui deviendront entrepreneurs, créateurs, indépendants et porteurs de projets.",
  },
  {
    icon: CreditCard,
    title: "Éducation financière",
    description:
      "Festival Talent peut devenir un canal responsable de sensibilisation à l'épargne, au budget et à la gestion de projet.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance institutionnelle",
    description:
      "Le partenariat bancaire doit être encadré, transparent et aligné avec l'intérêt des jeunes talents.",
  },
  {
    icon: HeartHandshake,
    title: "Impact mesurable",
    description:
      "Un partenaire financier peut soutenir l'inclusion, l'entrepreneuriat, les formations et les opportunités durables.",
  },
] as const;

const financeTracks = [
  "Éducation financière",
  "Entrepreneuriat créatif",
  "Orientation vers les bons interlocuteurs",
  "Préparation de dossiers projet",
  "Accompagnement des jeunes talents",
  "Mise en relation future avec des partenaires autorisés",
] as const;

const contactFields = [
  { id: "name", label: "Nom", type: "text" },
  { id: "phone", label: "Téléphone", type: "tel" },
  { id: "email", label: "Email", type: "email" },
  { id: "city", label: "Ville", type: "text" },
  { id: "project", label: "Projet", type: "text" },
] as const;

function PartnerLogo({ src, name, whiteBg }: { src?: string; name: string; whiteBg?: boolean }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-14 min-w-32 items-center justify-center rounded-lg border border-yellow-400/20 bg-black/60 px-4 text-center text-[10px] font-black uppercase tracking-[0.16em] text-yellow-200">
        {name}
      </div>
    );
  }

  // Logo à fond blanc : carte blanche bordée + object-contain, sans recadrage.
  if (whiteBg) {
    return (
      <div className="flex min-h-24 items-center justify-center rounded-xl border border-white/15 bg-white p-3">
        <Image
          src={src}
          alt={`Logo de ${name}, partenaire technique des activités nautiques du Festival Talent`}
          width={190}
          height={268}
          className="h-24 w-auto max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Logo ${name}`}
      width={150}
      height={72}
      className="h-12 w-auto object-contain"
      onError={() => setHasError(true)}
    />
  );
}

export default function PartnersPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_34%),linear-gradient(to_bottom,#000,#050505_42%,#000)]" />
      <div className="pointer-events-none fixed -left-40 top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-200">
                <Handshake size={17} />
                Espace institutionnel partenaires
              </div>

              <h1 className="mt-8 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Construisons ensemble
                <span className="block bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                  l&apos;avenir des talents.
                </span>
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-lg leading-8 text-white/72">
                Festival Talent rassemble entreprises, banques, institutions,
                médias et organisations autour d&apos;une ambition commune : révéler,
                accompagner et connecter les talents africains avec des
                opportunités durables.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/sponsors"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]"
                >
                  Devenir partenaire
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#talent-finance"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/80 transition hover:border-yellow-300/40 hover:text-yellow-200"
                >
                  Talent Finance
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Cartographie partenaires
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Un écosystème conçu pour grandir
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
              Chaque catégorie clarifie le rôle des partenaires actuels et
              prépare l&apos;arrivée de nouvelles entreprises, institutions et
              organisations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {partnerCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.04, duration: 0.55 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-yellow-300/[0.055] sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-black uppercase leading-tight text-white">
                        {category.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200">
                      <Icon size={25} />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4">
                    {category.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="rounded-xl border border-white/10 bg-black/35 p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-200/75">
                              {partner.label}
                            </p>
                            <h4 className="mt-2 text-xl font-black uppercase text-white">
                              {partner.name}
                            </h4>
                          </div>
                          <PartnerLogo
                            src={"image" in partner ? partner.image : undefined}
                            name={partner.name}
                            whiteBg={"whiteBg" in partner && partner.whiteBg}
                          />
                        </div>
                        <p className="mt-4 text-sm leading-7 text-white/58">
                          {partner.description}
                        </p>
                        {"href" in partner && partner.href ? (
                          <Link
                            href={partner.href}
                            className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-200 transition hover:text-white"
                          >
                            Découvrir
                            <ArrowRight size={14} />
                          </Link>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-200">
                <Banknote size={17} />
                Banques & impact
              </div>
              <h2 className="mt-7 text-4xl font-black uppercase leading-tight sm:text-6xl">
                Pourquoi les banques rejoignent Festival Talent ?
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/62">
                Les banques et acteurs financiers peuvent soutenir une génération
                de créateurs, entrepreneurs et jeunes professionnels, à condition
                que chaque relation soit transparente, responsable et encadrée
                par des partenaires autorisés.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {bankReasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <motion.article
                    key={reason.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                    className="rounded-2xl border border-yellow-300/18 bg-yellow-300/[0.055] p-6 backdrop-blur-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-300/25 bg-black/35 text-yellow-200">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-black uppercase text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {reason.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="talent-finance"
        className="relative px-6 pb-28 pt-10 sm:px-10 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200">
              Talent Finance
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Une passerelle responsable vers l&apos;éducation financière.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/62">
              Talent Finance prépare un futur espace d&apos;orientation pour aider les
              jeunes talents à comprendre les bases financières de leurs projets.
              Festival Talent ne fournit pas de services bancaires et ne permet
              pas d&apos;ouvrir un compte directement.
            </p>

            <div className="mt-8 grid gap-3">
              {financeTracks.map((track) => (
                <div
                  key={track}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-white/70"
                >
                  <BadgeCheck className="mt-0.5 shrink-0 text-yellow-200" size={17} />
                  <span>{track}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.06] p-6 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-8"
            aria-labelledby="bank-contact-title"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
                  Formulaire préparatoire
                </p>
                <h3
                  id="bank-contact-title"
                  className="mt-3 text-3xl font-black uppercase text-white"
                >
                  Être contacté par notre partenaire bancaire
                </h3>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-black/35 text-yellow-200">
                <CreditCard size={25} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {contactFields.map((field) => (
                <label key={field.id} className="block">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                    {field.label}
                  </span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/55"
                    placeholder={field.label}
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                Message
              </span>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/55"
                placeholder="Expliquez votre besoin ou votre projet."
              />
            </label>

            <p className="mt-5 rounded-xl border border-white/10 bg-black/35 p-4 text-xs leading-6 text-white/55">
              Festival Talent ne fournit pas de services bancaires. Les demandes
              sont simplement transmises au partenaire bancaire choisi lorsque des
              accords seront signés.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.01] sm:w-auto"
            >
              Demander à être contacté
              <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-yellow-300/20 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200">
            <Gem size={28} />
          </div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Votre organisation peut devenir un bâtisseur d&apos;opportunités.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
            Entreprises, institutions, banques, médias et organisations :
            construisons un modèle durable au service des talents, des régions et
            de l&apos;économie créative.
          </p>
          <Link
            href="/sponsors/devenir-partenaire"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
          >
            Construire un partenariat
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
