import type { Metadata } from "next";
import { internationalDisciplines } from "@/data/international";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: "Disciplines | Festival Talent 2027", description: "Les grands univers créatifs de Festival Talent 2027.", path: "/disciplines" });

export default function DisciplinesPage() { return <main className="min-h-screen bg-black px-6 pb-24 pt-36 text-white sm:px-10 lg:px-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.3em] text-yellow-300">Disciplines</p><h1 className="mt-5 text-5xl font-black uppercase sm:text-7xl">Les grands univers</h1><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{internationalDisciplines.map((discipline) => <div id={discipline.toLowerCase().replaceAll(" ", "-").replaceAll("&", "et")} key={discipline} className="rounded-3xl border border-white/10 bg-white/[.04] p-7"><h2 className="text-xl font-black uppercase">{discipline}</h2><p className="mt-4 text-sm leading-7 text-white/55">Programmation en cours</p></div>)}</div></div></main>; }
