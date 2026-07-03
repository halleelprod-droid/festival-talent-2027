import Link from "next/link";
import { ArrowRight, Cpu, GraduationCap, MonitorPlay, Smartphone, Ticket, WandSparkles } from "lucide-react";

import PlatformStatusBadge from "@/components/platform/PlatformStatusBadge";
import PremiumCard from "@/components/ui/PremiumCard";
import { platformItems } from "@/data/platform";

const iconByKey = {
  os: Cpu,
  billetterie: Ticket,
  tv: MonitorPlay,
  academie: GraduationCap,
  mobile: Smartphone,
  ia: WandSparkles,
} as const;

const homeItems = platformItems.filter((item) =>
  ["os", "billetterie", "tv", "academie", "mobile", "ia"].includes(item.key)
);

export default function PlatformVisionSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
              Vision plateforme
            </p>
            <h2 className="mt-7 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Au-delà du festival :
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                une plateforme
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-white/65 sm:text-lg">
              Festival Talent 2027 prépare une infrastructure numérique capable
              d’accompagner les candidats, partenaires, artistes, médias et
              équipes sur plusieurs éditions.
            </p>

            <Link
              href="/os"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-105"
            >
              Découvrir la vision
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homeItems.map((item) => {
            const Icon = iconByKey[item.key as keyof typeof iconByKey];

            return (
              <PremiumCard key={item.key} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>
                  <PlatformStatusBadge status={item.status} />
                </div>

                <h3 className="mt-6 text-2xl font-black uppercase leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {item.description}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
