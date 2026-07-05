import type { Metadata } from "next";
import Image from "next/image";
import { Brain, HandHeart, Mic2, ShieldCheck, Sparkles } from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { lifeCoaches } from "@/data/coaches";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Mentors & Coachs",
  description:
    "Decouvrez les coachs et mentors qui accompagnent les talents du Festival Talent 2027 dans leur developpement personnel, leur motivation et leur preparation.",
  path: "/mentors",
});

const pillars = [
  {
    title: "Developpement personnel",
    text: "Renforcer la confiance, clarifier les objectifs et apprendre a avancer avec une vision stable.",
    icon: Brain,
  },
  {
    title: "Motivation & discipline",
    text: "Construire des habitudes solides pour tenir le rythme des pre-selections et des etapes du festival.",
    icon: ShieldCheck,
  },
  {
    title: "Leadership & parole",
    text: "Travailler la posture, la communication, la prise de parole et la presentation professionnelle.",
    icon: Mic2,
  },
];

export default function MentorsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(127,29,29,0.12),transparent_38%),linear-gradient(to_bottom,#000,rgba(9,7,2,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Mentors & coachs"
            icon={HandHeart}
            align="center"
            className="max-w-5xl"
            title={
              <>
                L&apos;encadrement humain
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  derriere les talents
                </span>
              </>
            }
            description="Festival Talent 2027 accompagne les candidats dans leur confiance en soi, leur discipline, leur leadership, leur motivation et leur posture professionnelle."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GradientButton href="/preselections">
              S&apos;inscrire aux pre-selections
            </GradientButton>
            <GradientButton href="/activites" variant="outline">
              Decouvrir les activites
            </GradientButton>
            <GradientButton href="/contact" variant="outline">
              Contacter l&apos;equipe
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {lifeCoaches.map((coach) => (
            <PremiumCard key={coach.name} tone="gold" className="group">
              <article className="grid h-full md:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-80 overflow-hidden bg-zinc-950">
                  {coach.image ? (
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full min-h-80 items-center justify-center bg-[linear-gradient(135deg,#050505,#17120a,#050505)]">
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-4xl font-black text-yellow-300">
                        {coach.initials}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="flex flex-col p-7 sm:p-8">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                    <Sparkles size={13} />
                    Coach & mentor
                  </span>

                  <h2 className="mt-6 text-3xl font-black uppercase text-white">
                    {coach.name}
                  </h2>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                    {coach.role}
                  </p>
                  <p className="mt-5 flex-1 text-sm leading-7 text-white/65">
                    {coach.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {coach.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/70"
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
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto mb-10 max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-10">
            <HandHeart className="mx-auto text-yellow-300" size={34} />
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Pourquoi l&apos;accompagnement humain compte
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68">
              La scene revele le talent, mais l&apos;accompagnement construit la
              vision. Les coachs et mentors aident les candidats a developper
              confiance, discipline, leadership, communication et posture
              professionnelle.
            </p>
          </PremiumCard>
        </div>

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <PremiumCard key={pillar.title} className="p-7">
                <Icon className="text-yellow-300" size={30} />
                <h3 className="mt-5 text-xl font-black uppercase text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {pillar.text}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
