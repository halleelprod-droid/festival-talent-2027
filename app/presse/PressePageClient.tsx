"use client";

import {
  BadgeCheck,
  BookOpen,
  Camera,
  Download,
  FileArchive,
  FileText,
  Image,
  Mail,
  Megaphone,
  MessageCircle,
  Newspaper,
  Palette,
  PlaySquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

type PressResource = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type PressRelease = {
  title: string;
  date: string;
  category: string;
  description: string;
};

const pressResources: PressResource[] = [
  {
    title: "Logo officiel",
    description: "Versions officielles destinees aux supports institutionnels et medias.",
    icon: BadgeCheck,
  },
  {
    title: "Photos HD",
    description: "Images selectionnees pour articles, portraits, annonces et reportages.",
    icon: Camera,
  },
  {
    title: "Affiches officielles",
    description: "Supports de communication validés pour l'affichage public.",
    icon: Image,
  },
  {
    title: "Communiques",
    description: "Annonces officielles et textes de reference du Festival Talent.",
    icon: Newspaper,
  },
  {
    title: "Dossier de presse",
    description: "Presentation complete de la vision, des chiffres et du projet.",
    icon: FileText,
  },
  {
    title: "Charte graphique",
    description: "Regles d'identite visuelle, couleurs, usages et interdits.",
    icon: Palette,
  },
  {
    title: "Videos officielles",
    description: "Ressources video pour diffusion, interviews et contenus numeriques.",
    icon: PlaySquare,
  },
];

const pressReleases: PressRelease[] = [
  {
    title: "Festival Talent 2027 devoile sa vision",
    date: "Communique provisoire",
    category: "Vision",
    description:
      "Festival Talent affirme son ambition : reveler, accompagner et propulser les talents africains dans une dynamique culturelle durable.",
  },
  {
    title: "Les pre-selections s'etendent a plusieurs disciplines",
    date: "Communique provisoire",
    category: "Pre-selections",
    description:
      "Musique, danse, mode, culture urbaine, digital et innovation structurent un parcours ouvert a plusieurs formes d'expression.",
  },
  {
    title: "De nouveaux partenaires rejoignent Festival Talent",
    date: "Communique provisoire",
    category: "Partenaires",
    description:
      "Le projet renforce son ecosysteme avec des structures media, institutionnelles, culturelles et evenementielles.",
  },
];

export default function PressePageClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,#000,rgba(12,10,5,0.98),#000)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:76px_76px]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <SectionHeader
              eyebrow="Centre officiel"
              icon={Megaphone}
              title={
                <>
                  Centre Presse
                  <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-white bg-clip-text text-transparent">
                    Festival Talent
                  </span>
                </>
              }
              description="Retrouvez les ressources officielles, communiques, logos, contacts presse et informations medias du Festival Talent 2027."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton href="#ressources" icon={Download}>
                Telecharger le kit media
              </GradientButton>
              <GradientButton href="#contacts-presse" variant="outline" icon={Mail}>
                Contacter la presse
              </GradientButton>
            </div>
          </div>

          <PremiumCard tone="gold" className="p-7 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-yellow-200">
                  Media room
                </p>
                <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Informations fiables pour medias et partenaires.
                </h2>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/35 bg-black/35 text-yellow-200">
                <FileArchive size={31} aria-hidden="true" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Logos", "Communiques", "Contacts"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-black/25 p-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>
      </section>

      <section id="ressources" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Kit media"
            icon={FileArchive}
            title="Ressources officielles"
            description="Une base de ressources pour journalistes, createurs, partenaires et sponsors. Les fichiers telechargeables pourront etre branches progressivement."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pressResources.map((resource, index) => {
              const Icon = resource.icon;

              return (
                <motion.article
                  key={resource.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.04, duration: 0.45 }}
                >
                  <PremiumCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={25} aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {resource.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {resource.description}
                    </p>
                  </PremiumCard>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Actualites presse"
            icon={Newspaper}
            title="Communiques recents"
            description="Des textes provisoires pour preparer la communication officielle et structurer les futurs communiques."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pressReleases.map((release) => (
              <PremiumCard
                key={release.title}
                className="p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                  {release.category}
                </p>
                <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-white">
                  {release.title}
                </h2>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  {release.date}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/60">
                  {release.description}
                </p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts-presse" className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <PremiumCard tone="gold" className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Contacts presse"
              icon={Mail}
              title="Contacter l'equipe media"
              description="Pour interviews, demandes de ressources officielles, invitations presse et collaborations media."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:festivaltalentofficial@gmail.com"
                className="rounded-xl border border-white/10 bg-black/25 p-5 transition hover:border-yellow-300/45"
              >
                <Mail className="text-yellow-300" size={24} aria-hidden="true" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/50">
                  Email
                </p>
                <p className="mt-2 break-words text-sm font-bold text-white">
                  festivaltalentofficial@gmail.com
                </p>
              </a>

              <a
                href="https://wa.me/221781948606"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-black/25 p-5 transition hover:border-yellow-300/45"
              >
                <MessageCircle className="text-yellow-300" size={24} aria-hidden="true" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/50">
                  WhatsApp
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  +221 78 194 86 06
                </p>
              </a>
            </div>
          </PremiumCard>

          <div className="grid gap-6">
            <PremiumCard className="p-8">
              <SectionHeader
                eyebrow="Partenaires medias"
                icon={Users}
                title="Ils relaient l'histoire"
                description="Sen Influenceurs accompagne la visibilite media et digitale du Festival Talent."
              />

              <div className="mt-8 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.07] p-5">
                <p className="text-2xl font-black uppercase text-white">
                  Sen Influenceurs
                </p>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Partenaire media officiel pour renforcer la diffusion, la
                  narration et l&apos;engagement digital autour du festival.
                </p>
              </div>
            </PremiumCard>

            <PremiumCard className="p-8">
              <SectionHeader
                eyebrow="Regles d'utilisation"
                icon={ShieldCheck}
                title="Utilisation des ressources"
                description="Les logos, images et contenus officiels doivent etre utilises dans le respect de l'identite Festival Talent. Toute utilisation commerciale ou modification non autorisee doit etre validee par l'equipe officielle."
              />
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 pt-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-black">
              <BookOpen size={30} aria-hidden="true" />
            </div>
            <h2 className="mt-7 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
              Vous etes journaliste, media ou createur de contenu ?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
              L&apos;equipe Festival Talent peut vous orienter vers les informations
              officielles, les porte-paroles et les ressources adaptees.
            </p>
            <div className="mt-9">
              <GradientButton href="/contact" icon={Sparkles}>
                Contacter l&apos;equipe media
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
