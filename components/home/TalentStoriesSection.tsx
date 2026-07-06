"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { talentStories } from "@/data/experience";

export default function TalentStoriesSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.12),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <Sparkles size={16} aria-hidden="true" />
            Talent Stories
          </p>
          <h2 className="mt-6 text-4xl font-black uppercase leading-tight sm:text-6xl">
            Des histoires qui inspirent.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
            Ces parcours fictifs illustrent une verite simple : un talent peut
            commencer petit, puis changer de dimension lorsqu&apos;il rencontre le
            bon cadre.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {talentStories.map((story, index) => {
            const Icon = story.icon;

            return (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className="group rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/45"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/25 bg-black/45 text-yellow-300 transition group-hover:scale-105">
                  <Icon size={28} aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                  {story.title}
                </p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                  {story.profile}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/62">
                  {story.story}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
