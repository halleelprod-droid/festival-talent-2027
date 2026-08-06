import Link from "next/link";
import { ArrowRight, Globe2, MapPin } from "lucide-react";

export default function InternationalHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-10 sm:pt-40 lg:px-20 lg:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,.2),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,.18),transparent_35%),linear-gradient(120deg,#050505,#120d05,#050505)]" />
      <div className="absolute left-[12%] top-1/2 h-px w-3/4 -rotate-12 bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent" />
      <div className="absolute left-[25%] top-[46%] h-3 w-3 rounded-full bg-yellow-200 shadow-[0_0_28px_8px_rgba(253,224,71,.7)]" />
      <div className="absolute left-1/2 top-[36%] h-3 w-3 rounded-full bg-yellow-200 shadow-[0_0_28px_8px_rgba(253,224,71,.7)]" />
      <div className="absolute right-[18%] top-[57%] h-3 w-3 rounded-full bg-yellow-200 shadow-[0_0_28px_8px_rgba(253,224,71,.7)]" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-5 py-3 text-xs font-black uppercase tracking-[.28em] text-yellow-200"><Globe2 size={16} /> Édition internationale 2027</p>
          <h1 className="font-display mt-8 text-balance text-5xl uppercase leading-[.92] sm:text-7xl lg:text-9xl">Le talent n&apos;a pas de <span className="block bg-gradient-to-r from-yellow-100 via-yellow-400 to-amber-700 bg-clip-text text-transparent">frontières.</span></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">Du Sénégal à Paris et Rome, Festival Talent réunit artistes, créateurs, innovateurs et entrepreneurs autour d&apos;une édition internationale dédiée à la nouvelle génération.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-[.2em] text-white/80"><MapPin size={18} className="text-yellow-300" /> Sénégal <span className="text-yellow-300">•</span> Paris <span className="text-yellow-300">•</span> Rome</div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/edition-2027" className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-600 px-7 py-4 text-xs font-black uppercase tracking-[.2em] text-black">Découvrir l&apos;édition 2027 <ArrowRight size={16} /></Link>
            <Link href="/destinations" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-xs font-black uppercase tracking-[.2em] text-white">Explorer les destinations</Link>
            <Link href="/preselections" className="inline-flex items-center justify-center rounded-full border border-yellow-300/35 bg-yellow-300/10 px-7 py-4 text-xs font-black uppercase tracking-[.2em] text-yellow-200">Participer aux présélections</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
