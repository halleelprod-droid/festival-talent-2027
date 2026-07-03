import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface BadgeProps {
  icon?: LucideIcon;
  children: ReactNode;
  color?: "gold" | "red";
  size?: "sm" | "md";
  className?: string;
}

const colorClass: Record<NonNullable<BadgeProps["color"]>, string> = {
  gold: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  red: "border-red-500/30 bg-red-500/10 text-red-300",
};

const sizeClass: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-3 py-1 text-[10px] tracking-[0.2em]",
  md: "px-5 py-3 text-xs tracking-[0.32em]",
};

export default function Badge({
  icon: Icon,
  children,
  color = "gold",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 rounded-full border font-black uppercase backdrop-blur-xl ${colorClass[color]} ${sizeClass[size]} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 12 : 16} />}
      {children}
    </span>
  );
}
