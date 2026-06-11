export default function ImpactSection() {
  const stats = [
    {
      value: "1000+",
      label: "Participants",
    },
    {
      value: "5",
      label: "Artistes confirmes",
    },
    {
      value: "4",
      label: "Partenaires officiels",
    },
    {
      value: "50K+",
      label: "Personnes touchees en ligne",
    },
  ];

  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Festival Impact
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            IMPACT DES
            <br />
            ARCHIVES
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-white/60">
            Des resultats concrets qui demontrent le potentiel de croissance du
            Festival Talent avant son edition internationale 2027.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl"
            >
              <h3 className="text-5xl font-black text-yellow-300">
                {stat.value}
              </h3>

              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
