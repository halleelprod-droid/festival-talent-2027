export default function ImpactSection() {
  const stats = [
    {
      value: "1000+",
      label: "Participants",
    },
    {
      value: "20+",
      label: "Artistes & intervenants",
    },
    {
      value: "4",
      label: "Partenaires officiels",
    },
    {
      value: "50K+",
      label: "Personnes touchées en ligne",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Festival Impact
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            IMPACT DE
            <br />
            L'ÉDITION 2026
          </h2>

          <p className="mt-8 text-white/60 max-w-3xl mx-auto">
            Des résultats concrets qui démontrent le potentiel de croissance du
            Festival Talent.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center"
            >
              <h3 className="text-5xl font-black text-yellow-300">
                {stat.value}
              </h3>

              <p className="mt-4 text-white/60 uppercase tracking-[0.2em] text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}