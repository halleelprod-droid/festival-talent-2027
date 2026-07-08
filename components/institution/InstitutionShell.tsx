import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Handshake,
  Landmark,
  Mail,
  Newspaper,
  ShieldCheck,
  Target,
} from "lucide-react";

import { institutionLinks } from "@/data/trust-center";

export const institutionIcons: Record<string, LucideIcon> = {
  governance: Landmark,
  vision: Target,
  impact: BadgeCheck,
  transparency: ShieldCheck,
  documents: FileText,
  partners: Handshake,
  press: Newspaper,
  contact: Mail,
  default: Building2,
};

type Card = {
  title: string;
  description: string;
  href?: string;
};

type InstitutionShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  cards?: readonly Card[];
  children?: React.ReactNode;
};

export default function InstitutionShell({
  eyebrow,
  title,
  description,
  icon: Icon = Building2,
  cards,
  children,
}: InstitutionShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#000,#050505_48%,#000)]" />
      <div className="pointer-events-none fixed -left-40 top-28 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.26em] text-yellow-200">
                <Icon size={17} />
                {eyebrow}
              </div>
              <h1 className="mt-8 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
                {title}
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-lg leading-8 text-white/70">{description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/institution/contact-institutionnel"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                >
                  Contact institutionnel
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white/80 transition hover:border-yellow-300/40 hover:text-yellow-200"
                >
                  Voir les partenaires
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}

      {cards ? (
        <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-yellow-300/[0.055]"
              >
                <h2 className="text-2xl font-black uppercase text-white">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {card.description}
                </p>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-200 transition hover:text-white"
                  >
                    Ouvrir
                    <ArrowRight size={14} />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.055] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
            Trust Center
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {institutionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 bg-black/35 p-4 transition hover:border-yellow-300/35 hover:bg-black/55"
              >
                <span className="text-sm font-black uppercase text-white">
                  {link.label}
                </span>
                <span className="mt-2 block text-xs leading-5 text-white/52">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
