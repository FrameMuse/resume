import "./BlogCard.scss"

import type { BlogArticleMeta } from "@/features/blog/lib/parseBlog"
import Chip from "@/shared/components/intrinsic/Chip/Chip"
import { withBaseUrl } from "@/shared/utils/baseUrl"


interface BlogCardProps {
  article: BlogArticleMeta
}

function BlogCard({ article }: BlogCardProps) {
  return (
    <a className="blog-card" href={withBaseUrl(`blog/${article.slug}/`)}>
      <div className="blog-card__meta">
        <span>{article.publishedAt}</span>
        <span>{article.readingTime} min read</span>
      </div>
      <h3 className="blog-card__title">{article.title}</h3>
      <p className="blog-card__summary">{article.summary || article.excerpt}</p>
      <div className="blog-card__footer">
        <div className="blog-card__tags">
          {article.tags.slice(0, 2).map(tag => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
        <span className="blog-card__link">Read article</span>
      </div>
    </a>
  )
}

export default BlogCard