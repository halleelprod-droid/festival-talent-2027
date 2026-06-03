export default function PreviousEditionSection() {
  const moments = [
    {
      title: "Conférence de presse",
      subtitle: "Préparation officielle",
      image: "/images/previous/official.jpg",
    },
    {
      title: "Public & Ambiance",
      subtitle: "Une communauté engagée",
      image: "/images/previous/public.jpg",
    },
    {
      title: "Performances Live",
      subtitle: "Des artistes exceptionnels",
      image: "/images/previous/scene.jpg",
    },
    {
      title: "Mode & Créativité",
      subtitle: "Art • Fashion • Culture",
      image: "/images/previous/fashion.jpg",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-yellow-300 uppercase tracking-[0.4em] text-sm mb-4">
            Previous Edition
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            RETOUR SUR
            <br />
            L'ÉDITION PRÉCÉDENTE
          </h2>

          <p className="mt-8 text-white/60 max-w-3xl mx-auto text-lg">
            Découvrez quelques moments marquants de la précédente édition.
            Concerts, conférences, mode, rencontres et expériences uniques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {moments.map((item) => (
            <div
              key={item.title}
              className="group relative h-[500px] overflow-hidden rounded-[32px] border border-white/10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-10 left-10 right-10">
                <p className="uppercase text-yellow-300 tracking-[0.3em] text-xs mb-4">
                  Festival Talent
                </p>

                <h3 className="text-4xl font-black mb-2">
                  {item.title}
                </h3>

                <p className="text-white/70">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}