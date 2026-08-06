import type { Metadata } from "next";
import Link from "next/link";
import InternationalInterestForm from "@/components/forms/InternationalInterestForm";
import { buildPageMetadata } from "@/lib/seo";
import { INTERNATIONAL_INTEREST_CATEGORIES, INTERNATIONAL_INTEREST_DESTINATIONS } from "@/src/validation/international-interest";

export const metadata: Metadata = buildPageMetadata({ title: "Manifestation d’intérêt internationale", description: "Proposez une collaboration, un lieu, un partenariat, une action média ou une contribution artistique pour les étapes Sénégal, Paris et Rome de Festival Talent 2027.", path: "/international-interest" });

type SearchParams = Promise<{ destination?: string; category?: string }>;

export default async function InternationalInterestPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const initialDestination = INTERNATIONAL_INTEREST_DESTINATIONS.includes(params.destination as typeof INTERNATIONAL_INTEREST_DESTINATIONS[number]) ? params.destination as typeof INTERNATIONAL_INTEREST_DESTINATIONS[number] : "global";
  const initialCategory = INTERNATIONAL_INTEREST_CATEGORIES.includes(params.category as typeof INTERNATIONAL_INTEREST_CATEGORIES[number]) ? params.category as typeof INTERNATIONAL_INTEREST_CATEGORIES[number] : "other";
  return <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white sm:px-10 lg:px-20"><div className="mx-auto max-w-5xl"><Link href="/destinations" className="text-xs font-black uppercase tracking-[.18em] text-yellow-200">← Découvrir les destinations</Link><header className="mt-12 max-w-4xl"><p className="text-xs font-black uppercase tracking-[.3em] text-yellow-300">Manifestation d’intérêt internationale</p><h1 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-6xl">Construisons l’étape internationale ensemble</h1><p className="mt-6 text-base leading-8 text-white/65">Partenaires, lieux, médias, artistes, professionnels et réseaux peuvent proposer une collaboration pour le Sénégal, Paris, Rome ou l’ensemble du festival.</p></header><div className="mt-10 rounded-3xl border border-yellow-300/20 bg-yellow-300/[.07] p-6 text-sm leading-7 text-white/70">Ce formulaire est destiné aux propositions de collaboration et manifestations d’intérêt. Il ne remplace pas les présélections et ne garantit aucune participation.</div><div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[.04] p-6 sm:p-10"><InternationalInterestForm initialDestination={initialDestination} initialCategory={initialCategory} /></div><p className="mt-8 text-center text-sm text-white/45">Pour une demande générale, une assistance ou une question administrative, utilisez la <Link className="text-yellow-200 underline" href="/contact">page Contact</Link>.</p></div></main>;
}
