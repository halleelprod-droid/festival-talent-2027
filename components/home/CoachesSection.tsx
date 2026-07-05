import Image from "next/image";
import { ArrowRight, Brain, Mic2, Sparkles } from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { lifeCoaches } from "@/data/coaches";

export default function CoachesSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Accompagnement humain"
          icon={Sparkles}
          title={
            <>
              Nos Coachs
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                & Mentors
              </span>
            </>
          }
          description="Festival Talent 2027 accompagne les jeunes talents au-dela de la scene, avec un encadrement humain autour de la confiance, de la discipline, du leadership et du developpement personnel."
          className="max-w-5xl"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <PremiumCard tone="gold" className="p-7 sm:p-9">
            <Brain className="text-yellow-300" size={34} />
            <h3 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Un accompagnement humain
            </h3>
            <p className="mt-5 text-base leading-8 text-white/68">
              Festival Talent 2027 ne se limite pas a la competition. Le projet
              accompagne les talents dans leur confiance, leur discipline, leur
              posture professionnelle, leur communication, leur leadership et
              leur vision d&apos;avenir.
            </p>
            <p className="mt-5 text-sm leading-7 text-white/58">
              Les coachs de vie jouent un role essentiel dans la preparation
              mentale, la motivation, la confiance en soi et l&apos;accompagnement
              des candidats tout au long du parcours Festival Talent.
            </p>

            <div className="mt-8">
              <GradientButton href="/mentors" icon={ArrowRight}>
                Decouvrir les mentors
              </GradientButton>
            </div>
          </PremiumCard>

          <div className="grid gap-5 md:grid-cols-2">
            {lifeCoaches.map((coach) => (
              <PremiumCard key={coach.name} className="group">
                <article className="flex h-full flex-col">
                  <div className="relative h-72 overflow-hidden bg-zinc-950">
                    {coach.image ? (
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#050505,#17120a,#050505)]">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-3xl font-black text-yellow-300">
                          {coach.initials}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300 backdrop-blur">
                      <Mic2 size={13} />
                      Coach officiel
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-black uppercase text-white">
                      {coach.name}
                    </h3>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-yellow-300">
                      {coach.role}
                    </p>
                    <p className="mt-5 flex-1 text-sm leading-7 text-white/62">
                      {coach.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {coach.focus.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </PremiumCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
