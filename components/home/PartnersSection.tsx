const partners = [
  "UNION EUROPEENNE",
  "MANO PERFETTO",
  "VAL2EVENTS",
  "H & HAIR",
  "UNIVERSAL SELFCARE",
];

export default function PartnersSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/50">
            Official Partners
          </p>

          <h2 className="text-4xl font-black md:text-6xl">NOS PARTENAIRES</h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Festival Talent 2027 rassemble institutions, entreprises et
            organisations autour de la culture, de innovation et de la
            jeunesse africaine.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 [perspective:1200px] md:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner}
              className={`premium-card group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 ${
                partner === "UNION EUROPEENNE"
                  ? "border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/15 md:col-span-3"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex min-h-[180px] items-center justify-center p-10">
                <h3
                  className={`text-center font-black tracking-[0.15em] ${
                    partner === "UNION EUROPEENNE"
                      ? "text-3xl text-blue-200 md:text-5xl"
                      : "text-white/80"
                  }`}
                >
                  {partner}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
