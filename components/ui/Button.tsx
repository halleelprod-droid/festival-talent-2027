"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import MagneticButton from "@/components/ui/MagneticButton";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  variant?: "gold" | "gradient" | "outline";
  className?: string;
}

const gradientClassName =
  "inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black shadow-2xl shadow-yellow-900/30 transition hover:scale-105";

const outlineClassName =
  "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-white/85 backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300";

export default function Button({
  children,
  href,
  onClick,
  type,
  target,
  variant = "gold",
  className = "",
}: ButtonProps) {
  if (variant === "gold") {
    return (
      <MagneticButton href={href} onClick={onClick} type={type} className={className}>
        {children}
      </MagneticButton>
    );
  }

  const sharedClassName = `${variant === "gradient" ? gradientClassName : outlineClassName} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <Link href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={sharedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type ?? "button"}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={sharedClassName}
    >
      {children}
    </motion.button>
  );
}
