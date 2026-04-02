import path from "node:path"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import {
  extractHeadAssets,
  inferBasePath,
  readArticles,
  renderArticlePageDocument,
  renderHomePageDocument,
} from "./render"
import { renderLandingPageDocument } from "./renderLanding"

async function buildStaticSite() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
  const blogsDir = path.join(rootDir, "blogs")
  const buildDir = path.join(rootDir, "build")
  const builtIndexHtmlPath = path.join(buildDir, "index.html")

  const [builtIndexHtml, articles] = await Promise.all([
    readFile(builtIndexHtmlPath, "utf8"),
    readArticles(blogsDir)
  ])

  const { iconHref, linkTags } = extractHeadAssets(builtIndexHtml)
  const basePath = inferBasePath(iconHref)

  const homePageHtml = renderLandingPageDocument({
    articles,
    basePath,
    linkTags
  })

  const plainResumeHtml = renderHomePageDocument({
    articles,
    basePath,
    linkTags
  })

  await writeFile(builtIndexHtmlPath, homePageHtml, "utf8")
  await mkdir(path.join(buildDir, "plain"), { recursive: true })
  await mkdir(path.join(buildDir, "resume", "plain"), { recursive: true })
  await writeFile(path.join(buildDir, "plain", "index.html"), plainResumeHtml, "utf8")
  await writeFile(path.join(buildDir, "resume", "plain", "index.html"), plainResumeHtml, "utf8")

  await mkdir(path.join(buildDir, "blog"), { recursive: true })

  for (const article of articles) {
    const articleDir = path.join(buildDir, "blog", article.slug)
    const recentArticles = articles.filter(candidate => candidate.slug !== article.slug).slice(0, 3)

    await mkdir(articleDir, { recursive: true })
    await writeFile(
      path.join(articleDir, "index.html"),
      renderArticlePageDocument({
        article,
        basePath,
        linkTags,
        recentArticles
      }),
      "utf8"
    )
  }

  await writeFile(path.join(buildDir, "404.html"), homePageHtml, "utf8")
}

await buildStaticSite()
