import { CheckCircle2 } from "lucide-react";

import PremiumCard from "@/components/ui/PremiumCard";

type PlatformFeatureGridProps = {
  features: string[];
};

export default function PlatformFeatureGrid({ features }: PlatformFeatureGridProps) {
  return (
    <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <PremiumCard key={feature} className="p-6">
            <CheckCircle2 className="text-yellow-300" size={24} />
            <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
              {feature}
            </h2>
          </PremiumCard>
        ))}
      </div>
    </section>
  );
}
