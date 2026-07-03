import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden py-24 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}
