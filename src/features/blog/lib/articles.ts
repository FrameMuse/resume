import { parseBlogArticle } from "@/features/blog/lib/parseBlog"


const articleModules = import.meta.glob("/blogs/*.md", {
  eager: true,
  import: "default",
  query: "?raw"
}) as Record<string, string>

const articles = Object.entries(articleModules)
  .map(([path, source]) => parseBlogArticle({ path, source }))
  .sort((left, right) => right.publishedTimestamp - left.publishedTimestamp)

export function getAllBlogArticles() {
  return articles
}

export function getBlogArticleBySlug(slug: string) {
  return articles.find(article => article.slug === slug)
}
