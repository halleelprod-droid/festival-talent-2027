import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type GradientButtonProps = {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: "gold" | "outline";
  target?: string;
  className?: string;
};

const variantClass: Record<NonNullable<GradientButtonProps["variant"]>, string> = {
  gold:
    "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 text-black hover:scale-[1.02]",
  outline:
    "border border-white/15 bg-white/[0.04] text-white/85 hover:border-yellow-400/45 hover:text-yellow-300",
};

export default function GradientButton({
  href,
  children,
  icon: Icon = ArrowRight,
  variant = "gold",
  target,
  className = "",
}: GradientButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.2em] transition ${variantClass[variant]} ${className}`}
    >
      <span>{children}</span>
      <Icon size={16} aria-hidden="true" />
    </Link>
  );
}
