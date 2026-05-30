const partners = [
  {
    name: "Mano Perfetto",
    image: "/partners/mano.jpeg",
  },
  {
    name: "Val2Events",
    image: "/partners/val2events.jpeg",
  },
  {
    name: "H & Hair",
    image: "/partners/h-hair.jpeg",
  },
  {
    name: "Universal Selfcare",
    image: "/partners/universal.jpeg",
  },
];

export default function OfficialPartners() {
  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Financial Partners
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            PARTENAIRES OFFICIELS
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Les partenaires financiers officiels de Festival Talent 2027.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-52 object-contain rounded-2xl bg-black"
              />

              <h3 className="mt-6 text-center text-lg font-bold">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}