import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import PremiumCard from "@/components/ui/PremiumCard";

type StatsCardProps = {
  label: string;
  value: string;
  description?: ReactNode;
  icon?: LucideIcon;
};

export default function StatsCard({
  label,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <PremiumCard className="p-6">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
          <Icon size={24} />
        </div>
      )}
      <p className="mt-5 text-4xl font-black uppercase text-white">{value}</p>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
        {label}
      </p>
      {description && <p className="mt-4 text-sm leading-7 text-white/58">{description}</p>}
    </PremiumCard>
  );
}
