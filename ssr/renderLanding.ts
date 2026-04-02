import { portfolioContent } from "../src/entities/profile/model/portfolioContent"
import { showcaseContent } from "../src/entities/profile/model/showcaseContent"

import { type BlogArticle, escapeHtml, withBase } from "./render"


const sceneIds = {
  dossier: "landing-scene-dossier",
  finale: "landing-scene-finale",
  guide: "landing-scene-guide",
  intro: "landing-scene-intro"
} as const

const featuredProjects = portfolioContent.projectGroups.flatMap(group =>
  group.projects.slice(0, 2).map(project => ({
    ...project,
    groupTitle: group.title
  }))
).slice(0, 5)

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
    <meta name="theme-color" content="#120f1d" />
    <title>${escapeHtml(title)}</title>
    ${linkTags.join("\n    ")}
  </head>
  <body>
    ${body}
  </body>
</html>`
}

function renderMascot(comment: string) {
  return `
    <div class="landing-page__guide-panel">
      <div class="landing-page__mascot" aria-hidden="true">
        <span class="landing-page__mascot-bounce"></span>
      </div>
      <div class="landing-page__guide-bubble">
        <p class="landing-page__guide-label">${escapeHtml(showcaseContent.guide.name)}, ${escapeHtml(showcaseContent.guide.role)}</p>
        <p>${escapeHtml(comment)}</p>
      </div>
    </div>
  `
}

export function renderLandingPageDocument(input: { articles: BlogArticle[], basePath: string, linkTags: string[] }) {
  const { articles, basePath, linkTags } = input
  const latestArticle = articles[0]
  const portraitSrc = withBase(basePath, "profile-portrait.png")

  const body = `
    <main class="landing-page" id="top">
      <input class="landing-page__state" checked id="${sceneIds.intro}" name="landing-scene" type="radio" />
      <input class="landing-page__state" id="${sceneIds.guide}" name="landing-scene" type="radio" />
      <input class="landing-page__state" id="${sceneIds.dossier}" name="landing-scene" type="radio" />
      <input class="landing-page__state" id="${sceneIds.finale}" name="landing-scene" type="radio" />

      <div class="landing-page__ambient" aria-hidden="true">
        <span class="landing-page__ambient-orb landing-page__ambient-orb--one"></span>
        <span class="landing-page__ambient-orb landing-page__ambient-orb--two"></span>
        <span class="landing-page__ambient-orb landing-page__ambient-orb--three"></span>
        <span class="landing-page__ambient-grid"></span>
      </div>

      <div class="landing-page__shell">
        <div class="landing-page__progress" aria-label="Tour progress">
          <label for="${sceneIds.intro}">Entrance</label>
          <label for="${sceneIds.guide}">Guide</label>
          <label for="${sceneIds.dossier}">Dossier</label>
          <label for="${sceneIds.finale}">Finale</label>
        </div>

        <section class="landing-page__scene landing-page__scene--intro">
          <div class="landing-page__layout landing-page__layout--intro">
            <div class="landing-page__portrait-stage">
              <div class="landing-page__portrait-glow"></div>
              <figure class="landing-page__portrait-frame">
                <img alt="Portrait of Valery Zinchenko" class="landing-page__portrait-image" src="${escapeHtml(portraitSrc)}" />
              </figure>
              <p class="landing-page__portrait-caption">${escapeHtml(portfolioContent.profile.city)}</p>
            </div>

            <div class="landing-page__copy-block">
              <p class="landing-page__eyebrow">${escapeHtml(showcaseContent.intro.eyebrow)}</p>
              <h1 class="landing-page__title">${escapeHtml(showcaseContent.intro.title)}</h1>
              <p class="landing-page__summary">${escapeHtml(showcaseContent.intro.summary)}</p>
              <p class="landing-page__supporting">${escapeHtml(showcaseContent.intro.supporting)}</p>
              <div class="landing-page__actions">
                <label class="landing-page__control landing-page__control--primary" for="${sceneIds.guide}">${escapeHtml(showcaseContent.intro.prompt)}</label>
                <a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(withBase(basePath, "plain/"))}">Skip to the plain resume</a>
              </div>
            </div>

            ${renderMascot(showcaseContent.guide.comments.intro)}
          </div>
        </section>

        <section class="landing-page__scene landing-page__scene--guide">
          <div class="landing-page__layout landing-page__layout--guide">
            <div class="landing-page__scene-header">
              <p class="landing-page__eyebrow">Who is on stage</p>
              <h2 class="landing-page__section-title">Senior product-minded engineering, introduced with a little less boredom.</h2>
            </div>

            <div class="landing-page__identity-grid">
              ${showcaseContent.identityCards.map(card => `
                <article class="landing-page__identity-card">
                  <p class="landing-page__identity-eyebrow">${escapeHtml(card.eyebrow)}</p>
                  <h3>${escapeHtml(card.title)}</h3>
                  <p>${escapeHtml(card.summary)}</p>
                </article>
              `).join("")}
            </div>

            <div class="landing-page__guide-row">
              ${renderMascot(showcaseContent.guide.comments.identity)}
              <div class="landing-page__signal-list">
                <div><strong>${escapeHtml(portfolioContent.metrics[0]?.value || "")}</strong><span>${escapeHtml(portfolioContent.metrics[0]?.label || "")}</span></div>
                <div><strong>${escapeHtml(portfolioContent.metrics[1]?.value || "")}</strong><span>${escapeHtml(portfolioContent.metrics[1]?.label || "")}</span></div>
                <div><strong>${escapeHtml(portfolioContent.metrics[3]?.value || "")}</strong><span>${escapeHtml(portfolioContent.metrics[3]?.label || "")}</span></div>
              </div>
            </div>

            <div class="landing-page__actions landing-page__actions--end">
              <label class="landing-page__control landing-page__control--primary" for="${sceneIds.dossier}">Open the dossier</label>
            </div>
          </div>
        </section>

        <section class="landing-page__scene landing-page__scene--dossier">
          <div class="landing-page__layout landing-page__layout--dossier">
            <div class="landing-page__scene-header">
              <p class="landing-page__eyebrow">Proof cabinet</p>
              <h2 class="landing-page__section-title">A compact guided resume, with the scrolling trapped inside the cards where it belongs.</h2>
            </div>

            <div class="landing-page__dossier-grid">
              <article class="landing-page__dossier-panel">
                <header>
                  <p class="landing-page__identity-eyebrow">Experience</p>
                  <h3>Recent roles</h3>
                </header>
                <div class="landing-page__dossier-scroll">
                  ${portfolioContent.experience.map(entry => `
                    <div class="landing-page__dossier-item">
                      <div class="landing-page__dossier-topline">
                        <strong>${escapeHtml(entry.company)}</strong>
                        <span>${escapeHtml(entry.period)}</span>
                      </div>
                      <p class="landing-page__dossier-role">${escapeHtml(entry.role)}</p>
                      <p>${escapeHtml(entry.summary)}</p>
                    </div>
                  `).join("")}
                </div>
              </article>

              <article class="landing-page__dossier-panel">
                <header>
                  <p class="landing-page__identity-eyebrow">Projects</p>
                  <h3>Selected work</h3>
                </header>
                <div class="landing-page__dossier-scroll">
                  ${featuredProjects.map(project => `
                    <a class="landing-page__dossier-item landing-page__dossier-item--link" href="${escapeHtml(project.href)}" rel="noreferrer" target="_blank">
                      <div class="landing-page__dossier-topline">
                        <strong>${escapeHtml(project.title)}</strong>
                        <span>${escapeHtml(project.groupTitle)}</span>
                      </div>
                      <p>${escapeHtml(project.summary)}</p>
                    </a>
                  `).join("")}
                </div>
              </article>

              <article class="landing-page__dossier-panel">
                <header>
                  <p class="landing-page__identity-eyebrow">Impact</p>
                  <h3>Things that mattered</h3>
                </header>
                <div class="landing-page__dossier-scroll">
                  ${portfolioContent.impacts.map(impact => `
                    <div class="landing-page__dossier-item">
                      <div class="landing-page__dossier-topline">
                        <strong>${escapeHtml(impact.title)}</strong>
                        <span>${escapeHtml(impact.indicators[0] || "")}</span>
                      </div>
                      <p>${escapeHtml(impact.summary)}</p>
                    </div>
                  `).join("")}
                </div>
              </article>
            </div>

            <div class="landing-page__guide-row">
              ${renderMascot(showcaseContent.guide.comments.dossier)}
              <div class="landing-page__actions landing-page__actions--end">
                <label class="landing-page__control landing-page__control--primary" for="${sceneIds.finale}">Take me to the finale</label>
                <a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(withBase(basePath, "plain/"))}">Read the full plain resume</a>
              </div>
            </div>
          </div>
        </section>

        <section class="landing-page__scene landing-page__scene--finale">
          <div class="landing-page__layout landing-page__layout--finale">
            <div class="landing-page__copy-block landing-page__copy-block--compact">
              <p class="landing-page__eyebrow">Curtain call</p>
              <h2 class="landing-page__section-title">Open for teams that want both product taste and engineering depth.</h2>
              <div class="landing-page__closing-list">
                ${showcaseContent.closingNotes.map(note => `<p>${escapeHtml(note)}</p>`).join("")}
              </div>
              <div class="landing-page__actions landing-page__actions--wrap">
                <a class="landing-page__control landing-page__control--primary" href="${escapeHtml(portfolioContent.profile.email)}">Start a conversation</a>
                <a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(withBase(basePath, "plain/"))}">Plain resume</a>
                ${latestArticle ? `<a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(withBase(basePath, `blog/${latestArticle.slug}/`))}">Latest writing</a>` : ""}
                <a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(portfolioContent.profile.github)}" rel="noreferrer" target="_blank">GitHub</a>
                <a class="landing-page__control landing-page__control--ghost" href="${escapeHtml(portfolioContent.profile.linkedin)}" rel="noreferrer" target="_blank">LinkedIn</a>
              </div>
            </div>

            <div class="landing-page__finale-portrait">
              <div class="landing-page__portrait-glow landing-page__portrait-glow--small"></div>
              <figure class="landing-page__portrait-frame landing-page__portrait-frame--small">
                <img alt="Portrait of Valery Zinchenko" class="landing-page__portrait-image" src="${escapeHtml(portraitSrc)}" />
              </figure>
            </div>

            ${renderMascot(showcaseContent.guide.comments.finale)}

            <div class="landing-page__actions landing-page__actions--end">
              <label class="landing-page__control landing-page__control--ghost" for="${sceneIds.intro}">Restart the show</label>
            </div>
          </div>
        </section>
      </div>
    </main>
  `

  return renderDocument({
    body,
    description: "A staged introduction to Valery FrameMuse Zinchenko: senior TypeScript and React engineer focused on product systems, frontend architecture, and practical delivery.",
    linkTags,
    title: "Valery FrameMuse Zinchenko — Guided Introduction"
  })
}
