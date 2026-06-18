"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    label: "ACCUEIL",
    href: "/fr",
  },
  {
    label: "PROGRAMME",
    href: "/programme",
  },
  {
    label: "ARTISTES",
    href: "/artists",
  },
  {
    label: "PARTENAIRES",
    href: "/partners",
  },
  {
    label: "TICKETS",
    href: "/tickets",
  },
  {
    label: "MEDIA",
    href: "/media",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/fr") {
      return pathname === "/" || pathname === "/fr";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <Link
          href="/fr"
          aria-label="Festival Talent - Accueil"
          className="group flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-16 w-28 overflow-hidden">
            <Image
              src="/images/festival-talent-logo.png"
              alt="Festival Talent"
              fill
              priority
              sizes="112px"
              className="object-contain transition duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs font-black uppercase tracking-[0.35em] transition duration-300 ${
                  active ? "text-yellow-300" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-3 left-0 h-[2px] rounded-full bg-yellow-400 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/tickets"
            className="rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-9 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-2xl shadow-yellow-900/30 transition duration-300 hover:scale-105 hover:shadow-yellow-700/40"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-yellow-400/40 hover:text-yellow-300 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl border px-5 py-4 text-sm font-black uppercase tracking-[0.25em] transition ${
                    active
                      ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                      : "border-white/10 bg-white/[0.03] text-white/75 hover:border-yellow-400/30 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/tickets"
              onClick={() => setIsOpen(false)}
              className="mt-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.25em] text-black"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}