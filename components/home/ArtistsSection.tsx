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
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-10 min-h-[220px] flex items-end hover:bg-white/[0.06] transition-all duration-300"
            >
              <h3 className="text-3xl font-black group-hover:translate-x-2 transition-all duration-300">
                {artist}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}