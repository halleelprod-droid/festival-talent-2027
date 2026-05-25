"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/fr"
          className="text-xl md:text-2xl font-black tracking-[0.2em]"
        >
          FT2027
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
          <Link href="/fr" className="hover:text-white/60 transition">
            Accueil
          </Link>

          <Link href="/programme" className="hover:text-white/60 transition">
            Programme
          </Link>

          <Link href="/partners" className="hover:text-white/60 transition">
            Partenaires
          </Link>

          <Link href="/tickets" className="hover:text-white/60 transition">
            Tickets
          </Link>
        </nav>

        <Link
          href="/tickets"
          className="px-5 py-3 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition"
        >
          Réserver
        </Link>
      </div>
    </header>
  );
}