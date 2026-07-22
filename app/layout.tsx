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

// Seuls les événements à date confirmée sont structurés (date au jour, sans
// heure inventée). Les temps forts encore annoncés par mois (Villa, karting,
// Jet-Ski…) restent éditoriaux et ne sont pas balisés comme Event daté. Aucun
// artiste n'est marqué comme confirmé dans les données structurées.
const seasonSchedule = [
  { name: "Finale nationale du Battle de danse", startDate: "2026-09-26", place: "Monument de la Renaissance Africaine" },
  { name: "Finale nationale des peintres", startDate: "2026-10-24", place: "Centre culturel Douta Seck" },
  { name: "Finale de lutte traditionnelle", startDate: "2026-11-22", place: "Plage de Malibu" },
  { name: "Méga concert", startDate: "2026-12-26", place: "Esplanade du Grand Théâtre National" },
];

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
    ...seasonSchedule.map((event) => ({
      "@type": "Event",
      name: `${siteName} — ${event.name}`,
      startDate: event.startDate,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: event.place,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dakar",
          addressCountry: "SN",
        },
      },
      organizer: { "@id": `${siteUrl}/#organization` },
    })),
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
    "Senegal",
    "Dakar",
    "pre-selections officielles",
    "Union Europeenne",
    "Samba Peuzzi",
    "Dip Doundou Guiss",
    "Battle All Style",
    "Battle de danse",
    "lutte traditionnelle",
    "Villa des influenceurs",
    "Activites Festival Talent",
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
