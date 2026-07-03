import type { LucideIcon } from "lucide-react";

import PremiumCard from "@/components/ui/PremiumCard";

type ActivityCardProps = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export default function ActivityCard({ title, detail, icon: Icon }: ActivityCardProps) {
  return (
    <PremiumCard className="p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
        <Icon size={25} />
      </div>
      <h3 className="mt-6 text-xl font-black uppercase text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/55">{detail}</p>
    </PremiumCard>
  );
}
