import { ReactNode } from "react";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "gold";
};

const toneClass: Record<NonNullable<PremiumCardProps["tone"]>, string> = {
  default: "border-white/10 bg-white/[0.04]",
  gold: "border-yellow-400/25 bg-yellow-400/[0.07]",
};

export default function PremiumCard({
  children,
  className = "",
  tone = "default",
}: PremiumCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${toneClass[tone]} shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(250,204,21,0.08),transparent_42%,rgba(255,255,255,0.04))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
