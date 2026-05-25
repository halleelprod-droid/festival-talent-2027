export default function ExperienceSection() {
  const experiences = [
    {
      title: "MUSIQUE",
      description:
        "Concerts immersifs, performances live et artistes internationaux.",
    },
    {
      title: "MODE",
      description:
        "Fashion shows, jeunes créateurs et street culture africaine.",
    },
    {
      title: "INNOVATION",
      description:
        "Technologie, art digital et expériences futuristes interactives.",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Festival Experience
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            UNE NOUVELLE
            <br />
            GÉNÉRATION
            <br />
            D’ÉVÉNEMENTS
          </h2>

          <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl">
            Festival Talent 2027 fusionne culture, jeunesse, innovation et
            créativité africaine dans une expérience immersive unique au
            Sénégal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 hover:bg-white/[0.05] transition-all duration-300"
            >
              <h3 className="text-2xl font-black mb-6">
                {item.title}
              </h3>

              <p className="text-white/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}