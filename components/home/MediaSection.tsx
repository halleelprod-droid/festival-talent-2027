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
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="relative z-10 text-white/80 font-semibold">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}