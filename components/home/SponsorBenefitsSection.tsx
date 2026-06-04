export default function SponsorBenefitsSection() {
  const benefits = [
    {
      title: "Visibilité de marque",
      description:
        "Présence sur le site officiel, les réseaux sociaux, les supports print, les scènes et les espaces événementiels.",
    },
    {
      title: "Audience jeune & engagée",
      description:
        "Touchez une génération créative, connectée, urbaine et active autour de la culture africaine.",
    },
    {
      title: "Crédibilité institutionnelle",
      description:
        "Associez votre marque à un projet porté par des partenaires officiels et une vision internationale.",
    },
    {
      title: "Impact culturel",
      description:
        "Soutenez la jeunesse, les talents, la création, l’innovation et les industries culturelles africaines.",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Sponsoring
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            POURQUOI
            <br />
            NOUS SOUTENIR ?
          </h2>

          <p className="mt-8 text-white/60 max-w-3xl mx-auto text-lg">
            Devenir partenaire de Festival Talent 2027, c’est associer votre
            marque à une plateforme culturelle ambitieuse, jeune et
            internationale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-500"
            >
              <h3 className="text-2xl font-black text-yellow-300 mb-6">
                {item.title}
              </h3>

              <p className="text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}