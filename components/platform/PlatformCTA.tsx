import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";

type PlatformCTAProps = {
  title: string;
  description: string;
  actions: Array<{
    label: string;
    href: string;
    variant?: "gold" | "outline";
  }>;
};

export default function PlatformCTA({ title, description, actions }: PlatformCTAProps) {
  return (
    <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <PremiumCard tone="gold" className="p-8 text-center sm:p-10">
          <h2 className="mx-auto max-w-4xl text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {actions.map((action) => (
              <GradientButton
                key={action.href}
                href={action.href}
                variant={action.variant ?? "gold"}
              >
                {action.label}
              </GradientButton>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
