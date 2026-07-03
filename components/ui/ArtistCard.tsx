import Image from "next/image";

import PremiumCard from "@/components/ui/PremiumCard";

type ArtistCardProps = {
  name: string;
  image: string;
  role?: string;
  description: string;
  priority?: boolean;
};

export default function ArtistCard({
  name,
  image,
  role = "Artiste confirmé",
  description,
  priority = false,
}: ArtistCardProps) {
  return (
    <PremiumCard className="group">
      <div className="relative h-[430px] overflow-hidden bg-zinc-950">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
            {role}
          </p>
          <h3 className="mt-3 text-4xl font-black uppercase leading-none text-white">
            {name}
          </h3>
        </div>
      </div>
      <p className="p-6 text-sm leading-7 text-white/60">{description}</p>
    </PremiumCard>
  );
}
