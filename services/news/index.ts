import { newsArticles } from "@/data/news";

export function getNewsArticles() {
  return newsArticles;
}

export function getFeaturedNewsArticle() {
  return newsArticles.find((article) => article.featured) ?? newsArticles[0];
}
