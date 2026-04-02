import path from "node:path"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"

import { parseBlogArticle } from "../src/features/blog/lib/parseBlog"


function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function extractAssetTags(indexHtml: string) {
  const headContent = indexHtml.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ""
  const linkTags = headContent.match(/<link[^>]*>/g) || []
  const scriptTags = indexHtml.match(/<script[^>]+type="module"[^>]*><\/script>/g) || []

  return {
    linkTags,
    scriptTags
  }
}

function renderStaticArticlePage(input: {
  article: ReturnType<typeof parseBlogArticle>
  linkTags: string[]
  recentArticles: Array<ReturnType<typeof parseBlogArticle>>
  scriptTags: string[]
}) {
  const { article, linkTags, recentArticles, scriptTags } = input
  const tagsMarkup = article.tags.map(tag => `<span class="chip chip--accent">${escapeHtml(tag)}</span>`).join("")
  const recentMarkup = recentArticles.map(recentArticle => (
    `<a href="../${recentArticle.slug}/"><strong>${escapeHtml(recentArticle.title)}</strong><span>${escapeHtml(recentArticle.summary)}</span></a>`
  )).join("")

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(article.summary)}" />
    <meta name="theme-color" content="#20242b" />
    <title>${escapeHtml(article.title)} — FrameMuse</title>
    ${linkTags.join("\n    ")}
  </head>
  <body>
    <div id="root">
      <main class="blog-article-page">
        <div class="blog-article-page__shell">
          <a class="blog-article-page__back" href="../../#blog">
            <span>Back to blog grid</span>
          </a>

          <article class="blog-article-page__article">
            <header class="blog-article-page__hero">
              <p class="blog-article-page__eyebrow">Markdown article</p>
              <h1 class="blog-article-page__title">${escapeHtml(article.title)}</h1>
              <div class="blog-article-page__meta">
                <span>${escapeHtml(article.publishedAt)}</span>
                <span>${article.readingTime} min read</span>
              </div>
              <div class="blog-article-page__tags">${tagsMarkup}</div>
              <p class="blog-article-page__summary">${escapeHtml(article.summary)}</p>
            </header>

            <div class="blog-article-page__body">${article.html}</div>
          </article>

          <aside class="blog-article-page__rail">
            <article class="blog-article-page__rail-card">
              <p class="blog-article-page__eyebrow">More notes</p>
              <div class="blog-article-page__rail-list">${recentMarkup}</div>
            </article>
          </aside>
        </div>
      </main>
    </div>
    ${scriptTags.join("\n    ")}
  </body>
</html>`
}

async function buildStaticBlogPages() {
  const rootDir = path.resolve(import.meta.dir, "..")
  const blogsDir = path.join(rootDir, "blogs")
  const buildDir = path.join(rootDir, "build")
  const indexHtmlPath = path.join(buildDir, "index.html")

  const [indexHtml, blogFilenames] = await Promise.all([
    readFile(indexHtmlPath, "utf8"),
    readdir(blogsDir)
  ])

  const articles = (await Promise.all(
    blogFilenames
      .filter(filename => filename.endsWith(".md"))
      .map(async filename => {
        const source = await readFile(path.join(blogsDir, filename), "utf8")
        return parseBlogArticle({
          path: `/blogs/${filename}`,
          source
        })
      })
  )).sort((left, right) => right.publishedTimestamp - left.publishedTimestamp)

  const { linkTags, scriptTags } = extractAssetTags(indexHtml)

  await mkdir(path.join(buildDir, "blog"), { recursive: true })

  for (const article of articles) {
    const articleDir = path.join(buildDir, "blog", article.slug)
    const recentArticles = articles.filter(candidate => candidate.slug !== article.slug).slice(0, 3)

    await mkdir(articleDir, { recursive: true })
    await writeFile(
      path.join(articleDir, "index.html"),
      renderStaticArticlePage({
        article,
        linkTags,
        recentArticles,
        scriptTags
      }),
      "utf8"
    )
  }

  await writeFile(path.join(buildDir, "404.html"), indexHtml, "utf8")
}

await buildStaticBlogPages()
