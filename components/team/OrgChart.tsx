"use client";

import Image from "next/image";
import {
  Camera,
  Crown,
  Handshake,
  Landmark,
  Laptop,
  Music2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import PremiumCard from "@/components/ui/PremiumCard";
import {
  organisationPoles,
  type OrganisationPoleIconKey,
} from "@/data/organisation";

const iconMap: Record<OrganisationPoleIconKey, LucideIcon> = {
  crown: Crown,
  handshake: Handshake,
  laptop: Laptop,
  camera: Camera,
  music: Music2,
  landmark: Landmark,
  users: Users,
};

export default function OrgChart() {
  const head = organisationPoles.find(
    (pole) => pole.level === "direction-generale"
  );
  const directions = organisationPoles.filter(
    (pole) => pole.level === "direction"
  );

  return (
    <div className="mt-14">
      {/* SOMMET — Direction Générale */}
      {head && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <PremiumCard tone="gold" className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-yellow-300">
              <Crown size={30} aria-hidden="true" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              {head.title}
            </p>

            <h3 className="font-display mt-3 text-3xl uppercase text-white sm:text-4xl">
              {head.holder}
            </h3>

            <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white/70">
              {head.role}
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/62">
              {head.description}
            </p>
          </PremiumCard>
        </motion.div>
      )}

      {/* LIGNE DE CONNEXION */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        aria-hidden="true"
        className="mx-auto h-14 w-px origin-top bg-gradient-to-b from-[#C9A84C]/60 to-[#C9A84C]/15"
      />

      {/* DIRECTIONS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {directions.map((pole, index) => {
          const Icon = iconMap[pole.icon];

          return (
            <motion.div
              key={pole.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
              className="h-full"
            >
              <PremiumCard className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={22} aria-hidden="true" />
                  </div>

                  {pole.logo && (
                    <Image
                      src={pole.logo.src}
                      alt={pole.logo.alt}
                      width={110}
                      height={44}
                      className="h-9 w-auto object-contain"
                    />
                  )}
                </div>

                <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-yellow-300">
                  {pole.title}
                </p>

                <h3 className="font-display mt-3 text-2xl uppercase text-white">
                  {pole.holder}
                </h3>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-white/58">
                  {pole.role}
                </p>

                <p className="mt-4 flex-1 text-sm leading-7 text-white/62">
                  {pole.description}
                </p>
              </PremiumCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
