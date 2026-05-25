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
              className={`rounded-3xl border transition-all duration-300 hover:scale-[1.03]
              ${
                partner === "UNION EUROPÉENNE"
                  ? "border-blue-500/40 bg-blue-500/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="p-10 flex items-center justify-center min-h-[180px]">
                <h3
                  className={`text-center font-bold tracking-[0.15em]
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