"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clapperboard,
  Handshake,
  Home,
  Menu,
  Mic2,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navLinks: NavLink[] = [
  {
    label: "Accueil",
    href: "/fr",
    icon: Home,
  },
  {
    label: "Programme",
    href: "/programme",
    icon: CalendarDays,
  },
  {
    label: "Pré-sélections",
    href: "/preselections",
    icon: Sparkles,
  },
  {
    label: "Artistes",
    href: "/artists",
    icon: Mic2,
  },
  {
    label: "Partenaires",
    href: "/partners",
    icon: Handshake,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Media",
    href: "/media",
    icon: Clapperboard,
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
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-yellow-400/20 bg-black/75 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:px-5">
        <Link
          href="/fr"
          aria-label="Festival Talent - Accueil"
          onClick={() => setIsOpen(false)}
          className="group relative flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:border-yellow-400/40"
        >
          <div className="relative h-12 w-20 overflow-hidden sm:h-14 sm:w-24">
            <Image
              src="/images/festival-talent-logo.png"
              alt="Festival Talent"
              fill
              priority
              sizes="96px"
              className="object-contain transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="hidden h-8 w-px bg-yellow-400/25 xl:block" />

          <div className="hidden xl:block">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300">
              Festival
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.25em] text-white/70">
              Talent 2027
            </p>
          </div>
        </Link>

        <div className="relative hidden items-center rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-2 shadow-inner shadow-white/5 lg:flex">
          <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10" />

          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative z-10 flex items-center gap-2 rounded-[1.2rem] px-3 py-3 text-[10px] font-black uppercase tracking-[0.18em] transition duration-300 xl:px-4 ${
                  active
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-900/30"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-yellow-300"
                }`}
              >
                <Icon
                  size={15}
                  className={`transition duration-300 ${
                    active ? "text-black" : "text-yellow-300/80"
                  }`}
                />
                <span>{link.label}</span>

                {!active && (
                  <span className="absolute inset-x-4 -bottom-1 h-px scale-x-0 bg-yellow-400/70 transition duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/tickets"
            className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-7 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-black shadow-2xl shadow-yellow-900/40 transition duration-300 hover:scale-105 xl:px-9 xl:text-xs"
          >
            <span className="relative z-10">Réserver</span>
            <span className="absolute inset-0 translate-x-[-120%] bg-white/40 blur-xl transition duration-700 hover:translate-x-[120%]" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-12 w-12 items-center justify-center rounded-[1.3rem] border border-yellow-400/20 bg-yellow-400/10 text-yellow-300 transition hover:bg-yellow-400 hover:text-black lg:hidden"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-black/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-[1.4rem] border px-5 py-4 text-sm font-black uppercase tracking-[0.18em] transition ${
                    active
                      ? "border-yellow-400/40 bg-yellow-400 text-black"
                      : "border-white/10 bg-white/[0.04] text-white/75 hover:border-yellow-400/40 hover:text-yellow-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={active ? "text-black" : "text-yellow-300"}
                    />
                    {link.label}
                  </span>

                  <span
                    className={`h-2 w-2 rounded-full ${
                      active ? "bg-black" : "bg-yellow-400/60"
                    }`}
                  />
                </Link>
              );
            })}

            <Link
              href="/tickets"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-[1.5rem] bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-6 py-5 text-center text-sm font-black uppercase tracking-[0.25em] text-black"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}