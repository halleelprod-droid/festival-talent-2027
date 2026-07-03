import { ReactNode } from "react";

import GradientButton from "@/components/ui/GradientButton";

type HeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
};

export default function Hero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
}: HeroProps) {
  return (
    <section className="relative px-6 pb-16 pt-32 text-center text-white sm:px-10 lg:px-20 lg:pt-40">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">{eyebrow}</p>
      <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
        {title}
      </h1>
      <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
        {description}
      </p>
      {primaryHref && primaryLabel && (
        <div className="mt-9">
          <GradientButton href={primaryHref}>{primaryLabel}</GradientButton>
        </div>
      )}
    </section>
  );
}
