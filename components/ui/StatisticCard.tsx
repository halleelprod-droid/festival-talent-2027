import type { LucideIcon } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

interface StatisticCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  variant?: "glass" | "gold";
}

export default function StatisticCard({
  icon: Icon,
  label,
  value,
  variant = "glass",
}: StatisticCardProps) {
  return (
    <GlassCard variant={variant} className="p-5">
      <Icon className="text-yellow-300" size={26} />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-white/55">
        {label}
      </p>
      <p className="mt-2 text-xl font-black uppercase text-white">{value}</p>
    </GlassCard>
  );
}
