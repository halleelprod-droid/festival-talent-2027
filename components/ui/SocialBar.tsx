'use client';

import {
  motion
} from 'framer-motion';

import {
  Camera,
  Play,
  Music2
} from 'lucide-react';

const socials = [
  {
    icon: Camera,
    href: '#'
  },
  {
    icon: Play,
    href: '#'
  },
  {
    icon: Music2,
    href: '#'
  }
];

export default function SocialBar() {
  return (
    <div
      className="
        fixed
        right-6
        top-1/2
        z-[100]
        hidden
        -translate-y-1/2
        flex-col
        gap-4
        lg:flex
      "
    >
      {socials.map(
        (
          social,
          index
        ) => {
          const Icon =
            social.icon;

          return (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{
                scale: 1.12,
                y: -4
              }}
              className="
                glass
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-zinc-300
                transition
                hover:border-[#C9A84C]
                hover:text-[#C9A84C]
              "
            >
              <Icon size={20} />
            </motion.a>
          );
        }
      )}
    </div>
  );
}