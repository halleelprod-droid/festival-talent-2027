import Image from "next/image";

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
  ];

  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Archives line-up
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            ARTISTES
            <br />
            DU PREMIER FESTIVAL
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-white/60">
            Cette section presente uniquement des archives de la premiere
            edition, distinctes des artistes confirmes pour FT2027.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-8 left-6 right-6">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-yellow-300">
                  Archive Festival Talent
                </p>

                <h3 className="text-2xl font-black leading-tight">
                  {artist.name}
                </h3>

                <p className="mt-2 text-white/60">{artist.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
