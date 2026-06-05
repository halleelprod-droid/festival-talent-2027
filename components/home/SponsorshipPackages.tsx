export default function SponsorshipPackages() {
  const packs = [
    {
      name: "BRONZE",
      price: "500 000 FCFA",
      benefits: [
        "Logo sur le site",
        "Mention réseaux sociaux",
        "Présence sur supports officiels",
      ],
    },
    {
      name: "SILVER",
      price: "1 000 000 FCFA",
      benefits: [
        "Logo premium",
        "Stand partenaire",
        "Visibilité scène",
        "Campagne digitale",
      ],
    },
    {
      name: "GOLD",
      price: "2 500 000 FCFA",
      benefits: [
        "Partenaire principal",
        "Logo dominant",
        "Interviews médias",
        "Activation de marque",
        "Visibilité complète",
      ],
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Sponsoring Packages
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            PACKS
            <br />
            PARTENAIRES
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10"
            >
              <h3 className="text-3xl font-black text-yellow-300 mb-4">
                {pack.name}
              </h3>

              <p className="text-3xl font-black mb-8">
                {pack.price}
              </p>

              <ul className="space-y-4">
                {pack.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="text-white/70"
                  >
                    ✓ {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}