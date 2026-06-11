import type { Metadata } from "next";

export const siteUrl = "https://festivaltalentofficial.com";

export const siteName = "Festival Talent 2027";

export const defaultDescription =
  "Festival Talent 2027, festival international premium a Dakar avec musique, mode, culture, jeunesse et innovation. L'Union Europeenne est le premier partenaire officiel majeur.";

const defaultImage = "/images/festival-talent-logo.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${title}`,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
