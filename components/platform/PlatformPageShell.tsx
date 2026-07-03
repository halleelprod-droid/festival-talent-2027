import PlatformCTA from "@/components/platform/PlatformCTA";
import PlatformFeatureGrid from "@/components/platform/PlatformFeatureGrid";
import PlatformHero from "@/components/platform/PlatformHero";
import PremiumCard from "@/components/ui/PremiumCard";
import type { PlatformItem } from "@/data/platform";

type PlatformPageShellProps = {
  item: PlatformItem;
  eyebrow: string;
  titleAccent?: string;
  notice?: string;
  actions: Array<{
    label: string;
    href: string;
    variant?: "gold" | "outline";
  }>;
};

export default function PlatformPageShell({
  item,
  eyebrow,
  titleAccent,
  notice,
  actions,
}: PlatformPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.14),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />

      <PlatformHero
        eyebrow={eyebrow}
        status={item.status}
        title={
          <>
            {item.title}
            {titleAccent && (
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            )}
          </>
        }
        description={item.description}
        primaryCta={item.cta}
      />

      {notice && (
        <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <PremiumCard tone="gold" className="p-7 text-center sm:p-9">
              <p className="text-base font-semibold leading-8 text-white/75">
                {notice}
              </p>
            </PremiumCard>
          </div>
        </section>
      )}

      <PlatformFeatureGrid features={item.features} />

      <PlatformCTA
        title="Une brique de la plateforme long terme"
        description="Cette page présente une vision préparatoire. Aucune fonctionnalité sensible, aucun paiement, aucun accès privé et aucune donnée candidat ne sont activés ici."
        actions={actions}
      />
    </main>
  );
}
