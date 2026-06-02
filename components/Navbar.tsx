"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/fr" className="flex items-center">
          <Image
            src="/images/festival-talent-logo.jpeg"
            alt="Festival Talent"
            width={170}
            height={70}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-[0.3em] text-white md:flex">
          <Link href="/fr" className="hover:text-white/60">
            Accueil
          </Link>

          <Link href="/programme" className="hover:text-white/60">
            Programme
          </Link>

          <Link href="/partners" className="hover:text-white/60">
            Partenaires
          </Link>

          <Link href="/tickets" className="hover:text-white/60">
            Tickets
          </Link>
        </nav>

        <Link
          href="/tickets"
          className="rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-105"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}