import Image from "next/image";

const traditions = [
  {
    label: "Tradition juive",
    script: "יהוה",
    transliteration: "YHWH",
    note: "Transcription du tétragramme sacré",
    text: "L'Éternel, Créateur du ciel et de la terre, Dieu de l'Alliance, source de justice, de fidélité et de paix.",
    dir: "rtl",
  },
  {
    label: "Tradition chrétienne",
    script: "ܐܠܗܐ",
    transliteration: "Alāhā",
    note: "Nom araméen/syriaque de Dieu",
    text: "Dieu, Créateur du ciel et de la terre, source d'amour, de vérité, de grâce et d'espérance.",
    dir: "rtl",
  },
  {
    label: "Tradition musulmane",
    script: "الله",
    transliteration: "Allāh",
    note: "Nom arabe de Dieu",
    text: "Allah, le Tout-Puissant, le Très Miséricordieux, Créateur du ciel et de la terre, guide et soutien de l'humanité.",
    dir: "rtl",
  },
] as const;

const particles = [
  "left-[12%] top-[18%]",
  "left-[20%] top-[74%]",
  "left-[50%] top-[12%]",
  "left-[78%] top-[22%]",
  "left-[88%] top-[68%]",
] as const;

export default function GratitudeSection() {
  return (
    <section
      id="gratitude"
      aria-labelledby="gratitude-title"
      className="relative isolate w-full overflow-hidden bg-black py-20 text-white sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.18),transparent_30%),radial-gradient(circle_at_top,rgba(30,64,175,0.18),transparent_38%),linear-gradient(to_bottom,#000,#030712_45%,#000)]" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-yellow-200/10 blur-3xl motion-safe:animate-pulse motion-reduce:animate-none sm:h-[34rem] sm:w-[34rem]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-black" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-200/35 to-transparent" />

      {particles.map((position, index) => (
        <span
          key={position}
          aria-hidden="true"
          className={`pointer-events-none absolute h-1 w-1 rounded-full bg-yellow-100/60 opacity-40 motion-safe:animate-pulse motion-reduce:animate-none ${position}`}
          style={{ animationDelay: `${index * 600}ms` }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-yellow-200/75">
            Gratitude
          </p>
          <h2
            id="gratitude-title"
            className="mt-5 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            À Dieu la gloire
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
            Toute la gloire revient au Créateur du ciel et de la terre.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl [perspective:1400px]">
          <figure data-premium-card className="world-card relative overflow-hidden rounded-2xl border border-yellow-200/25 bg-white/[0.035] p-3 shadow-[0_0_80px_rgba(234,179,8,0.16)] backdrop-blur-xl sm:p-4 [transform-style:preserve-3d]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-35" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            <Image
              src="/images/gratitude/festival-talent-gloire-3d.png"
              alt="Composition 3D célébrant la gloire du Créateur dans les traditions juive, chrétienne et musulmane, avec des écritures hébraïque, araméenne et arabe."
              width={1800}
              height={1100}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="world-image h-auto w-full rounded-xl object-contain [transform:translateZ(18px)] motion-reduce:transform-none"
            />
            <figcaption className="sr-only">
              Visuel 3D inclusif célébrant la gratitude envers le Créateur dans
              les traditions juive, chrétienne et musulmane.
            </figcaption>
          </figure>
        </div>

        <div className="mx-auto mt-16 max-w-5xl text-center">
          <p className="mx-auto max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
            Juifs, chrétiens et musulmans se reconnaissent dans la foi au Dieu
            unique, Créateur, source de sagesse, de paix, de justice et de
            miséricorde.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {traditions.map((tradition) => (
            <article
              key={tradition.label}
              data-premium-card
              className="world-card rounded-2xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-yellow-200/35 hover:bg-yellow-200/[0.055]"
            >
              <p className="text-xs font-black uppercase tracking-[0.26em] text-yellow-200/78">
                {tradition.label}
              </p>
              <p
                dir={tradition.dir}
                lang="und"
                className="mt-6 text-5xl font-semibold leading-none text-yellow-100 sm:text-6xl"
              >
                {tradition.script}
              </p>
              <p className="mt-5 text-lg font-bold text-white">
                {tradition.transliteration}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                {tradition.note}
              </p>
              <p className="mt-6 text-sm leading-7 text-white/62">
                {tradition.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-5xl text-center">
          <p className="whitespace-pre-line text-2xl font-light leading-relaxed text-white sm:text-4xl">
            {
              "Différents dans nos traditions,\nunis dans le respect du Dieu unique,\ndu prochain et du bien commun."
            }
          </p>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-yellow-200/85 sm:text-base">
            Paix • Amour • Justice • Miséricorde • Fraternité
          </p>

          <p className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-lg leading-8 text-white/68 sm:text-xl">
            {
              "Une même humanité.\nUne même responsabilité.\nUn même Créateur du ciel et de la terre."
            }
          </p>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto my-14 h-px max-w-3xl bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent"
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.36em] text-yellow-200">
            Festival Talent
          </p>
          <p className="mt-6 whitespace-pre-line text-2xl font-light leading-relaxed text-white sm:text-3xl">
            {"Révéler les talents.\nÉlever les générations.\nTransformer des vies."}
          </p>
          <p className="mt-10 text-sm italic leading-7 text-white/55">
            À Dieu seul soit toute la gloire.
          </p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.3em] text-white/32">
            Soli Deo Gloria
          </p>
        </div>
      </div>
    </section>
  );
}
