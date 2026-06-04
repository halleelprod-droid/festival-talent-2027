export default function SponsorBenefitsSection() {
  const benefits = [
    {
      title: "Visibilité de marque",
      description:
        "Présence sur tous les supports digitaux, affiches, réseaux sociaux et événements.",
    },
    {
      title: "Accès à la jeunesse",
      description:
        "Connectez votre entreprise à une audience jeune, dynamique et engagée.",
    },
    {
      title: "Impact sociétal",
      description:
        "Associez votre marque à la culture, l’innovation et l’entrepreneuriat africain.",
    },
    {
      title: "Relations publiques",
      description:
        "Développez votre réseau avec les institutions, médias et leaders d’opinion.",
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
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10"
            >
              <h3 className="text-2xl font-black mb-6 text-yellow-300">
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