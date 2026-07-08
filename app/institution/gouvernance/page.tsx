import type { Metadata } from "next";

import InstitutionShell, { institutionIcons } from "@/components/institution/InstitutionShell";
import { governanceMembers } from "@/data/trust-center";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Gouvernance | Festival Talent 2027",
  description:
    "Découvrez la gouvernance Festival Talent : fondatrice, partenariats, direction digitale, partenaires danse et coachs.",
  path: "/institution/gouvernance",
});

export default function GovernancePage() {
  return (
    <InstitutionShell
      eyebrow="Notre Gouvernance"
      title="Une organisation lisible et responsable"
      description="Festival Talent structure progressivement sa gouvernance afin de donner aux partenaires, institutions et candidats une vision claire des responsabilités, des missions et des référents du projet."
      icon={institutionIcons.governance}
    >
      <section className="relative px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.055] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-200">
              Organigramme
            </p>
            <div className="mt-8 grid gap-4">
              {governanceMembers.map((member, index) => (
                <article
                  key={member.name}
                  className="grid gap-5 rounded-xl border border-white/10 bg-black/35 p-5 md:grid-cols-[0.45fr_1fr]"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-200/70">
                      Niveau {index + 1}
                    </p>
                    <h2 className="mt-3 text-2xl font-black uppercase text-white">
                      {member.name}
                    </h2>
                    <p className="mt-2 text-sm font-bold text-yellow-200">
                      {member.role}
                    </p>
                    {"subtitle" in member && member.subtitle ? (
                      <p className="mt-1 text-sm text-white/55">
                        {member.subtitle}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                      Mission
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {member.mission}
                    </p>
                    <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-white/50">
                      Biographie
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {member.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </InstitutionShell>
  );
}
