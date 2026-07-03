"use client";

import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import FadeIn from "@/components/ui/FadeIn";

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: ReactNode;
  titleClassName?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "gold" | "amber";
  className?: string;
}

const eyebrowToneClass: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  gold: "text-[#C9A84C]",
  amber: "text-yellow-400",
};

export default function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  titleClassName = "",
  description,
  align = "left",
  tone = "gold",
  className = "",
}: SectionHeadingProps) {
  return (
    <FadeIn className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <p
        className={`flex items-center gap-2 text-sm uppercase tracking-[0.4em] ${eyebrowToneClass[tone]} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {EyebrowIcon && <EyebrowIcon size={16} />}
        {eyebrow}
      </p>

      <h2
        className={`font-display mt-8 text-4xl leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl ${titleClassName}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
