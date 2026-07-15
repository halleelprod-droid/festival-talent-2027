"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Crown,
  Download,
  Eye,
  Gem,
  Globe2,
  Handshake,
  HeartHandshake,
  Mail,
  Megaphone,
  Monitor,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  sponsorImpactGoals,
  sponsorPacks,
  sponsorPartners,
  type SponsorImpactGoal,
  type SponsorPartner,
} from "@/data/sponsors";

const reasons = [
  { title: "Detection de talents", icon: Target },
  { title: "Impact social", icon: HeartHandshake },
  { title: "Culture", icon: Sparkles },
  { title: "Innovation", icon: Rocket },
  { title: "Jeunesse", icon: Users },
  { title: "Entrepreneuriat", icon: Briefcase },
  { title: "Rayonnement international", icon: Globe2 },
];

const companyReasons = [
  { title: "Visibilite nationale", icon: Eye },
  { title: "Visibilite digitale", icon: Monitor },
  { title: "Presence terrain", icon: Building2 },
  { title: "Relations publiques", icon: Megaphone },
  { title: "Responsabilite societale", icon: ShieldCheck },
  { title: "Networking", icon: Handshake },
];

const youthInvestment = [
  "emploi",
  "creativite",
  "innovation",
  "culture",
  "education",
  "entrepreneuriat",
];

function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
      <Icon size={16} aria-hidden="true" />
      {children}
    </p>
  );
}

function CtaLink({
  href,
  children,
  variant = "gold",
  icon: Icon = ArrowRight,
}: {
  href: string;
  children: string;
  variant?: "gold" | "outline";
  icon?: LucideIcon;
}) {
  const className =
    variant === "gold"
      ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 text-black hover:scale-[1.02]"
      : "border border-white/15 bg-white/[0.04] text-white/85 hover:border-yellow-400/45 hover:text-yellow-300";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black ${className}`}
    >
      {children}
      <Icon size={16} aria-hidden="true" />
    </Link>
  );
}

function AnimatedCounter({ goal }: { goal: SponsorImpactGoal }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(goal.value);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(0, goal.value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [goal.value, inView]);

  return <span ref={ref}>{value.toLocaleString("fr-FR")}</span>;
}

function PartnerLogo({ partner }: { partner: SponsorPartner }) {
  const [hasError, setHasError] = useState(false);

  if (!partner.logo || hasError) {
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg border border-yellow-400/20 bg-black/55 px-4 text-center text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
        {partner.name}
      </div>
    );
  }

  return (
    <Image
      src={partner.logo}
      alt={`Logo ${partner.name}`}
      width={220}
      height={110}
      className="mx-auto h-20 w-auto object-contain"
      onError={() => setHasError(true)}
    />
  );
}

function FeatureCard({
  title,
  icon: Icon,
  index,
}: {
  title: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06]"
    >
      <Icon className="text-yellow-300" size={28} aria-hidden="true" />
      <h3 className="mt-5 text-xl font-black uppercase leading-tight text-white">
        {title}
      </h3>
    </motion.article>
  );
}

export function SponsorCenterPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Eyebrow icon={Handshake}>Festival Talent Sponsor Center</Eyebrow>
            <h1 className="mt-8 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Devenez Partenaire du
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                Festival Talent
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
              Investissez dans les talents qui construiront l&apos;Afrique de demain.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <CtaLink href="/sponsors/pack-partenaires" icon={Download}>
                Telecharger le dossier
              </CtaLink>
              <CtaLink href="/sponsors/devenir-partenaire" variant="outline">
                Demander un rendez-vous
              </CtaLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="rounded-lg border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {sponsorImpactGoals.map((goal) => (
                <div key={goal.label} className="rounded-lg border border-white/10 bg-black/35 p-6">
                  <p className="text-3xl font-black uppercase text-white">
                    {goal.value.toLocaleString("fr-FR")}
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                    {goal.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow icon={Target}>Pourquoi soutenir Festival Talent ?</Eyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Soutenir une generation, pas seulement un evenement.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <FeatureCard key={reason.title} title={reason.title} icon={reason.icon} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow icon={Building2}>Pourquoi les entreprises nous rejoignent</Eyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Impact, image, terrain et relations durables.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyReasons.map((reason, index) => (
              <FeatureCard key={reason.title} title={reason.title} icon={reason.icon} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow icon={ShieldCheck}>Nos partenaires</Eyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Un ecosysteme de confiance.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorPartners.map((partner, index) => (
              <motion.article
                key={partner.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.5 }}
                className="rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <PartnerLogo partner={partner} />
                <h3 className="mt-6 text-xl font-black uppercase text-white">{partner.name}</h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-yellow-300">{partner.category}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow icon={Trophy}>Nos ambitions</Eyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Des objectifs lisibles pour les partenaires.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {sponsorImpactGoals.map((goal, index) => (
              <motion.article
                key={goal.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.5 }}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <p className="text-4xl font-black uppercase text-white">
                  <AnimatedCounter goal={goal} />
                </p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">{goal.label}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-lg border border-yellow-400/25 bg-yellow-400/[0.08] p-8 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow icon={Gem}>Pourquoi investir dans la jeunesse ?</Eyebrow>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Parce que les talents d&apos;aujourd&apos;hui deviennent les createurs d&apos;emplois de demain.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Votre partenariat soutient l&apos;emploi, la creativite, l&apos;innovation,
              la culture, l&apos;education et l&apos;entrepreneuriat.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {youthInvestment.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="rounded-lg border border-white/10 bg-black/35 p-5 text-sm font-black uppercase tracking-[0.18em] text-white/80"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function SponsorPacksPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow icon={Crown}>Packs partenaires</Eyebrow>
          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
            Choisir un niveau de presence sans afficher de prix.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65">
            Les packs servent de base de discussion. Chaque partenariat peut etre adapte selon vos objectifs d&apos;impact, de visibilite et d&apos;activation.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sponsorPacks.map((pack, index) => (
            <motion.article
              key={pack.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex h-full flex-col rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
              <span className="w-fit rounded-full border border-yellow-400/25 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                {pack.level}
              </span>
              <h2 className="mt-6 text-3xl font-black uppercase text-white">{pack.name}</h2>
              <p className="mt-4 text-sm leading-7 text-white/62">{pack.description}</p>
              <ul className="mt-6 space-y-3">
                {pack.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-6 text-white/68">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-yellow-300" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <CtaLink href="/sponsors/devenir-partenaire" icon={Download}>Telechargement dossier</CtaLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function BecomeSponsorPageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Eyebrow icon={Mail}>Devenir partenaire</Eyebrow>
          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl">
            Parlons d&apos;un partenariat utile et durable.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/65">
            Cette interface prepare le futur flux de demande sponsor. Aucun envoi reel n&apos;est active pour le moment.
          </p>
          <div className="mt-8 rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-6">
            <Phone className="text-yellow-300" size={24} aria-hidden="true" />
            <p className="mt-4 text-sm leading-7 text-white/68">
              Pour une demande urgente, contactez l&apos;equipe Festival Talent via la page Contact officielle.
            </p>
          </div>
        </div>

        <form className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8" aria-label="Formulaire de demande sponsor preparatoire">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "Nom entreprise",
              "Nom du responsable",
              "Email",
              "Telephone",
              "Secteur",
            ].map((label) => (
              <label key={label} className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">{label}</span>
                <input
                  type={label === "Email" ? "email" : "text"}
                  className="mt-3 w-full rounded-lg border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/55"
                  placeholder={label}
                  aria-label={label}
                />
              </label>
            ))}
            <label className="block sm:col-span-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Message</span>
              <textarea
                rows={6}
                className="mt-3 w-full rounded-lg border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/55"
                placeholder="Votre objectif de partenariat"
                aria-label="Message"
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
          >
            Etre contacte
            <Send size={16} aria-hidden="true" />
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-white/45">
            Interface preparatoire : aucun message n&apos;est envoye depuis ce formulaire.
          </p>
        </form>
      </div>
    </main>
  );
}
