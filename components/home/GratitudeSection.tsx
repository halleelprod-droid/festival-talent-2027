const sacredNames = [
  {
    label: "ܐܠܗܐ",
    caption: "Alāhā — araméen",
    dir: "ltr",
  },
  {
    label: "الله",
    caption: "Allāh — arabe",
    dir: "rtl",
  },
  {
    label: "Dieu",
    caption: "français",
    dir: "ltr",
  },
] as const;

export default function GratitudeSection() {
  return (
    <section
      aria-labelledby="gratitude-title"
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#05060a] to-black px-6 py-24 text-white sm:px-10 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/10 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent" />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-200/75">
          À Dieu la gloire
        </p>

        <h2
          id="gratitude-title"
          className="mt-5 text-3xl font-light leading-tight text-white sm:text-5xl"
        >
          Toute la gloire revient au Créateur du ciel et de la terre.
        </h2>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          {sacredNames.map((name) => (
            <div
              key={name.label}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:border-yellow-200/35 hover:bg-yellow-200/[0.055]"
            >
              <p
                dir={name.dir}
                className="text-4xl font-semibold leading-none text-yellow-100 sm:text-5xl"
              >
                {name.label}
              </p>
              <p className="mt-4 text-sm font-medium text-white/68">
                {name.caption}
              </p>
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="mx-auto my-14 h-px max-w-2xl bg-gradient-to-r from-transparent via-yellow-300/35 to-transparent"
        />

        <p className="mx-auto max-w-3xl whitespace-pre-line text-lg leading-8 text-white/76 sm:text-xl">
          {
            "Un seul Créateur.\nSource de toute sagesse, de tout talent et de toute grâce."
          }
        </p>

        <div
          aria-hidden="true"
          className="mx-auto my-14 h-px max-w-3xl bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent"
        />

        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.36em] text-yellow-200">
            Festival Talent
          </p>
          <p className="mt-6 whitespace-pre-line text-2xl font-light leading-relaxed text-white sm:text-3xl">
            {"Révéler les talents.\nÉlever les générations.\nTransformer des vies."}
          </p>
          <p className="mt-10 text-sm italic leading-7 text-white/45">
            À Dieu seul soit toute la gloire.
          </p>
        </div>
      </div>
    </section>
  );
}
