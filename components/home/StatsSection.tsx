export default function StatsSection() {
  const stats = [
    {
      value: "50K+",
      label: "Participants attendus",
    },
    {
      value: "20+",
      label: "Artistes & créateurs",
    },
    {
      value: "4",
      label: "Jours d’expérience",
    },
    {
      value: "15M+",
      label: "Portée digitale",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Festival Impact
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            UN IMPACT
            <br />
            INTERNATIONAL
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10 text-center hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-4">
                  {stat.value}
                </h3>

                <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}