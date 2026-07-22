"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { adminFooterLink, footerNavigationGroups } from "@/config/navigation";
import { socialLinks } from "@/config/social";

const officialPartners = [
  "Union Européenne - Partenaire Officiel Majeur",
  "Sen Influenceurs - Partenaire Média & Influence Officiel",
  "PIN EVENTS - Partenaire Événementiel, Production & Relations Institutionnelles",
  "Agence Diassnor - Responsable du Pôle Danse",
  "Centre Culturel Blaise Senghor - Partenaire Danse",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C08,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Link
              href="/fr"
              className="inline-flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]"
            >
              <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />
              <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
                FT2027
              </h2>
            </Link>

            <p className="mt-8 max-w-md leading-relaxed text-zinc-400">
              Festival Talent 2027 réunit musique, mode, culture, innovation et
              jeunesse dans une expérience institutionnelle internationale.
            </p>

            <div className="mt-10">
              <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
                Partenaires confirmés
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {officialPartners.map((partner) => (
                  <p key={partner} className="text-sm leading-6 text-zinc-400">
                    {partner}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            viewport={{ once: true }}
            aria-label="Navigation de pied de page"
            className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          >
            {footerNavigationGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#C9A84C]">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={`${group.title}-${link.href}`}
                      href={link.href}
                      className="w-fit text-sm text-zinc-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
              <p>© 2027 Festival Talent. Tous droits réservés.</p>
              <p>Saison nationale 2026–2027 · Sénégal</p>
              <Link
                href={adminFooterLink.href}
                className="text-zinc-600 transition hover:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]"
              >
                {adminFooterLink.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
