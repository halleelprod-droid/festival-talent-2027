import { Crown, Sparkles, Star } from "lucide-react";

export default function GratitudeSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.22),transparent_34%),linear-gradient(to_bottom,#000,rgba(14,10,2,0.98),#000)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 shadow-2xl shadow-yellow-900/30 backdrop-blur-xl">
          <Crown size={46} />
        </div>

        <p className="mt-10 text-xs font-black uppercase tracking-[0.45em] text-yellow-300 sm:text-sm">
          Reconnaissance éternelle
        </p>

        <div className="relative mx-auto mt-10 max-w-6xl">
          <h2
            className="font-display select-none text-6xl uppercase leading-none tracking-tight text-transparent sm:text-8xl lg:text-9xl"
            style={{
              WebkitTextStroke: "1px rgba(250, 204, 21, 0.65)",
              textShadow:
                "0 1px 0 #7c5a00, 0 2px 0 #6b4d00, 0 3px 0 #5a4100, 0 4px 0 #493500, 0 5px 0 #382800, 0 18px 35px rgba(0,0,0,0.85), 0 0 70px rgba(250,204,21,0.35)",
            }}
          >
            Merci
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent">
              Seigneur
            </span>
          </h2>

          <div className="pointer-events-none absolute inset-0 -z-10 translate-x-3 translate-y-3 text-6xl font-black uppercase leading-none tracking-tight text-yellow-900/25 blur-[1px] sm:text-8xl lg:text-9xl">
            Merci
            <span className="block">Seigneur</span>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-xl font-bold leading-9 text-white/75 sm:text-2xl sm:leading-10">
          Toute la gloire revient à Dieu. Rien de grand ne s’élève sans Sa
          grâce, Sa lumière et Sa bénédiction.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
          <div className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <Sparkles className="mx-auto text-yellow-300" size={30} />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Grâce
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Pour chaque porte ouverte, chaque rencontre et chaque opportunité.
            </p>
          </div>

          <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.08] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <Star className="mx-auto text-yellow-300" size={30} />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Lumière
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Pour guider le projet, les talents et toutes les personnes qui y
              croient.
            </p>
          </div>

          <div className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <Crown className="mx-auto text-yellow-300" size={30} />
            <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              Bénédiction
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Que Festival Talent soit une source d’espoir, d’impact et
              d’élévation.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[2.5rem] border border-yellow-400/25 bg-black/45 p-8 shadow-2xl shadow-yellow-950/30 backdrop-blur-xl">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-300">
            Festival Talent 2027
          </p>

          <p className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
            Ce projet avance avec foi, vision et détermination.
          </p>
        </div>
      </div>
    </section>
  );
}