import { confirmedArtists } from "@/components/sections/constants";

export default function ArtistsSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/50">
            Official Line-up
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            ARTISTES CONFIRMES
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Programmation officielle confirmee : Youssou Ndour, Samba Peuzzi,
            Sidiki Diabate, Soprano et Amadeus.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {confirmedArtists.map((artist) => (
            <div
              key={artist.slug}
              className="group relative flex min-h-[220px] items-end overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-yellow-300">
                  {artist.category}
                </p>
                <h3 className="text-3xl font-black transition-all duration-300 group-hover:translate-x-2">
                  {artist.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
