"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin } from "lucide-react";

import { futureAfricaMarkers } from "@/data/experience";

export default function AfricaTomorrowSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.13),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <Globe2 size={16} aria-hidden="true" />
            L&apos;Afrique de demain.
          </p>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Une vision qui part du Senegal et regarde plus loin.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/65">
            Festival Talent ambitionne d&apos;accompagner les talents du Senegal,
            puis de construire progressivement une dynamique ouverte a toute
            l&apos;Afrique creative. C&apos;est une vision, pas une annonce : elle se
            construira avec les partenaires, les regions, les talents et le
            temps.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative min-h-96 overflow-hidden rounded-lg border border-yellow-400/25 bg-yellow-400/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="absolute inset-8 rounded-[3rem] border border-white/10 bg-black/35" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/25 bg-yellow-400/10" />
          <div className="relative grid min-h-80 place-items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/35 bg-black text-yellow-300">
              <MapPin size={34} aria-hidden="true" />
            </div>
            {futureAfricaMarkers.map((marker, index) => (
              <motion.div
                key={marker}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`absolute rounded-full border border-yellow-400/25 bg-black/70 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300 backdrop-blur ${
                  index === 0
                    ? "left-1/2 top-4 -translate-x-1/2"
                    : index === 1
                      ? "right-4 top-1/3"
                      : index === 2
                        ? "bottom-8 right-12"
                        : index === 3
                          ? "bottom-16 left-8"
                          : "left-4 top-1/3"
                }`}
              >
                {marker}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
