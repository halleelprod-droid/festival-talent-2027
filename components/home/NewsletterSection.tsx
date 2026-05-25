'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          '/api/newsletter',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              email
            })
          }
        );

      if (response.ok) {
        setSuccess(true);
        setEmail('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{
            once: true
          }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Newsletter
          </p>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-[0.9]
              tracking-[-0.06em]
              md:text-7xl
            "
          >
            Stay Connected
            <br />
            To FT2027.
          </h2>

          <p
            className="
              mx-auto
              mt-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Recevez les annonces officielles,
            artistes, tickets et expériences
            exclusives du festival.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              mx-auto
              mt-16
              flex
              max-w-2xl
              flex-col
              gap-5
              md:flex-row
            "
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Votre email"
              className="
                glass
                h-16
                flex-1
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-8
                text-white
                outline-none
                placeholder:text-zinc-500
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-full
                bg-[#C9A84C]
                px-10
                py-5
                font-semibold
                text-black
                transition
                hover:scale-105
                hover:shadow-[0_0_35px_rgba(201,168,76,0.45)]
              "
            >
              {loading
                ? 'Loading...'
                : 'S’inscrire'}
            </button>
          </form>

          {/* SUCCESS */}
          {success && (
            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
                mt-6
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#C9A84C]
              "
            >
              Inscription réussie.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}