"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, ShieldCheck, Sparkles } from "lucide-react";

export default function MajorPartnerSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_38%),linear-gradient(to_bottom,#000,#050505,#000)]" />
      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <ShieldCheck size={16} />
            Partenaire officiel majeur
          </div>

          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-7xl">
            Un festival porté par
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              des partenaires d’impact
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 s’appuie sur des partenaires engagés pour
            soutenir la jeunesse, la culture, l’innovation, l’entrepreneuriat,
            la créativité et le rayonnement du Sénégal à l’international.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.12] via-white/[0.05] to-white/[0.02] p-8 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl lg:p-12"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-white/10 bg-black/45 p-8 backdrop-blur-xl">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 shadow-2xl shadow-yellow-900/30">
                  <Globe2 size={42} />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                  Premier partenaire officiel
                </p>

                <h3 className="mt-4 text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  Union
                  <span className="block text-yellow-300">Européenne</span>
                </h3>
              </div>
            </div>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                <Sparkles size={15} />
                Vision institutionnelle
              </p>

              <h3 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                Un engagement fort pour la jeunesse, la culture et l’innovation.
              </h3>

              <p className="mt-5 text-base leading-8 text-white/65">
                La présence de l’Union Européenne comme partenaire officiel
                majeur renforce la dimension institutionnelle, internationale et
                sociale de Festival Talent 2027. Cette collaboration met en
                avant l’impact du festival auprès des jeunes talents, créateurs,
                entrepreneurs et acteurs culturels.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Jeunesse",
                    text: "Soutien aux talents et nouvelles générations.",
                  },
                  {
                    title: "Culture",
                    text: "Valorisation des expressions créatives africaines.",
                  },
                  {
                    title: "Innovation",
                    text: "Ouverture vers la technologie et l’entrepreneuriat.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: "Entreprises",
              text: "Associez votre marque à un événement culturel ambitieux, jeune et international.",
            },
            {
              icon: ShieldCheck,
              title: "Institutions",
              text: "Soutenez un projet à fort impact social, culturel et économique.",
            },
            {
              icon: Globe2,
              title: "Sponsors internationaux",
              text: "Bénéficiez d’une visibilité premium entre Sénégal, Afrique et Europe.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:border-yellow-400/45 hover:bg-yellow-400/[0.06]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-black uppercase text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}