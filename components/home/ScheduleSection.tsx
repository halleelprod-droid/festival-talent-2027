export default function ScheduleSection() {
  const days = [
    {
      day: "JOUR 01",
      title: "OUVERTURE",
      description:
        "Cérémonie officielle, fashion show et concerts d’ouverture.",
    },
    {
      day: "JOUR 02",
      title: "CULTURE & MODE",
      description:
        "Défilés, performances live et expériences immersives.",
    },
    {
      day: "JOUR 03",
      title: "INNOVATION",
      description:
        "Panels, tech experiences et créativité digitale africaine.",
    },
    {
      day: "JOUR 04",
      title: "GRAND FINAL",
      description:
        "Concert final, awards et closing experience.",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Festival Schedule
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            PROGRAMME
          </h2>
        </div>

        <div className="mt-24 space-y-8">
          {days.map((item, index) => (
            <div
              key={index}
              className="group border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <p className="text-sm tracking-[0.3em] text-white/40 mb-4">
                    {item.day}
                  </p>

                  <h3 className="text-3xl md:text-5xl font-black">
                    {item.title}
                  </h3>
                </div>

                <p className="text-white/60 max-w-xl leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}