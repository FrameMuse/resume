import path from "node:path"
import { readdir, readFile } from "node:fs/promises"

import { portfolioContent } from "../src/entities/profile/model/portfolioContent"
import { parseBlogArticle } from "../src/features/blog/lib/parseBlog"


export type BlogArticle = ReturnType<typeof parseBlogArticle>

const navItems = [
  { href: "#bio", label: "Bio" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#impact", label: "Impact" },
  { href: "#initiatives", label: "Initiatives" },
  { href: "#opportunities", label: "Open" },
  { href: "#blog", label: "Blog" }
] as const

const contactIconMap = {
  email: "mail",
  github: "github",
  linkedin: "linkedin"
} as const

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function withBase(basePath: string, pathToAppend = "") {
  const sanitizedPath = pathToAppend.replace(/^\/+/, "")
  return sanitizedPath ? `${basePath}${sanitizedPath}` : basePath
}

export function extractHeadAssets(indexHtml: string) {
  const headContent = indexHtml.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ""
  const linkTags = headContent.match(/<link[^>]*>/g) || []
  const iconHref = headContent.match(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["']/i)?.[1] || "/favicon.svg"

  return {
    iconHref,
    linkTags
  }
}

export function inferBasePath(iconHref: string) {
  if (iconHref.endsWith("favicon.svg")) {
    return iconHref.slice(0, -"favicon.svg".length) || "/"
  }

  return "/"
}

function renderIcon(name: string, spriteHref: string, className?: string) {
  const classes = ["icon", className].filter(Boolean).join(" ")
  return `<svg class="${escapeHtml(classes)}" aria-hidden="true"><use href="${escapeHtml(spriteHref)}#${escapeHtml(name)}"></use></svg>`
}

function renderChip(label: string, tone: "neutral" | "accent" | "warm" | "dark" = "neutral") {
  const className = tone === "neutral" ? "chip" : `chip chip--${tone}`
  return `<span class="${className}">${escapeHtml(label)}</span>`
}

function renderButton(input: {
  basePath: string
  href: string
  iconRight?: string
  label: string
  targetBlank?: boolean
  variant?: "primary" | "secondary" | "ghost"
}) {
  const { basePath, href, iconRight, label, targetBlank = false, variant = "primary" } = input
  const resolvedHref = href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")
    ? href.startsWith("#") ? `${withBase(basePath)}${href}` : href
    : withBase(basePath, href)
  const relAttr = targetBlank ? ' rel="noreferrer"' : ""
  const targetAttr = targetBlank ? ' target="_blank"' : ""
  const iconMarkup = iconRight ? renderIcon(iconRight, withBase(basePath, "icons.svg"), "button__icon") : ""

  return `<a class="button button--${variant}" href="${escapeHtml(resolvedHref)}"${relAttr}${targetAttr}><span>${escapeHtml(label)}</span>${iconMarkup}</a>`
}

function renderMetricBadge(metric: (typeof portfolioContent.metrics)[number]) {
  return `<article class="metric-badge"><strong class="metric-badge__value">${escapeHtml(metric.value)}</strong><p class="metric-badge__label">${escapeHtml(metric.label)}</p></article>`
}

function renderProjectCard(project: (typeof portfolioContent.projectGroups)[number]["projects"][number], spriteHref: string) {
  return `
    <article class="project-card">
      <div class="project-card__meta">
        <span>${escapeHtml(project.kind)}</span>
        <span>${escapeHtml(project.indicator)}</span>
      </div>
      <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
      <p class="project-card__summary">${escapeHtml(project.summary)}</p>
      <div class="project-card__tags">${project.tags.map(tag => renderChip(tag)).join("")}</div>
      <a class="project-card__link" href="${escapeHtml(project.href)}" rel="noreferrer" target="_blank">
        <span>View project</span>
        ${renderIcon("arrow-up-right", spriteHref)}
      </a>
    </article>
  `
}

function renderImpactCard(impact: (typeof portfolioContent.impacts)[number], spriteHref: string) {
  const toggleId = `impact-${slugify(impact.title)}`

  return `
    <article class="impact-card">
      <input class="impact-card__toggle-input" id="${escapeHtml(toggleId)}" type="checkbox" />
      <header class="impact-card__header">
        <div class="impact-card__title-row">
          <h3 class="impact-card__title">${escapeHtml(impact.title)}</h3>
          <label class="impact-card__toggle" for="${escapeHtml(toggleId)}">
            <span class="impact-card__toggle-open">Open case</span>
            <span class="impact-card__toggle-close">Hide case</span>
            ${renderIcon("chevron-down", spriteHref, "impact-card__toggle-icon")}
          </label>
        </div>
        <p class="impact-card__summary">${escapeHtml(impact.summary)}</p>
        <div class="impact-card__chips">${impact.indicators.map(indicator => renderChip(indicator, "warm")).join("")}</div>
        <div class="impact-card__tags">${impact.tags.map(tag => renderChip(tag, "accent")).join("")}</div>
      </header>
      <div class="impact-card__details-shell">
        <div class="impact-card__details">
          <ul class="impact-card__detail-list">
            ${impact.details.map(detail => `<li>${escapeHtml(detail)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </article>
  `
}

function renderBlogCard(article: BlogArticle, basePath: string) {
  return `
    <a class="blog-card" href="${escapeHtml(withBase(basePath, `blog/${article.slug}/`))}">
      <div class="blog-card__meta">
        <span>${escapeHtml(article.publishedAt)}</span>
        <span>${article.readingTime} min read</span>
      </div>
      <h3 class="blog-card__title">${escapeHtml(article.title)}</h3>
      <p class="blog-card__summary">${escapeHtml(article.summary || article.excerpt)}</p>
      <div class="blog-card__footer">
        <div class="blog-card__tags">${article.tags.slice(0, 2).map(tag => renderChip(tag)).join("")}</div>
        <span class="blog-card__link">Read article</span>
      </div>
    </a>
  `
}

function renderSection(input: {
  body: string
  description?: string
  eyebrow: string
  id: string
  title: string
}) {
  const { body, description, eyebrow, id, title } = input

  return `
    <section class="section" id="${escapeHtml(id)}">
      <header class="section__header">
        <p class="section__eyebrow">${escapeHtml(eyebrow)}</p>
        <h2 class="section__title">${escapeHtml(title)}</h2>
        ${description ? `<p class="section__description">${escapeHtml(description)}</p>` : ""}
      </header>
      ${body}
    </section>
  `
}

function renderDocument(input: {
  body: string
  description: string
  linkTags: string[]
  title: string
}) {
  const { body, description, linkTags, title } = input

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#20242b" />
    <title>${escapeHtml(title)}</title>
    ${linkTags.join("\n    ")}
  </head>
  <body>
    ${body}
  </body>
</html>`
}

export function renderHomePageDocument(input: { articles: BlogArticle[], basePath: string, linkTags: string[] }) {
  const { articles, basePath, linkTags } = input
  const spriteHref = withBase(basePath, "icons.svg")

  const body = `
    <header class="home-page-header">
      <div class="home-page-header__bar">
        <a class="home-page-header__brand" href="#top">
          <span class="home-page-header__brand-mark">FM</span>
          <span class="home-page-header__brand-text">FrameMuse</span>
        </a>
        <nav class="home-page-header__nav" aria-label="Section navigation">
          ${navItems.map(item => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join("")}
        </nav>
      </div>
    </header>

    <main class="home-page" id="top">
      <section class="home-page__hero">
        <div class="home-page__hero-card home-page__hero-card--dark">
          ${renderChip(portfolioContent.profile.availability, "dark")}
          <p class="home-page__hero-eyebrow">Senior TypeScript / React engineer</p>
          <h1 class="home-page__hero-title">${escapeHtml(portfolioContent.profile.headline)}</h1>
          <p class="home-page__hero-summary">${escapeHtml(portfolioContent.profile.summary)}</p>
          <div class="home-page__hero-actions">
            ${renderButton({ basePath, href: portfolioContent.profile.email, iconRight: "arrow-up-right", label: "Start a conversation" })}
            ${renderButton({ basePath, href: portfolioContent.profile.github, label: "GitHub", targetBlank: true, variant: "ghost" })}
            ${renderButton({ basePath, href: portfolioContent.profile.linkedin, label: "LinkedIn", targetBlank: true, variant: "secondary" })}
          </div>
        </div>

        <div class="home-page__hero-sidebar">
          <article class="home-page__manifest">
            <div class="home-page__manifest-topline">
              <span>${escapeHtml(portfolioContent.profile.name)}</span>
              <span>${escapeHtml(portfolioContent.profile.alias)}</span>
            </div>
            <h2 class="home-page__manifest-title">${escapeHtml(portfolioContent.profile.role)}</h2>
            <div class="home-page__manifest-item">
              ${renderIcon("map-pin", spriteHref)}
              <span>${escapeHtml(portfolioContent.profile.city)}</span>
            </div>
            <p class="home-page__manifest-copy">${escapeHtml(portfolioContent.profile.supporting)}</p>
            <div class="home-page__manifest-list">
              ${portfolioContent.differentiators.map(item => `
                <div class="home-page__manifest-bullet">
                  ${renderIcon("spark", spriteHref)}
                  <span>${escapeHtml(item)}</span>
                </div>
              `).join("")}
            </div>
          </article>

          <article class="home-page__contact-card">
            <p class="home-page__card-eyebrow">Direct links</p>
            <div class="home-page__contact-list">
              ${portfolioContent.contacts.map(contact => `
                <a class="home-page__contact-link" href="${escapeHtml(contact.href)}"${contact.kind === "email" ? "" : ' rel="noreferrer" target="_blank"'}>
                  <span class="home-page__contact-icon">${renderIcon(contactIconMap[contact.kind], spriteHref)}</span>
                  <span>
                    <strong>${escapeHtml(contact.label)}</strong>
                    <small>${escapeHtml(contact.value)}</small>
                  </span>
                </a>
              `).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="home-page__metrics">${portfolioContent.metrics.map(metric => renderMetricBadge(metric)).join("")}</section>

      ${renderSection({
    eyebrow: "Bio",
    id: "bio",
    title: "Product-minded engineering with platform instincts",
    description: "The strongest positioning here is not only frontend implementation. It is senior TypeScript and React engineering with architecture depth, delivery discipline, and a real interest in tools that make the rest of the team faster.",
    body: `
          <div class="home-page__bio-grid">
            <article class="home-page__bio-card">
              <p>${escapeHtml(portfolioContent.profile.summary)}</p>
              <p>${escapeHtml(portfolioContent.profile.supporting)}</p>
            </article>
            <article class="home-page__principles-card">
              <p class="home-page__card-eyebrow">What usually stands out</p>
              <div class="home-page__principles-list">
                <div>${renderIcon("code", spriteHref)}<strong>UI craft with technical rigor</strong><p>Interfaces are treated as systems, not screenshots. Precision and maintainability both matter.</p></div>
                <div>${renderIcon("layers", spriteHref)}<strong>Architecture without excess abstraction</strong><p>Reusable structures are valuable only when they keep teams faster and products easier to change.</p></div>
                <div>${renderIcon("bolt", spriteHref)}<strong>Fast feedback loops</strong><p>Build speed, tooling ergonomics, and system clarity are treated as part of product throughput.</p></div>
              </div>
            </article>
          </div>
        `
  })}

      ${renderSection({
    eyebrow: "Skills",
    id: "skills",
    title: "A stack shaped around delivery, libraries, and maintainable systems",
    description: "Broad frontend and product coverage, backed by platform thinking and selective full-stack depth.",
    body: `<div class="home-page__skills-grid">${portfolioContent.skillClusters.map(cluster => `<article class="home-page__skill-card"><h3>${escapeHtml(cluster.title)}</h3><div class="home-page__skill-tags">${cluster.items.map(item => renderChip(item)).join("")}</div></article>`).join("")}</div>`
  })}

      ${renderSection({
    eyebrow: "Experience",
    id: "experience",
    title: "Senior roles with ownership across code, systems, and delivery",
    description: "Recent years combine framework and library research, client and internal product delivery, audits, backend integrations, and mentoring.",
    body: `<div class="home-page__experience-list">${portfolioContent.experience.map(entry => `<article class="home-page__experience-card"><p class="home-page__experience-period">${escapeHtml(entry.period)}</p><div class="home-page__experience-marker" aria-hidden="true"><span class="home-page__experience-node"></span></div><div class="home-page__experience-body"><div class="home-page__experience-topline"><span class="home-page__experience-company">${escapeHtml(entry.company)}</span><span>${escapeHtml(entry.location)}</span></div><h3>${escapeHtml(entry.role)}</h3><p class="home-page__experience-summary">${escapeHtml(entry.summary)}</p><ul class="home-page__experience-bullets">${entry.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul><div class="home-page__experience-stack">${entry.stack.map(item => renderChip(item, "accent")).join("")}</div></div></article>`).join("")}</div>`
  })}

      ${renderSection({
    eyebrow: "Projects",
    id: "projects",
    title: "A cleaner overview of shipped work, side projects, and libraries",
    description: "Grouped by role so the overview is easier to scan: major portfolio items, smaller self-directed work, and reusable libraries each get their own space under one Projects highlight.",
    body: `<div class="home-page__project-sections">${portfolioContent.projectGroups.map(group => `<section class="home-page__project-section"><header class="home-page__project-section-header"><h3>${escapeHtml(group.title)}</h3><p>${escapeHtml(group.description)}</p></header><div class="home-page__project-section-grid">${group.projects.map(project => renderProjectCard(project, spriteHref)).join("")}</div></section>`).join("")}</div>`
  })}

      ${renderSection({
    eyebrow: "Impact",
    id: "impact",
    title: "Interesting impact, kept practical",
    description: "Selected cases where the work changed team speed, stability, or clarity in a way that mattered beyond just shipping one feature.",
    body: `<div class="home-page__impact-grid">${portfolioContent.impacts.map(impact => renderImpactCard(impact, spriteHref)).join("")}</div>`
  })}

      ${renderSection({
    eyebrow: "Initiatives",
    id: "initiatives",
    title: "Independent directions with a clear point of view",
    description: "Longer-running directions that describe how I like to build, not only what I have already shipped.",
    body: `<div class="home-page__initiative-grid">${portfolioContent.initiatives.map(initiative => `<article class="home-page__initiative-card"><div class="home-page__initiative-topline"><span>${escapeHtml(initiative.title)}</span>${renderChip(initiative.status, "warm")}</div><h3>${escapeHtml(initiative.headline)}</h3><p>${escapeHtml(initiative.summary)}</p><div class="home-page__initiative-tags">${initiative.tags.map(tag => renderChip(tag)).join("")}</div></article>`).join("")}</div>`
  })}

      ${renderSection({
    eyebrow: "Open For Opportunities",
    id: "opportunities",
    title: "Available for teams that want depth, not frontend theater",
    description: "The current fit is strongest where architecture and product delivery are both first-class concerns.",
    body: `<article class="home-page__opportunity-card"><div class="home-page__opportunity-copy"><p>${escapeHtml(portfolioContent.opportunity.statement)}</p><div class="home-page__opportunity-actions">${renderButton({ basePath, href: portfolioContent.profile.email, iconRight: "arrow-up-right", label: "Discuss a role" })}${renderButton({ basePath, href: portfolioContent.profile.linkedin, label: "View LinkedIn", targetBlank: true, variant: "ghost" })}</div></div><div class="home-page__opportunity-lists"><div><p class="home-page__card-eyebrow">Best role shape</p><ul>${portfolioContent.opportunity.collaboration.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div><div><p class="home-page__card-eyebrow">Preferred problem space</p><ul>${portfolioContent.opportunity.focus.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div></article>`
  })}

      ${renderSection({
    eyebrow: "Blog",
    id: "blog",
    title: "Writing about frontend systems, tooling, and product engineering",
    description: "Nine markdown-backed notes are surfaced here in a strict 3 by 3 grid. The article routes are generated separately for static hosting.",
    body: `<div class="home-page__blog-grid">${articles.slice(0, 9).map(article => renderBlogCard(article, basePath)).join("")}</div>`
  })}

      <footer class="home-page__footer"><p>Valery FrameMuse Zinchenko</p><div class="home-page__footer-links">${portfolioContent.contacts.map(contact => `<a href="${escapeHtml(contact.href)}"${contact.kind === "email" ? "" : ' rel="noreferrer" target="_blank"'}>${escapeHtml(contact.label)}</a>`).join("")}</div></footer>
    </main>
  `

  return renderDocument({
    body,
    description: "Valery FrameMuse Zinchenko — senior TypeScript and React engineer focused on frontend architecture, reusable libraries, and product delivery.",
    linkTags,
    title: "Valery FrameMuse Zinchenko — Resume & Portfolio"
  })
}

export function renderArticlePageDocument(input: { article: BlogArticle, basePath: string, linkTags: string[], recentArticles: BlogArticle[] }) {
  const { article, basePath, linkTags, recentArticles } = input
  const spriteHref = withBase(basePath, "icons.svg")

  const body = `
    <div id="root">
      <main class="blog-article-page">
        <div class="blog-article-page__shell">
          <a class="blog-article-page__back" href="${escapeHtml(`${withBase(basePath)}#blog`)}">${renderIcon("arrow-up-right", spriteHref)}<span>Back to blog grid</span></a>
          <article class="blog-article-page__article">
            <header class="blog-article-page__hero">
              <p class="blog-article-page__eyebrow">Markdown article</p>
              <h1 class="blog-article-page__title">${escapeHtml(article.title)}</h1>
              <div class="blog-article-page__meta"><span>${escapeHtml(article.publishedAt)}</span><span>${article.readingTime} min read</span></div>
              <div class="blog-article-page__tags">${article.tags.map(tag => renderChip(tag, "accent")).join("")}</div>
              <p class="blog-article-page__summary">${escapeHtml(article.summary)}</p>
            </header>
            <div class="blog-article-page__body">${article.html}</div>
          </article>
          <aside class="blog-article-page__rail"><article class="blog-article-page__rail-card"><p class="blog-article-page__eyebrow">More notes</p><div class="blog-article-page__rail-list">${recentArticles.map(recentArticle => `<a href="${escapeHtml(withBase(basePath, `blog/${recentArticle.slug}/`))}"><strong>${escapeHtml(recentArticle.title)}</strong><span>${escapeHtml(recentArticle.summary)}</span></a>`).join("")}</div></article></aside>
        </div>
      </main>
    </div>
  `

  return renderDocument({
    body,
    description: article.summary,
    linkTags,
    title: `${article.title} — FrameMuse`
  })
}

export async function readArticles(blogsDir: string) {
  const blogFilenames = await readdir(blogsDir)

  return (await Promise.all(
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
}
