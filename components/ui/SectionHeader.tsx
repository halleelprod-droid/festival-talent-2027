import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
  // "h1" uniquement pour le titre principal d'une page dédiée.
  // Dans une section de page (home...), utiliser "h2" pour garder un seul h1 par page.
  as?: "h1" | "h2";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = "left",
  className = "",
  as: HeadingTag = "h1",
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

      <HeadingTag className="font-display mt-6 text-4xl uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
        {title}
      </HeadingTag>

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
