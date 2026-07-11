'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

import {
  moreNavigationLinks,
  primaryNavigationLinks
} from '@/config/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [moreOpen, setMoreOpen] =
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
          top-3
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
        <div className="flex min-h-16 items-center justify-between px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
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
          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
            {primaryNavigationLinks.map((link) => (
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
                    text-xs
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

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setMoreOpen(!moreOpen)
                }
                aria-expanded={moreOpen}
                aria-controls="desktop-more-menu"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-zinc-300
                  transition
                  hover:text-white
                "
              >
                Plus
                <ChevronDown
                  size={14}
                  className={`transition ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    id="desktop-more-menu"
                    initial={{
                      opacity: 0,
                      y: 8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: 8
                    }}
                    className="
                      absolute
                      right-0
                      top-10
                      w-56
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/90
                      p-2
                      shadow-2xl
                      shadow-black/50
                      backdrop-blur-xl
                    "
                  >
                    {moreNavigationLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() =>
                          setMoreOpen(false)
                        }
                        className="
                          block
                          rounded-xl
                          px-4
                          py-3
                          text-xs
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-zinc-300
                          transition
                          hover:bg-white/[0.06]
                          hover:text-yellow-300
                        "
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              overflow-y-auto
              overscroll-contain
              bg-black
              px-4
              pb-8
              pt-24
              lg:hidden
            "
          >
            {[...primaryNavigationLinks, ...moreNavigationLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() =>
                  setOpen(false)
                }
                className="
                  flex
                  min-h-11
                  w-full
                  max-w-md
                  items-center
                  rounded-xl
                  px-4
                  text-base
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-white
                "
              >
                {link.label}
              </Link>
            ))}

            <Link href="/tickets" onClick={() => setOpen(false)} className="w-full max-w-md">
              <button
                className="
                  mt-2
                  w-full
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
