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
        <Link href="/fr">
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
              className="transition hover:text-yellow-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/tickets"
          className="hidden rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-yellow-400 md:block"
        >
          Reserver
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="flex flex-col space-y-6 px-6 py-6 uppercase tracking-[0.2em] text-white">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/tickets"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-yellow-400 py-3 text-center font-bold text-black"
            >
              Reserver
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
