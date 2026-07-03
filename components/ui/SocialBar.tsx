'use client';

import {
  motion
} from 'framer-motion';

import {
  Camera,
  Play,
  Music2,
  Globe2
} from 'lucide-react';

import {
  socialLinks
} from '@/config/social';

const iconByLabel: Record<string, typeof Camera> = {
  Instagram: Camera,
  TikTok: Music2,
  YouTube: Play,
  Facebook: Globe2
};

const socials = socialLinks.map((social) => ({
  icon: iconByLabel[social.label] ?? Globe2,
  href: social.href,
  label: social.label
}));

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
          social
        ) => {
          const Icon =
            social.icon;

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
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