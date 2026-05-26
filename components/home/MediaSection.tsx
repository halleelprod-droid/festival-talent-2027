export default function MediaSection() {
  const medias = [
    "Campagnes digitales",
    "Influenceurs",
    "Presse locale & internationale",
    "TV / Radio",
    "Contenus vidéo",
    "Réseaux sociaux",
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Media Strategy
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            UNE VISIBILITÉ
            <br />
            À GRANDE ÉCHELLE
          </h2>

          <p className="mt-8 text-white/60 text-lg leading-relaxed">
            Festival Talent 2027 s’appuie sur une stratégie média moderne
            combinant réseaux sociaux, influenceurs, presse, production vidéo
            et couverture digitale pour maximiser l’impact des partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {medias.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-all duration-300"
            >
              <p className="text-white/80 font-semibold">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}