export default function OfficialVideoSection() {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-yellow-400 mb-4">
            Festival Talent Experience
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-white">
            VIDÉOS OFFICIELLES
          </h2>

          <p className="text-white/60 mt-6 text-lg">
            Revivez les meilleurs moments du Festival Talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="rounded-3xl overflow-hidden border border-white/10">
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full"
            >
              <source src="/videos/reel1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10">
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full"
            >
              <source src="/videos/reel2.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}