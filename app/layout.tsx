import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import SiteChrome from "@/components/providers/SiteChrome";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/images/festival-talent-logo.webp`,
      sameAs: [],
    },
    {
      "@type": "Event",
      name: siteName,
      description: defaultDescription,
      startDate: "2027-01-01",
      endDate: "2027-04-30",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: [
        {
          "@type": "Place",
          name: "Paris",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paris",
            addressCountry: "FR",
          },
        },
        {
          "@type": "Place",
          name: "Rome",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rome",
            addressCountry: "IT",
          },
        },
      ],
      organizer: {
        "@id": `${siteUrl}/#organization`,
      },
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/tickets`,
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

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
    "Samba Peuzzi",
    "Morijah",
    "Cysoul",
    "Battle All Style",
    "Activites Festival Talent",
    "Casino de Paris",
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
        url: "/images/festival-talent-logo.webp",
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
    images: ["/images/festival-talent-logo.webp"],
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
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <body className="bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
