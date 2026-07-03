import type { PlatformStatus } from "@/data/platform";

type PlatformStatusBadgeProps = {
  status: PlatformStatus;
};

const statusClass: Record<PlatformStatus, string> = {
  Vision: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  Bientôt: "border-red-400/30 bg-red-500/10 text-red-200",
  Préparation: "border-white/15 bg-white/[0.06] text-white/75",
  Futur: "border-yellow-200/25 bg-yellow-200/10 text-yellow-100",
};

export default function PlatformStatusBadge({ status }: PlatformStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${statusClass[status]}`}
    >
      {status}
    </span>
  );
}
