const editions = [
  { number: "01", artist: "Dip Doundou Guiss", text: "L’artiste phare qui a accompagné les premiers pas du Festival Talent." },
  { number: "02", artist: "Samba Peuzzi", text: "Le visage artistique d’une nouvelle saison nationale, plus grande et plus ambitieuse." },
];

export default function EditionsTransition() {
  return (
    <section aria-labelledby="editions-title" className="relative overflow-hidden bg-black px-5 py-16 text-center text-white sm:px-6 sm:py-20 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 id="editions-title" className="font-display text-balance text-4xl uppercase sm:text-6xl">Deux éditions. Deux figures. Une même mission.</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
          {/* Édition 01 */}
          <article className="rounded-[1.75rem] border border-white/15 bg-white/[.04] p-6 text-left sm:p-8">
            <span className="font-display text-6xl text-white/25 sm:text-7xl">{editions[0].number}</span>
            <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">{editions[0].artist}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">{editions[0].text}</p>
          </article>

          {/* Message central */}
          <div className="flex flex-col items-center gap-3 py-2">
            <span aria-hidden="true" className="hidden h-16 w-px bg-gradient-to-b from-transparent via-yellow-300 to-transparent lg:block" />
            <p className="text-xs font-black uppercase leading-8 tracking-[.35em] text-yellow-300 sm:text-sm">Révéler.<br />Connecter.<br />Faire rayonner.</p>
            <span aria-hidden="true" className="hidden h-16 w-px bg-gradient-to-b from-transparent via-yellow-300 to-transparent lg:block" />
          </div>

          {/* Édition 02 */}
          <article className="rounded-[1.75rem] border border-yellow-300/25 bg-yellow-300/[.05] p-6 text-left sm:p-8">
            <span className="font-display text-6xl text-yellow-300/40 sm:text-7xl">{editions[1].number}</span>
            <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">{editions[1].artist}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">{editions[1].text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
