export default function HighlightVideoSection() {
  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-300 mb-6">
            Aftermovie
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            REVIVEZ
            <br />
            L’ÉDITION PRÉCÉDENTE
          </h2>

          <p className="mt-8 text-white/60 max-w-3xl mx-auto text-lg">
            Un aperçu vidéo de l’ambiance, des performances, du public et de
            l’énergie du Festival Talent.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/77w8NnB_B6A"
              title="Festival Talent Aftermovie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}