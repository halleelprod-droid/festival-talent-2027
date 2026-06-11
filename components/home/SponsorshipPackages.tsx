export default function SponsorshipPackages() {
  const packs = [
    {
      name: "GOLD",
      price: "Sur demande",
      benefits: [
        "Visibilite dominante",
        "Activation de marque",
        "Interviews medias",
        "Presence scene premium",
        "Hospitalite VIP",
      ],
    },
    {
      name: "SILVER",
      price: "Sur demande",
      benefits: [
        "Logo premium",
        "Stand partenaire",
        "Campagne digitale",
        "Visibilite scene",
      ],
    },
    {
      name: "BRONZE",
      price: "Sur demande",
      benefits: [
        "Logo sur le site",
        "Mention reseaux sociaux",
        "Presence supports officiels",
      ],
    },
    {
      name: "INSTITUTIONNELS",
      price: "Convention",
      benefits: [
        "Mise en avant protocolaire",
        "Visibilite institutionnelle",
        "Programme jeunesse et culture",
        "Impact territorial",
      ],
    },
  ];

  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Sponsors Premium
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            PACKS
            <br />
            PARTENAIRES
          </h2>
        </div>

        <div className="grid gap-8 [perspective:1200px] md:grid-cols-2 xl:grid-cols-4">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className="premium-card rounded-[2rem] p-10 transition duration-500 hover:-translate-y-3 hover:rotate-1"
            >
              <h3 className="mb-4 text-3xl font-black text-yellow-300">
                {pack.name}
              </h3>

              <p className="mb-8 text-2xl font-black">{pack.price}</p>

              <ul className="space-y-4">
                {pack.benefits.map((benefit) => (
                  <li key={benefit} className="text-white/70">
                    {benefit}
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
