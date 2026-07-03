'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { adminFooterLink, footerNavigationLinks } from '@/config/navigation';
import { socialLinks } from '@/config/social';
import { platformFooterLinks } from '@/data/platform';

const officialPartners = [
  'Union Européenne - Partenaire Officiel Majeur',
  'Sen Influenceurs - Partenaire Média & Influence Officiel',
  'PIN EVENTS - Partenaire Événementiel, Production & Relations Institutionnelles',
  'Val2Events - Partenaire associé',
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C08,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        {/* TOP */}
        <div className="grid gap-16 lg:grid-cols-4">
          {/* BRAND */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 1
            }}
            viewport={{
              once: true
            }}
          >
            <Link href="/">
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
                  FT2027
                </h2>
              </div>
            </Link>

            <p className="mt-8 max-w-md leading-relaxed text-zinc-400">
              Festival Talent 2027 réunit musique,
              mode, culture, innovation et jeunesse
              dans une expérience immersive internationale.
            </p>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1,
              duration: 1
            }}
            viewport={{
              once: true
            }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
              Navigation
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {footerNavigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-zinc-300
                    transition
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* PARTNERS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.16,
              duration: 1
            }}
            viewport={{
              once: true
            }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
              Partenaires
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {officialPartners.map((partner) => (
                <p
                  key={partner}
                  className="text-sm leading-6 text-zinc-300"
                >
                  {partner}
                </p>
              ))}
            </div>
          </motion.div>

          {/* SOCIALS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2,
              duration: 1
            }}
            viewport={{
              once: true
            }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A84C]">
              Socials
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-fit
                    text-zinc-300
                    transition
                    hover:text-white
                  "
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C9A84C]">
                Plateforme
              </p>

              <div className="mt-5 flex flex-col gap-4">
                {platformFooterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-20
            flex
            flex-col
            gap-6
            border-t
            border-white/10
            pt-8
            text-sm
            text-zinc-400
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © 2027 Festival Talent. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <p>
              Paris - Rome - Europe
            </p>

            <Link
              href={adminFooterLink.href}
              className="text-zinc-600 transition hover:text-zinc-400"
            >
              {adminFooterLink.label}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
