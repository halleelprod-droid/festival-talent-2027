import Image from "next/image";

import PremiumCard from "@/components/ui/PremiumCard";

type PartnerCardProps = {
  name: string;
  label: string;
  image?: string;
};

export default function PartnerCard({ name, label, image }: PartnerCardProps) {
  return (
    <PremiumCard className="p-6 text-center">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={360}
          height={208}
          className="h-44 w-full rounded-lg bg-black object-contain"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-lg border border-yellow-400/20 bg-black text-3xl font-black uppercase tracking-[0.16em] text-yellow-300">
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
      )}
      <h3 className="mt-6 text-lg font-black uppercase text-white">{name}</h3>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>
    </PremiumCard>
  );
}
