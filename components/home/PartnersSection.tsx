export default function PartnersSection() {
  const partners = [
    "UNION EUROPÉENNE",
    "RTS",
    "WAVE",
    "ORANGE",
    "TRACE",
    "AIR SÉNÉGAL",
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Official Partners
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            NOS PARTENAIRES
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Festival Talent 2027 rassemble institutions, entreprises et
            organisations majeures autour de la culture, de l’innovation et de
            la jeunesse africaine.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2
              ${
                partner === "UNION EUROPÉENNE"
                  ? "border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/15"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-10 flex items-center justify-center min-h-[180px]">
                <h3
                  className={`text-center font-black tracking-[0.15em]
                  ${
                    partner === "UNION EUROPÉENNE"
                      ? "text-blue-300 text-xl"
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