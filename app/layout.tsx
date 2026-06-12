import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "Festival Talent 2027",
    "Festival Talent",
    "Paris",
    "Rome",
    "pre-selections officielles",
    "tournee europeenne",
    "Union Europeenne",
    "Youssou Ndour",
    "Samba Peuzzi",
    "Sidiki Diabate",
    "Soprano",
    "Amadeus",
  ],
  authors: [{ name: "Festival Talent" }],
  creator: "Festival Talent",
  publisher: "Festival Talent",

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        url: "/favicon.ico",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },

  alternates: {
    canonical: "/fr",
  },

  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: "/fr",
    siteName,
    images: [
      {
        url: "/images/festival-talent-logo.png",
        width: 1200,
        height: 630,
        alt: "Festival Talent 2027",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/images/festival-talent-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}