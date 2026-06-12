"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Accueil", href: "/fr" },
  { label: "Programme", href: "/programme" },
  { label: "Partenaires", href: "/partners" },
  { label: "Tickets", href: "/tickets" },
  { label: "Media", href: "/media" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/fr" aria-label="Retour à l'accueil">
          <Image
            src="/images/festival-talent-logo.png"
            alt="Festival Talent"
            width={240}
            height={90}
            className="h-16 w-auto object-contain md:h-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.22em] text-white md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition duration-300 hover:text-[#C9A84C]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/tickets"
          className="hidden rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-black uppercase tracking-wide text-black shadow-[0_0_25px_rgba(201,168,76,0.35)] transition duration-300 hover:scale-105 hover:bg-white hover:text-black md:block"
        >
          Réserver
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-xl transition hover:border-[#C9A84C] hover:text-[#C9A84C] md:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col space-y-6 px-6 py-7 uppercase tracking-[0.2em] text-white">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold transition hover:text-[#C9A84C]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/tickets"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-[#C9A84C] py-4 text-center text-sm font-black uppercase tracking-wide text-black shadow-[0_0_25px_rgba(201,168,76,0.35)] transition hover:bg-white hover:text-black"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}