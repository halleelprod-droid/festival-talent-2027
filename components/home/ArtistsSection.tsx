export default function ArtistsSection() {
  const artists = [
    "YOUSSOU NDOUR",
    "SAMBA PEUZZY",
    "SIDIKI DIABATÉ",
    "SOPRANO",
    "AMADEUS",
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Official Line-up
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            ARTISTES CONFIRMÉS
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Une programmation forte réunissant des artistes majeurs du Sénégal,
            de l’Afrique et de la scène internationale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 min-h-[220px] flex items-end hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative z-10 text-3xl font-black group-hover:translate-x-2 transition-all duration-300">
                {artist}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}