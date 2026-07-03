'use client';

import { motion } from 'framer-motion';

interface EventItem {
  _id: string;
  title: string;
  location: string;
  date: string;
  category: string;
}

interface ProgrammePreviewProps {
  events: EventItem[];
}

export default function ProgrammePreview({
  events
}: ProgrammePreviewProps) {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            Programme
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            L’expérience
            <br />
            en live.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
            De janvier a avril 2027, pre-selections officielles, showcases et
            moments exclusifs relient Paris et Rome autour des talents retenus.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative mt-24">
          {/* LINE */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#C9A84C] via-white/20 to-transparent md:block" />

          <div className="space-y-10">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{
                  opacity: 0,
                  y: 80
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
                className="relative md:pl-20"
              >
                {/* DOT */}
                <div className="absolute left-[18px] top-10 hidden h-4 w-4 rounded-full bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.8)] md:block" />

                {/* CARD */}
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#C9A84C]/30">
                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

                  <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    {/* LEFT */}
                    <div>
                      <span className="uppercase tracking-[0.3em] text-xs text-[#C9A84C]">
                        {event.category}
                      </span>

                      <h3 className="mt-4 text-3xl font-black">
                        {event.title}
                      </h3>

                      <p className="mt-4 text-zinc-400">
                        {event.location}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-start lg:items-end">
                      <span className="text-2xl font-black">
                        {new Date(
                          event.date
                        ).toLocaleDateString(
                          'fr-FR',
                          {
                            day: 'numeric',
                            month: 'long'
                          }
                        )}
                      </span>

                      <p className="mt-2 uppercase tracking-[0.3em] text-xs text-zinc-400">
                        FT2027 LIVE EXPERIENCE
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
