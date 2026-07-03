import Image from "next/image";

type OfficialPartner = {
  name: string;
  label: string;
  image?: string;
};

const partners: OfficialPartner[] = [
  {
    name: "Union Européenne",
    label: "Partenaire Officiel Majeur",
  },
  {
    name: "Sen Influenceurs",
    label: "Partenaire Média & Influence Officiel",
  },
  {
    name: "PIN EVENTS",
    label: "Partenaire Événementiel, Production & Relations Institutionnelles",
    image: "/images/partners/pin-events.png",
  },
  {
    name: "Mano Perfetto",
    label: "Partenaire Construction & Développement",
  },
  {
    name: "H & Hair",
    label: "Partenaire Beauté & Lifestyle",
  },
  {
    name: "Universal Selfcare",
    label: "Partenaire Bien-être & Santé",
  },
  {
    name: "Val2Events",
    label: "Partenaire associé",
    image: "/images/partners/val2events.jpeg",
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
            PARTENAIRES OFFICIELS & ASSOCIÉS
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Les partenaires financiers officiels de Festival Talent 2027.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              {partner.image ? (
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={360}
                  height={208}
                  className="h-52 w-full rounded-2xl bg-black object-contain"
                />
              ) : (
                <div className="flex h-52 w-full items-center justify-center rounded-2xl border border-yellow-400/20 bg-black text-center text-4xl font-black uppercase tracking-[0.18em] text-yellow-300">
                  {partner.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              )}

              <h3 className="mt-6 text-center text-lg font-bold">
                {partner.name}
              </h3>
              <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white/50">
                {partner.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
