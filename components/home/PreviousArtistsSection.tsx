export default function PreviousArtistsSection() {
  const artists = [
    {
      name: "DIP DOUNDOU GUISS",
      role: "Performance live",
      image: "/images/previous/dip.jpg",
    },
    {
      name: "ZAIRAH DIAMANT NOIRE",
      role: "Live band & showcase",
      image: "/images/previous/zairah.jpg",
    },
    {
      name: "DJ YOU",
      role: "DJ set officiel",
      image: "/images/previous/djyou.jpg",
    },
    {
      name: "ARTISTES INVITÉS",
      role: "Scène découverte",
      image: "/images/previous/guest.jpg",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Previous Line-up
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            ARTISTES
            <br />
            DÉJÀ PASSÉS
          </h2>

          <p className="mt-8 text-white/60 max-w-3xl mx-auto text-lg">
            Des performances live, des shows mémorables et des artistes qui ont
            déjà marqué l’histoire du Festival Talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-8 left-6 right-6">
                <p className="uppercase tracking-[0.3em] text-xs text-yellow-300 mb-3">
                  Festival Talent
                </p>

                <h3 className="text-2xl font-black leading-tight">
                  {artist.name}
                </h3>

                <p className="mt-2 text-white/60">
                  {artist.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}