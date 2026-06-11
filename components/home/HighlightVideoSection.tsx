export default function HighlightVideoSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-300">
            Aftermovie archive
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            REVIVEZ
            <br />
            LE PREMIER FESTIVAL
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-white/60">
            Un apercu video de ambiance, des performances, du public et de
            energie fondatrice du Festival Talent.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/77w8NnB_B6A"
              title="Festival Talent Aftermovie Archive"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
