'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  Menu,
  X
} from 'lucide-react';

import {
  navigationLinks
} from '@/config/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 40
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 1
        }}
        className={`
          fixed
          left-1/2
          top-6
          z-[999]
          w-[95%]
          max-w-7xl
          -translate-x-1/2
          rounded-full
          border
          transition-all
          duration-500
          ${
            scrolled
              ? `
                border-white/10
                bg-black/70
                backdrop-blur-2xl
              `
              : `
                border-white/5
                bg-white/[0.03]
                backdrop-blur-xl
              `
          }
        `}
      >
        <div className="flex items-center justify-between px-8 py-5">
          {/* LOGO */}
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

              <span className="text-sm font-black uppercase tracking-[0.35em] text-white">
                FT2027
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navigationLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{
                  y: -2
                }}
              >
                <Link
                  href={link.href}
                  className="
                    relative
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-zinc-300
                    transition
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/tickets">
              <button
                className="
                  rounded-full
                  bg-[#C9A84C]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:scale-105
                "
              >
                Réserver
              </button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              text-white
              lg:hidden
            "
          >
            {open ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="
              fixed
              inset-0
              z-[998]
              flex
              flex-col
              items-center
              justify-center
              gap-10
              bg-black
              lg:hidden
            "
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() =>
                  setOpen(false)
                }
                className="
                  text-3xl
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-white
                "
              >
                {link.label}
              </Link>
            ))}

            <Link href="/tickets">
              <button
                className="
                  mt-6
                  rounded-full
                  bg-[#C9A84C]
                  px-10
                  py-5
                  font-semibold
                  text-black
                "
              >
                Réserver maintenant
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
