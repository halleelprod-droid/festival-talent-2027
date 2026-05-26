export default function GallerySection() {
  const items = [
    "LIVE PERFORMANCE",
    "FASHION EXPERIENCE",
    "DIGITAL CULTURE",
    "AFRO CREATIVE SHOW",
  ];

  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
            Festival Atmosphere
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            IMMERSIVE
            <br />
            EXPERIENCE
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl h-[320px] flex items-end p-10 hover:-translate-y-2 hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <p className="uppercase text-xs tracking-[0.3em] text-white/40 mb-4">
                  Festival Talent 2027
                </p>

                <h3 className="text-3xl md:text-4xl font-black leading-tight">
                  {item}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}