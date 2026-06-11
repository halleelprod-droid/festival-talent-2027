import Image from "next/image";

export default function PreviousEditionSection() {
  const moments = [
    {
      title: "Conference de presse",
      subtitle: "Preparation officielle",
      image: "/images/previous/official.jpg",
    },
    {
      title: "Public & ambiance",
      subtitle: "Une communaute engagee",
      image: "/images/previous/public.jpg",
    },
    {
      title: "Performances live",
      subtitle: "Archives du premier festival",
      image: "/images/previous/scene.jpg",
    },
    {
      title: "Mode & creativite",
      subtitle: "Art, fashion et culture",
      image: "/images/previous/fashion.jpg",
    },
  ];

  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Archives
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            RETOUR SUR
            <br />
            LE PREMIER FESTIVAL
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-white/60">
            Decouvrez quelques moments marquants de la premiere edition :
            concerts, conferences, mode, rencontres et experiences uniques.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {moments.map((item) => (
            <div
              key={item.title}
              className="group relative h-[500px] overflow-hidden rounded-[32px] border border-white/10"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-10 left-10 right-10">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-yellow-300">
                  Festival Talent
                </p>

                <h3 className="mb-2 text-4xl font-black">{item.title}</h3>
                <p className="text-white/70">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
