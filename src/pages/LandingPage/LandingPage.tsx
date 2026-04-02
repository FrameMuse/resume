import "./LandingPage.scss"

import { portfolioContent } from "@/entities/profile/model/portfolioContent"
import { showcaseContent } from "@/entities/profile/model/showcaseContent"
import { getAllBlogArticles } from "@/features/blog/lib/articles"
import { withBaseUrl } from "@/shared/utils/baseUrl"


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

function Mascot({ comment }: { comment: string }) {
  return (
    <div className="landing-page__guide-panel">
      <div className="landing-page__mascot" aria-hidden="true">
        <span className="landing-page__mascot-bounce" />
      </div>
      <div className="landing-page__guide-bubble">
        <p className="landing-page__guide-label">{showcaseContent.guide.name}, {showcaseContent.guide.role}</p>
        <p>{comment}</p>
      </div>
    </div>
  )
}

function LandingPage() {
  const latestArticle = getAllBlogArticles()[0]

  return (
    <main className="landing-page" id="top">
      <input className="landing-page__state" defaultChecked id={sceneIds.intro} name="landing-scene" type="radio" />
      <input className="landing-page__state" id={sceneIds.guide} name="landing-scene" type="radio" />
      <input className="landing-page__state" id={sceneIds.dossier} name="landing-scene" type="radio" />
      <input className="landing-page__state" id={sceneIds.finale} name="landing-scene" type="radio" />

      <div className="landing-page__ambient" aria-hidden="true">
        <span className="landing-page__ambient-orb landing-page__ambient-orb--one" />
        <span className="landing-page__ambient-orb landing-page__ambient-orb--two" />
        <span className="landing-page__ambient-orb landing-page__ambient-orb--three" />
        <span className="landing-page__ambient-grid" />
      </div>

      <div className="landing-page__shell">
        <div className="landing-page__progress" aria-label="Tour progress">
          <label htmlFor={sceneIds.intro}>Entrance</label>
          <label htmlFor={sceneIds.guide}>Guide</label>
          <label htmlFor={sceneIds.dossier}>Dossier</label>
          <label htmlFor={sceneIds.finale}>Finale</label>
        </div>

        <section className="landing-page__scene landing-page__scene--intro">
          <div className="landing-page__layout landing-page__layout--intro">
            <div className="landing-page__portrait-stage">
              <div className="landing-page__portrait-glow" />
              <figure className="landing-page__portrait-frame">
                <img alt="Portrait of Valery Zinchenko" className="landing-page__portrait-image" src={withBaseUrl("profile-portrait.png")} />
              </figure>
              <p className="landing-page__portrait-caption">{portfolioContent.profile.city}</p>
            </div>

            <div className="landing-page__copy-block">
              <p className="landing-page__eyebrow">{showcaseContent.intro.eyebrow}</p>
              <h1 className="landing-page__title">{showcaseContent.intro.title}</h1>
              <p className="landing-page__summary">{showcaseContent.intro.summary}</p>
              <p className="landing-page__supporting">{showcaseContent.intro.supporting}</p>
              <div className="landing-page__actions">
                <label className="landing-page__control landing-page__control--primary" htmlFor={sceneIds.guide}>{showcaseContent.intro.prompt}</label>
                <a className="landing-page__control landing-page__control--ghost" href={withBaseUrl("plain/")}>Skip to the plain resume</a>
              </div>
            </div>

            <Mascot comment={showcaseContent.guide.comments.intro} />
          </div>
        </section>

        <section className="landing-page__scene landing-page__scene--guide">
          <div className="landing-page__layout landing-page__layout--guide">
            <div className="landing-page__scene-header">
              <p className="landing-page__eyebrow">Who is on stage</p>
              <h2 className="landing-page__section-title">Senior product-minded engineering, introduced with a little less boredom.</h2>
            </div>

            <div className="landing-page__identity-grid">
              {showcaseContent.identityCards.map(card => (
                <article key={card.title} className="landing-page__identity-card">
                  <p className="landing-page__identity-eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                </article>
              ))}
            </div>

            <div className="landing-page__guide-row">
              <Mascot comment={showcaseContent.guide.comments.identity} />
              <div className="landing-page__signal-list">
                <div>
                  <strong>{portfolioContent.metrics[0]?.value}</strong>
                  <span>{portfolioContent.metrics[0]?.label}</span>
                </div>
                <div>
                  <strong>{portfolioContent.metrics[1]?.value}</strong>
                  <span>{portfolioContent.metrics[1]?.label}</span>
                </div>
                <div>
                  <strong>{portfolioContent.metrics[3]?.value}</strong>
                  <span>{portfolioContent.metrics[3]?.label}</span>
                </div>
              </div>
            </div>

            <div className="landing-page__actions landing-page__actions--end">
              <label className="landing-page__control landing-page__control--primary" htmlFor={sceneIds.dossier}>Open the dossier</label>
            </div>
          </div>
        </section>

        <section className="landing-page__scene landing-page__scene--dossier">
          <div className="landing-page__layout landing-page__layout--dossier">
            <div className="landing-page__scene-header">
              <p className="landing-page__eyebrow">Proof cabinet</p>
              <h2 className="landing-page__section-title">A compact guided resume, with the scrolling trapped inside the cards where it belongs.</h2>
            </div>

            <div className="landing-page__dossier-grid">
              <article className="landing-page__dossier-panel">
                <header>
                  <p className="landing-page__identity-eyebrow">Experience</p>
                  <h3>Recent roles</h3>
                </header>
                <div className="landing-page__dossier-scroll">
                  {portfolioContent.experience.map(entry => (
                    <div key={`${entry.company}-${entry.period}`} className="landing-page__dossier-item">
                      <div className="landing-page__dossier-topline">
                        <strong>{entry.company}</strong>
                        <span>{entry.period}</span>
                      </div>
                      <p className="landing-page__dossier-role">{entry.role}</p>
                      <p>{entry.summary}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="landing-page__dossier-panel">
                <header>
                  <p className="landing-page__identity-eyebrow">Projects</p>
                  <h3>Selected work</h3>
                </header>
                <div className="landing-page__dossier-scroll">
                  {featuredProjects.map(project => (
                    <a key={project.title} className="landing-page__dossier-item landing-page__dossier-item--link" href={project.href} rel="noreferrer" target="_blank">
                      <div className="landing-page__dossier-topline">
                        <strong>{project.title}</strong>
                        <span>{project.groupTitle}</span>
                      </div>
                      <p>{project.summary}</p>
                    </a>
                  ))}
                </div>
              </article>

              <article className="landing-page__dossier-panel">
                <header>
                  <p className="landing-page__identity-eyebrow">Impact</p>
                  <h3>Things that mattered</h3>
                </header>
                <div className="landing-page__dossier-scroll">
                  {portfolioContent.impacts.map(impact => (
                    <div key={impact.title} className="landing-page__dossier-item">
                      <div className="landing-page__dossier-topline">
                        <strong>{impact.title}</strong>
                        <span>{impact.indicators[0]}</span>
                      </div>
                      <p>{impact.summary}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="landing-page__guide-row">
              <Mascot comment={showcaseContent.guide.comments.dossier} />
              <div className="landing-page__actions landing-page__actions--end">
                <label className="landing-page__control landing-page__control--primary" htmlFor={sceneIds.finale}>Take me to the finale</label>
                <a className="landing-page__control landing-page__control--ghost" href={withBaseUrl("plain/")}>Read the full plain resume</a>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-page__scene landing-page__scene--finale">
          <div className="landing-page__layout landing-page__layout--finale">
            <div className="landing-page__copy-block landing-page__copy-block--compact">
              <p className="landing-page__eyebrow">Curtain call</p>
              <h2 className="landing-page__section-title">Open for teams that want both product taste and engineering depth.</h2>
              <div className="landing-page__closing-list">
                {showcaseContent.closingNotes.map(note => (
                  <p key={note}>{note}</p>
                ))}
              </div>
              <div className="landing-page__actions landing-page__actions--wrap">
                <a className="landing-page__control landing-page__control--primary" href={portfolioContent.profile.email}>Start a conversation</a>
                <a className="landing-page__control landing-page__control--ghost" href={withBaseUrl("plain/")}>Plain resume</a>
                {latestArticle ? <a className="landing-page__control landing-page__control--ghost" href={withBaseUrl(`blog/${latestArticle.slug}/`)}>Latest writing</a> : null}
                <a className="landing-page__control landing-page__control--ghost" href={portfolioContent.profile.github} rel="noreferrer" target="_blank">GitHub</a>
                <a className="landing-page__control landing-page__control--ghost" href={portfolioContent.profile.linkedin} rel="noreferrer" target="_blank">LinkedIn</a>
              </div>
            </div>

            <div className="landing-page__finale-portrait">
              <div className="landing-page__portrait-glow landing-page__portrait-glow--small" />
              <figure className="landing-page__portrait-frame landing-page__portrait-frame--small">
                <img alt="Portrait of Valery Zinchenko" className="landing-page__portrait-image" src={withBaseUrl("profile-portrait.png")} />
              </figure>
            </div>

            <Mascot comment={showcaseContent.guide.comments.finale} />

            <div className="landing-page__actions landing-page__actions--end">
              <label className="landing-page__control landing-page__control--ghost" htmlFor={sceneIds.intro}>Restart the show</label>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LandingPage
