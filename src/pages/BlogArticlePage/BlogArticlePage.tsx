import "./BlogArticlePage.scss"

import { getAllBlogArticles, getBlogArticleBySlug } from "@/features/blog/lib/articles"
import Chip from "@/shared/components/intrinsic/Chip/Chip"
import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"
import { withBaseUrl } from "@/shared/utils/baseUrl"


interface BlogArticlePageProps {
  slug: string
}

function BlogArticlePage({ slug }: BlogArticlePageProps) {
  const article = getBlogArticleBySlug(slug)
  const recentArticles = getAllBlogArticles().filter(candidate => candidate.slug !== slug).slice(0, 3)

  if (article == null) {
    return (
      <main className="blog-article-page">
        <div className="blog-article-page__shell">
          <article className="blog-article-page__missing">
            <p className="blog-article-page__eyebrow">Blog</p>
            <h1>Article not found</h1>
            <p>The requested article does not exist in the current markdown collection.</p>
            <a className="blog-article-page__back" href={withBaseUrl()}>
              <Icon name={IconName.ArrowUpRight} />
              <span>Back to portfolio</span>
            </a>
          </article>
        </div>
      </main>
    )
  }

  return (
    <main className="blog-article-page">
      <div className="blog-article-page__shell">
        <a className="blog-article-page__back" href={withBaseUrl("#blog")}>
          <Icon name={IconName.ArrowUpRight} />
          <span>Back to blog grid</span>
        </a>

        <article className="blog-article-page__article">
          <header className="blog-article-page__hero">
            <p className="blog-article-page__eyebrow">Markdown article</p>
            <h1 className="blog-article-page__title">{article.title}</h1>
            <div className="blog-article-page__meta">
              <span>{article.publishedAt}</span>
              <span>{article.readingTime} min read</span>
            </div>
            <div className="blog-article-page__tags">
              {article.tags.map(tag => (
                <Chip key={tag} tone="accent">{tag}</Chip>
              ))}
            </div>
            <p className="blog-article-page__summary">{article.summary}</p>
          </header>

          <div className="blog-article-page__body" dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>

        <aside className="blog-article-page__rail">
          <article className="blog-article-page__rail-card">
            <p className="blog-article-page__eyebrow">More notes</p>
            <div className="blog-article-page__rail-list">
              {recentArticles.map(recentArticle => (
                <a key={recentArticle.slug} href={withBaseUrl(`blog/${recentArticle.slug}/`)}>
                  <strong>{recentArticle.title}</strong>
                  <span>{recentArticle.summary}</span>
                </a>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </main>
  )
}

export default BlogArticlePage
