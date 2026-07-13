import { siteName, siteUrl } from "@/lib/seo";
import { confirmedArtists } from "@/data/artists";
import { newsArticles } from "@/data/news";
import { staffMembers } from "@/data/staff";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/festival-talent-logo.webp`,
  };
}

export function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteName,
    description:
      "Festival Talent 2027 connecte talents, partenaires, pre-selections et experiences internationales entre Paris et Rome.",
    startDate: "2027-01-01",
    endDate: "2027-05-15",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@id": `${siteUrl}/#organization`,
    },
    performer: confirmedArtists.map((artist) => ({
      "@type": "Person",
      name: artist.name,
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function peopleJsonLd() {
  return staffMembers.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    affiliation: siteName,
  }));
}

export function articlesJsonLd() {
  return newsArticles.map((article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: siteName,
    },
  }));
}
