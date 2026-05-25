'use client';

import { useState } from 'react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  Plus,
  Minus
} from 'lucide-react';

import {
  faqItems
} from '@/components/sections/constants';

export default function FAQSection() {
  const [active, setActive] =
    useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            FAQ
          </p>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl">
            Questions
            <br />
            Fréquentes.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Toutes les informations importantes concernant
            l’expérience FT2027.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="mt-24 flex flex-col gap-6">
          {faqItems.map((faq, index) => {
            const isOpen =
              active === index;

            return (
              <motion.div
                key={faq.question}
                initial={{
                  opacity: 0,
                  y: 50
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 1
                }}
                viewport={{ once: true }}
                className="
                  glass
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                "
              >
                {/* BUTTON */}
                <button
                  onClick={() =>
                    setActive(
                      isOpen
                        ? null
                        : index
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    px-8
                    py-7
                    text-left
                  "
                >
                  <h3 className="text-xl font-semibold">
                    {faq.question}
                  </h3>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.03]
                    "
                  >
                    {isOpen ? (
                      <Minus
                        size={18}
                      />
                    ) : (
                      <Plus
                        size={18}
                      />
                    )}
                  </div>
                </button>

                {/* CONTENT */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: 0.4
                      }}
                    >
                      <div className="px-8 pb-8 leading-relaxed text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}