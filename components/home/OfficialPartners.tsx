import Image from "next/image";

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
            PARTENAIRES
            <br />
            OFFICIELS
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Les entreprises qui accompagnent officiellement Festival Talent
            2027 dans son développement et son rayonnement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-black/20">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <h3 className="mt-6 text-lg font-bold text-center">
                  {partner.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}