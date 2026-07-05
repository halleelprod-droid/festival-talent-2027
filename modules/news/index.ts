export { getFeaturedNewsArticle, getNewsArticles } from "@/services/news";
export { newsArticles } from "@/data/news";
export type { NewsArticle } from "@/data/news";

export const newsModule = {
  name: "news",
  sensitivity: "public",
  publicApi: true,
  status: "active",
} as const;
