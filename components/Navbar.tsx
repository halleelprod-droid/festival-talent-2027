"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/fr">
          <Image
            src="/images/festival-talent-logo.png"
            alt="Festival Talent"
            width={240}
            height={90}
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.3em] text-white">
          <Link href="/fr" className="hover:text-yellow-400 transition">
            Accueil
          </Link>

          <Link href="/programme" className="hover:text-yellow-400 transition">
            Programme
          </Link>

          <Link href="/partners" className="hover:text-yellow-400 transition">
            Partenaires
          </Link>

          <Link href="/tickets" className="hover:text-yellow-400 transition">
            Tickets
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/tickets"
          className="hidden md:block rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-yellow-400"
        >
          Réserver
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <div className="flex flex-col px-6 py-6 space-y-6 text-white uppercase tracking-[0.2em]">
            <Link href="/fr" onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>

            <Link href="/programme" onClick={() => setMenuOpen(false)}>
              Programme
            </Link>

            <Link href="/partners" onClick={() => setMenuOpen(false)}>
              Partenaires
            </Link>

            <Link href="/tickets" onClick={() => setMenuOpen(false)}>
              Tickets
            </Link>

            <Link
              href="/tickets"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-yellow-400 text-black text-center py-3 font-bold"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}