import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Megaphone,
  Newspaper,
  Sparkles,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { newsArticles } from "@/data/news";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Actualités",
  description:
    "Actualités officielles Festival Talent 2027 : annonces artistes, partenaires, pré-sélections, activités, médias et communiqués.",
  path: "/news",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function NewsPage() {
  const [featuredArticle, ...articles] = newsArticles;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Journal officiel"
            icon={Newspaper}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Actualités
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Festival Talent
                </span>
              </>
            }
            description="Annonces artistes, nouveaux partenaires, pre-selections, activites, communiques et contenus medias seront centralises ici pour installer Festival Talent 2027 comme une plateforme durable."
          />
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PremiumCard tone="gold" className="p-7 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Badge icon={Megaphone} size="sm">
                À la une
                </Badge>

                <h2 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                  {featuredArticle.title}
                </h2>

                <p className="mt-5 text-base leading-8 text-white/68">
                  {featuredArticle.excerpt}
                </p>

                <p className="mt-4 text-sm leading-7 text-white/50">
                  {featuredArticle.body}
                </p>

                <div className="mt-8">
                  <GradientButton href={featuredArticle.ctaHref}>
                    {featuredArticle.ctaLabel}
                  </GradientButton>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  "Annonces officielles",
                  "Plateforme durable",
                  "Suivi media",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-black/35 p-5"
                  >
                    <Sparkles className="text-yellow-300" size={22} />
                    <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white/78">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                Fil officiel
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                Dernières annonces
              </h2>
            </div>

            <GradientButton href="/contact" variant="outline" icon={ArrowRight}>
              Proposer une info
            </GradientButton>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <PremiumCard key={article.slug} className="p-6">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
                      {article.category}
                    </span>

                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                      <CalendarDays size={13} />
                      {dateFormatter.format(new Date(article.date))}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black uppercase leading-tight text-white">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {article.excerpt}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {article.body}
                  </p>

                  <Link
                    href={article.ctaHref}
                    className="mt-7 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-300 transition hover:text-yellow-100"
                  >
                    {article.ctaLabel}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
