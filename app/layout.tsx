import type { Metadata } from 'next';

import './globals.css';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Festival Talent 2027',

  description:
    'Festival Talent 2027 — Une expérience immersive internationale réunissant musique, mode, culture et innovation.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}