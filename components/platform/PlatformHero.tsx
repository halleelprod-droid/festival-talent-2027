import type { ReactNode } from "react";

import PlatformStatusBadge from "@/components/platform/PlatformStatusBadge";
import GradientButton from "@/components/ui/GradientButton";
import type { PlatformStatus } from "@/data/platform";

type PlatformHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  status: PlatformStatus;
  primaryCta?: {
    label: string;
    href: string;
  };
};

export default function PlatformHero({
  eyebrow,
  title,
  description,
  status,
  primaryCta,
}: PlatformHeroProps) {
  return (
    <section className="relative px-6 pb-16 pt-32 text-center text-white sm:px-10 lg:px-20 lg:pt-40">
      <PlatformStatusBadge status={status} />
      <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
        {eyebrow}
      </p>
      <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
        {title}
      </h1>
      <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
        {description}
      </p>
      {primaryCta && (
        <div className="mt-9">
          <GradientButton href={primaryCta.href}>{primaryCta.label}</GradientButton>
        </div>
      )}
    </section>
  );
}
