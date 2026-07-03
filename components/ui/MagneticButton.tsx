'use client';

import {
  motion
} from 'framer-motion';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const baseClassName = `
  group
  relative
  overflow-hidden
  rounded-full
  border
  border-[#C9A84C]/30
  bg-[#C9A84C]
  px-10
  py-5
  font-semibold
  text-black
  transition-all
  duration-500
  hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]
  disabled:opacity-60
`;

function ButtonContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="relative z-10">
        {children}
      </span>

      <div
        className="
          absolute
          inset-0
          translate-y-full
          bg-white/20
          transition-transform
          duration-500
          group-hover:translate-y-0
        "
      />
    </>
  );
}

export default function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled,
  className = ''
}: Props) {
  const combinedClassName = `${baseClassName} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.96 }}
        className="inline-block"
      >
        <Link href={href} className={combinedClassName}>
          <ButtonContent>{children}</ButtonContent>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.05,
        y: -4
      }}
      whileTap={{
        scale: 0.96
      }}
      className={combinedClassName}
    >
      <ButtonContent>{children}</ButtonContent>
    </motion.button>
  );
}