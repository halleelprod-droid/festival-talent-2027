export default function OfficialVideoSection() {
  const videos = [
    {
      title: "Reel Officiel 01",
      description: "Découvrez l’ambiance et l’énergie du Festival Talent.",
      url: "https://www.instagram.com/reel/DUV_U9ujG4k/",
    },
    {
      title: "Reel Officiel 02",
      description: "Revivez un autre moment fort du festival.",
      url: "https://www.instagram.com/reel/DUYwx7ujAfL/",
    },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Official Reels
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            VIDÉOS
            <br />
            OFFICIELLES
          </h2>

          <p className="max-w-3xl mx-auto text-white/60 text-lg mt-8">
            Découvrez les moments forts du Festival Talent à travers nos reels
            officiels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.url}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-7xl mb-8">🎬</div>

              <h3 className="text-3xl font-black mb-4">
                {video.title}
              </h3>

              <p className="text-white/60 mb-8">
                {video.description}
              </p>

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-yellow-400 px-8 py-4 text-black font-black hover:scale-105 transition-all duration-300"
              >
                Voir sur Instagram
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}