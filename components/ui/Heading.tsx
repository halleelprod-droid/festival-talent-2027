import { ReactNode } from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
};

const sizeClass: Record<NonNullable<HeadingProps["as"]>, string> = {
  h1: "text-5xl sm:text-7xl lg:text-8xl",
  h2: "text-4xl sm:text-5xl lg:text-6xl",
  h3: "text-2xl sm:text-3xl",
};

export default function Heading({
  as: Tag = "h2",
  children,
  className = "",
}: HeadingProps) {
  return (
    <Tag className={`font-black uppercase leading-tight tracking-tight text-white ${sizeClass[Tag]} ${className}`}>
      {children}
    </Tag>
  );
}
