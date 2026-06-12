'use client';

import FadeIn from '../ui/FadeIn';
import RevealText from './RevealText';

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <FadeIn className="max-w-5xl">
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            About FT2027
          </span>

          <RevealText
            text="Une nouvelle vision culturelle."
            className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]"
          />

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Festival Talent 2027 prepare une tournee europeenne entre Paris et
            Rome, de janvier a avril 2027, precedee par des pre-selections
            officielles dans plusieurs disciplines : danse, musique, mode, art,
            entrepreneuriat, technologie, culture urbaine et sports mecaniques.
          </p>
        </FadeIn>

        {/* GRID */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: 'Culture',
              text: 'Un espace où les nouvelles générations créatives se rencontrent.'
            },
            {
              title: 'Innovation',
              text: 'Des expériences immersives pensées comme une plateforme du futur.'
            },
            {
              title: 'Impact',
              text: 'Un festival construit pour connecter les talents selectionnes a une scene europeenne.'
            }
          ].map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.08}
            >
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl transition duration-500 hover:-translate-y-2">
                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#C9A84C15,transparent_60%)]" />

                <div className="relative z-10">
                  <div className="h-3 w-3 rounded-full bg-[#C9A84C]" />

                  <h3 className="mt-8 text-4xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-6 leading-relaxed text-zinc-400">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* QUOTE */}
        <FadeIn delay={0.3}>
          <div className="mt-24 text-center">
            <p className="mx-auto max-w-4xl text-2xl font-light leading-relaxed text-zinc-300 md:text-4xl">
              “Créer une expérience capable de connecter la culture,
              la musique et le futur.”
            </p>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Festival Talent 2027
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
