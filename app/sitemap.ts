import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/fr", changeFrequency: "weekly", priority: 1 },
    { path: "/news", changeFrequency: "weekly", priority: 0.95 },
    { path: "/candidat", changeFrequency: "monthly", priority: 0.85 },
    { path: "/stats", changeFrequency: "weekly", priority: 0.85 },
    { path: "/preselections", changeFrequency: "weekly", priority: 0.95 },
    { path: "/programme", changeFrequency: "weekly", priority: 0.9 },
    { path: "/partners", changeFrequency: "weekly", priority: 0.9 },
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
