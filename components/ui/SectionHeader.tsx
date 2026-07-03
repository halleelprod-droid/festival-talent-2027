import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p
        className={`inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-yellow-300 ${
          centered ? "justify-center" : ""
        }`}
      >
        {Icon && <Icon size={16} />}
        {eyebrow}
      </p>

      <h1 className="mt-6 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
        {title}
      </h1>

      {description && (
        <p
          className={`mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
