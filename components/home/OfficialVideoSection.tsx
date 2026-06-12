export default function OfficialVideoSection() {
  return (
    <section className="bg-black py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 uppercase tracking-[0.4em] text-yellow-400">
            Les videos affichees viennent du premier Festival Talent
          </p>

          <h2 className="text-5xl font-black text-white md:text-7xl">
            ARCHIVES VIDEO DU PREMIER FESTIVAL TALENT
          </h2>

          <p className="mt-6 text-lg text-white/60">
            Les videos actuelles retracent les meilleurs moments du premier
            Festival Talent.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {["/videos/reel1.mp4", "/videos/reel2.mp4"].map((src, index) => (
            <div
              key={src}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <video controls muted playsInline className="h-full w-full">
                <source src={src} type="video/mp4" />
              </video>

              <div className="border-t border-white/10 px-6 py-5">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                  Archive video {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
