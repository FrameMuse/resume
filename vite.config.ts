import path from "path"
import { readFile } from "node:fs/promises"
import { defineConfig } from "vite"

import {
  extractHeadAssets,
  readArticles,
  renderArticlePageDocument,
  renderHomePageDocument,
} from "./ssr/render"
import { renderLandingPageDocument } from "./ssr/renderLanding"


function resolveBase() {
  if (process.env.VITE_BASE_URL) {
    return process.env.VITE_BASE_URL.endsWith("/") ? process.env.VITE_BASE_URL : `${process.env.VITE_BASE_URL}/`
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
  if (process.env.GITHUB_ACTIONS === "true" && repositoryName) {
    return `/${repositoryName}/`
  }

  return "/"
}

function stripLeadingBase(pathname: string, basePath: string) {
  if (basePath === "/") return pathname

  const normalizedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath
  if (pathname === normalizedBase) return "/"
  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length)
  }

  return pathname
}

function staticRenderPlugin() {
  const rootDir = __dirname
  const indexTemplatePath = path.resolve(rootDir, "index.html")
  const blogsDir = path.resolve(rootDir, "blogs")
  const basePath = resolveBase()

  return {
    name: "static-render-pages",
    async transformIndexHtml(html: string) {
      const articles = await readArticles(blogsDir)
      const { linkTags } = extractHeadAssets(html)

      return renderLandingPageDocument({
        articles,
        basePath,
        linkTags,
      })
    },
    configureServer(server: { middlewares: { use: (handler: (req: { method?: string, url?: string }, res: { statusCode: number, setHeader: (name: string, value: string) => void, end: (body: string) => void }, next: () => void | Promise<void>) => void) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        const method = req.method || "GET"
        const requestUrl = req.url || "/"

        if (method !== "GET") {
          next()
          return
        }

        const pathname = requestUrl.split("?")[0]
        const trimmedPath = stripLeadingBase(pathname, basePath)
        const plainMatch = trimmedPath.match(/^\/(?:resume\/)?plain\/?$/)
        const articleMatch = trimmedPath.match(/^\/blog\/([^/]+)\/?$/)

        if (plainMatch == null && articleMatch == null) {
          next()
          return
        }

        const [indexTemplate, articles] = await Promise.all([
          readFile(indexTemplatePath, "utf8"),
          readArticles(blogsDir)
        ])

        const { linkTags } = extractHeadAssets(indexTemplate)
        const html = plainMatch
          ? renderHomePageDocument({
            articles,
            basePath,
            linkTags
          })
          : (() => {
            const slug = decodeURIComponent(articleMatch![1])
            const article = articles.find(candidate => candidate.slug === slug)
            if (article == null) {
              return null
            }

            return renderArticlePageDocument({
              article,
              basePath,
              linkTags,
              recentArticles: articles.filter(candidate => candidate.slug !== slug).slice(0, 3)
            })
          })()

        if (html == null) {
          next()
          return
        }

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.end(html)
      })
    }
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  base: resolveBase(),
  plugins: [staticRenderPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "blogs": path.resolve(__dirname, "./blogs"),
    },
  },
  server: {
    host: "0.0.0.0"
  },
  build: {
    outDir: "build",

    sourcemap: true,
    emptyOutDir: true,

    minify: true
  },
})
