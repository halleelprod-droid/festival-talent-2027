"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/fr" className="flex items-center">
          <Image
            src="/images/festival-talent-logo.png"
            alt="Festival Talent"
            width={240}
            height={90}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-[0.3em] text-white md:flex">
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

        <Link
          href="/tickets"
          className="rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-yellow-400"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}