import { marked } from "marked"


export interface BlogArticleMeta {
  excerpt: string
  publishedAt: string
  publishedTimestamp: number
  readingTime: number
  slug: string
  summary: string
  tags: string[]
  title: string
}

export interface BlogArticle extends BlogArticleMeta {
  content: string
  html: string
}

type FrontmatterValue = boolean | string | string[]

function normalizeScalar(value: string): string | boolean {
  const trimmed = value.trim()

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }

  if (trimmed === "true") return true
  if (trimmed === "false") return false

  return trimmed
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) {
    return {
      content: source.trim(),
      frontmatter: {} as Record<string, FrontmatterValue>
    }
  }

  const closingIndex = source.indexOf("\n---", 3)
  if (closingIndex === -1) {
    return {
      content: source.trim(),
      frontmatter: {} as Record<string, FrontmatterValue>
    }
  }

  const rawFrontmatter = source.slice(3, closingIndex).trim()
  const content = source.slice(closingIndex + 4).trim()
  const frontmatter: Record<string, FrontmatterValue> = {}
  let activeKey: string | null = null

  for (const line of rawFrontmatter.split(/\r?\n/)) {
    if (!line.trim()) continue

    const listMatch = line.match(/^\s*-\s+(.+)$/)

    if (listMatch && activeKey != null) {
      const nextValue = String(normalizeScalar(listMatch[1]))
      const currentValue = frontmatter[activeKey]

      if (Array.isArray(currentValue)) {
        currentValue.push(nextValue)
      }
      else if (typeof currentValue === "string" && currentValue.length > 0) {
        frontmatter[activeKey] = [currentValue, nextValue]
      }
      else {
        frontmatter[activeKey] = [nextValue]
      }

      continue
    }

    const fieldMatch = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (fieldMatch == null) continue

    const [, key, rawValue] = fieldMatch
    activeKey = key
    frontmatter[key] = rawValue ? normalizeScalar(rawValue) : []
  }

  return { content, frontmatter }
}

function slugFromPath(path: string) {
  return path.split("/").at(-1)?.replace(/\.md$/, "") || "article"
}

function stripMarkdown(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^\)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[\*_~]/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .trim()
}

function createExcerpt(content: string) {
  const firstParagraph = content.split(/\n\s*\n/).find(Boolean) || content
  const plainText = stripMarkdown(firstParagraph)

  if (plainText.length <= 180) return plainText
  return `${plainText.slice(0, 177).trimEnd()}...`
}

function formatDate(value: string | undefined) {
  if (value == null || value.length === 0) {
    return {
      publishedAt: "Undated",
      publishedTimestamp: 0
    }
  }

  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) {
    return {
      publishedAt: value,
      publishedTimestamp: 0
    }
  }

  return {
    publishedAt: new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(parsed)),
    publishedTimestamp: parsed
  }
}

function createReadingTime(content: string) {
  const wordCount = stripMarkdown(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 220))
}

export function parseBlogArticle(input: { path: string, source: string }): BlogArticle {
  const { content, frontmatter } = parseFrontmatter(input.source)
  const excerpt = createExcerpt(content)
  const { publishedAt, publishedTimestamp } = formatDate(typeof frontmatter.publishedAt === "string" ? frontmatter.publishedAt : undefined)
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.map(tag => String(tag))
    : typeof frontmatter.tags === "string"
      ? [frontmatter.tags]
      : []
  const title = typeof frontmatter.title === "string" && frontmatter.title.length > 0
    ? frontmatter.title
    : slugFromPath(input.path)

  return {
    content,
    excerpt,
    html: marked.parse(content) as string,
    publishedAt,
    publishedTimestamp,
    readingTime: createReadingTime(content),
    slug: slugFromPath(input.path),
    summary: typeof frontmatter.summary === "string" && frontmatter.summary.length > 0 ? frontmatter.summary : excerpt,
    tags,
    title
  }
}
