import Image from "next/image";

import PremiumCard from "@/components/ui/PremiumCard";

type StaffCardProps = {
  name: string;
  role: string;
  department: string;
  description: string;
  image?: string;
  initials: string;
};

export default function StaffCard({
  name,
  role,
  department,
  description,
  image,
  initials,
}: StaffCardProps) {
  return (
    <PremiumCard className="overflow-hidden">
      <div className="relative h-72 bg-zinc-950">
        {image ? (
          <Image src={image} alt={name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-3xl font-black text-yellow-300">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      </div>
      <div className="p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300">
          {department}
        </p>
        <h3 className="mt-3 text-2xl font-black uppercase text-white">{name}</h3>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-white/55">
          {role}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/58">{description}</p>
      </div>
    </PremiumCard>
  );
}
