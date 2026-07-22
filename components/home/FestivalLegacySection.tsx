import Image from "next/image";

const archiveImages = [
  { src: "/images/archive/edition-1-stage.webp", alt: "Scène de la première édition du Festival Talent" },
  { src: "/images/archive/edition-1-crowd.webp", alt: "Public réuni lors de la première édition du Festival Talent" },
];

export default function FestivalLegacySection() {
  return (
    <section aria-labelledby="legacy-title" className="relative overflow-hidden bg-[#090909] px-4 py-20 text-white sm:px-6 lg:px-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:repeating-radial-gradient(circle_at_0_0,white_0,transparent_1px,transparent_4px)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 sm:min-h-[520px]">
          <span aria-hidden="true" className="absolute right-4 top-0 z-20 font-display text-[10rem] leading-none text-white/15 sm:text-[13rem]">01</span>
          <Image src="/images/artists/dip-doundou-guiss-edition-1.webp" alt="Dip Doundou Guiss lors de la première édition du Festival Talent" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover grayscale-[35%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-yellow-300">L’héritage de la première édition</p>
          <h2 id="legacy-title" className="font-display mt-6 text-balance text-4xl uppercase leading-[.95] sm:text-6xl">Dip Doundou Guiss,<span className="block text-white/55">artiste phare de la première édition</span></h2>
          <p className="mt-6 inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[.2em] text-white/70">Première édition · Chapitre fondateur</p>
          <div className="mt-8 space-y-5 text-base leading-8 text-white/65">
            <p>Avant d’ouvrir un nouveau chapitre avec Samba Peuzzi, le Festival Talent rend hommage à l’artiste qui a marqué sa première édition et incarné son énergie musicale.</p>
            <p>Cette première aventure constitue le point de départ d’une ambition plus vaste : faire du Festival Talent une plateforme durable de révélation et de transmission.</p>
          </div>
          <div className="mt-8 border-l-2 border-white/40 pl-5"><p className="text-2xl font-black tracking-[.1em]">DIP DOUNDOU GUISS</p><p className="mt-1 text-sm text-white/55">Artiste phare de la première édition</p></div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {archiveImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image src={img.src} alt={img.alt} fill loading="lazy" sizes="(max-width:1024px) 45vw, 24vw" className="object-cover grayscale-[45%]" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs italic text-white/40">Les images présentées retracent la première édition du Festival Talent.</p>
        </div>
      </div>
    </section>
  );
}
