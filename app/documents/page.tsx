import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Download,
  FileBadge,
  FileText,
  Landmark,
  Megaphone,
  Palette,
  ShieldCheck,
} from "lucide-react";

import { buildPageMetadata } from "@/lib/seo";

const documents = [
  {
    title: "Brand Book Festival Talent",
    description:
      "Vision, mission, valeurs, identité visuelle, ton de communication et règles de marque.",
    status: "Bientôt disponible",
    icon: BookOpen,
  },
  {
    title: "Partnership Book",
    description:
      "Présentation des opportunités de partenariat pour entreprises, banques, institutions et sponsors.",
    status: "Bientôt disponible",
    icon: Building2,
  },
  {
    title: "Dossier Sponsoring",
    description:
      "Packs, visibilité, activations, indicateurs d'impact et avantages partenaires.",
    status: "Bientôt disponible",
    icon: FileBadge,
  },
  {
    title: "Kit Média",
    description:
      "Logos, visuels, communiqués, photos officielles et contacts presse.",
    status: "Bientôt disponible",
    icon: Megaphone,
  },
  {
    title: "Charte Graphique",
    description:
      "Couleurs, typographies, usages du logo et direction artistique.",
    status: "Bientôt disponible",
    icon: Palette,
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Documents Officiels | Festival Talent 2027",
  description:
    "Consultez les documents officiels du Festival Talent 2027 : brand book, partnership book, dossier sponsoring, kit média et ressources institutionnelles.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,#050505_46%,#000)]" />
      <div className="pointer-events-none fixed -left-40 top-28 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <section className="relative px-6 pb-20 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
                <FileText size={17} />
                Centre documentaire officiel
              </div>
              <h1 className="mt-8 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Documents
                <span className="block bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                  Officiels
                </span>
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-lg leading-8 text-white/70">
                Accédez aux ressources institutionnelles du Festival Talent :
                brand book, partnership book, dossier sponsoring, kit média et
                documents de présentation.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                >
                  Demander un document
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/institution/contact-institutionnel"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white/80 transition hover:border-yellow-300/40 hover:text-yellow-200"
                >
                  Contacter l&apos;équipe partenariats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/80">
              Ressources institutionnelles
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Une bibliothèque claire pour les partenaires
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
              Les documents seront publiés progressivement après validation
              officielle. Chaque ressource est pensée pour faciliter les échanges
              avec les banques, institutions, sponsors, médias et partenaires.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document) => {
              const Icon = document.icon;

              return (
                <article
                  key={document.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-yellow-300/[0.055]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200 transition group-hover:scale-105">
                      <Icon size={25} />
                    </div>
                    <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-200">
                      {document.status}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl font-black uppercase text-white">
                    {document.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {document.description}
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-7 inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/38"
                  >
                    Téléchargement futur
                    <Download size={14} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
              <Landmark size={17} />
              Banques & Institutions
            </div>
            <h2 className="mt-7 text-4xl font-black uppercase leading-tight sm:text-6xl">
              Un espace pensé pour les partenaires institutionnels
            </h2>
          </div>

          <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.055] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-lg leading-8 text-white/72">
              Festival Talent prépare des documents dédiés aux banques,
              institutions, entreprises et organisations souhaitant accompagner
              la jeunesse, la culture, l&apos;innovation et l&apos;économie créative.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Crédibilité institutionnelle",
                "Partenariats structurés",
                "Impact jeunesse",
                "Ressources validées",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white/70"
                >
                  <BadgeCheck size={17} className="text-yellow-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-yellow-300/20 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-300/10 text-yellow-200">
            <ShieldCheck size={28} />
          </div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Vous souhaitez recevoir les documents officiels ?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/62">
            L&apos;équipe Festival Talent peut orienter les demandes des sponsors,
            médias, banques, institutions et organisations vers les bons
            interlocuteurs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-[1.02]"
            >
              Contacter les partenariats
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/10 px-7 py-5 text-xs font-black uppercase tracking-[0.22em] text-yellow-200 transition hover:bg-yellow-300 hover:text-black"
            >
              Voir les partenaires
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
