import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/fr", changeFrequency: "weekly", priority: 1 },
    { path: "/news", changeFrequency: "weekly", priority: 0.95 },
    { path: "/os", changeFrequency: "monthly", priority: 0.85 },
    { path: "/tv", changeFrequency: "monthly", priority: 0.75 },
    { path: "/academie", changeFrequency: "monthly", priority: 0.75 },
    { path: "/portail-partenaires", changeFrequency: "monthly", priority: 0.75 },
    { path: "/mobile", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ia", changeFrequency: "monthly", priority: 0.7 },
    { path: "/vision", changeFrequency: "monthly", priority: 0.9 },
    { path: "/impact", changeFrequency: "monthly", priority: 0.9 },
    { path: "/espace-talent", changeFrequency: "monthly", priority: 0.88 },
    { path: "/candidat", changeFrequency: "monthly", priority: 0.85 },
    { path: "/awards", changeFrequency: "monthly", priority: 0.86 },
    { path: "/presse", changeFrequency: "monthly", priority: 0.86 },
    { path: "/communaute", changeFrequency: "weekly", priority: 0.9 },
    { path: "/opportunites", changeFrequency: "weekly", priority: 0.88 },
    { path: "/pourquoi-festival-talent", changeFrequency: "monthly", priority: 0.9 },
    { path: "/sponsors", changeFrequency: "monthly", priority: 0.9 },
    { path: "/sponsors/devenir-partenaire", changeFrequency: "monthly", priority: 0.85 },
    { path: "/sponsors/pack-partenaires", changeFrequency: "monthly", priority: 0.85 },
    { path: "/stats", changeFrequency: "weekly", priority: 0.85 },
    { path: "/preselections", changeFrequency: "weekly", priority: 0.95 },
    { path: "/programme", changeFrequency: "weekly", priority: 0.9 },
    { path: "/partners", changeFrequency: "weekly", priority: 0.9 },
    { path: "/partners/diassnor", changeFrequency: "monthly", priority: 0.78 },
    { path: "/mentors", changeFrequency: "monthly", priority: 0.85 },
    { path: "/team", changeFrequency: "monthly", priority: 0.85 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/activites", changeFrequency: "weekly", priority: 0.85 },
    { path: "/tickets", changeFrequency: "weekly", priority: 0.85 },
    { path: "/artists", changeFrequency: "weekly", priority: 0.8 },
    { path: "/media", changeFrequency: "monthly", priority: 0.75 },
  ] as const;

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
