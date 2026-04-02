import "./HomePage.scss"

import { portfolioContent } from "@/entities/profile/model/portfolioContent"
import { getAllBlogArticles } from "@/features/blog/lib/articles"
import Button from "@/shared/components/intrinsic/Button/Button"
import Chip from "@/shared/components/intrinsic/Chip/Chip"
import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"
import BlogCard from "@/shared/components/kit/BlogCard/BlogCard"
import ImpactCard from "@/shared/components/kit/ImpactCard/ImpactCard"
import MetricBadge from "@/shared/components/kit/MetricBadge/MetricBadge"
import ProjectCard from "@/shared/components/kit/ProjectCard/ProjectCard"
import Section from "@/shared/components/kit/Section/Section"


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
  email: IconName.Mail,
  github: IconName.Github,
  linkedin: IconName.LinkedIn
} as const

function HomePage() {
  const articles = getAllBlogArticles().slice(0, 9)

  return (
    <>
      <header className="home-page-header">
        <div className="home-page-header__bar">
          <a className="home-page-header__brand" href="#top">
            <span className="home-page-header__brand-mark">FM</span>
            <span className="home-page-header__brand-text">FrameMuse</span>
          </a>
          <nav className="home-page-header__nav" aria-label="Section navigation">
            {navItems.map(item => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="home-page" id="top">
        <section className="home-page__hero">
          <div className="home-page__hero-card home-page__hero-card--dark">
            <Chip tone="dark">{portfolioContent.profile.availability}</Chip>
            <p className="home-page__hero-eyebrow">Senior TypeScript / React engineer</p>
            <h1 className="home-page__hero-title">{portfolioContent.profile.headline}</h1>
            <p className="home-page__hero-summary">{portfolioContent.profile.summary}</p>
            <div className="home-page__hero-actions">
              <Button href={portfolioContent.profile.email} iconRight={IconName.ArrowUpRight}>Start a conversation</Button>
              <Button href={portfolioContent.profile.github} target="_blank" variant="ghost">GitHub</Button>
              <Button href={portfolioContent.profile.linkedin} target="_blank" variant="secondary">LinkedIn</Button>
            </div>
          </div>

          <div className="home-page__hero-sidebar">
            <article className="home-page__manifest">
              <div className="home-page__manifest-topline">
                <span>{portfolioContent.profile.name}</span>
                <span>{portfolioContent.profile.alias}</span>
              </div>
              <h2 className="home-page__manifest-title">{portfolioContent.profile.role}</h2>
              <div className="home-page__manifest-item">
                <Icon name={IconName.MapPin} />
                <span>{portfolioContent.profile.city}</span>
              </div>
              <p className="home-page__manifest-copy">{portfolioContent.profile.supporting}</p>
              <div className="home-page__manifest-list">
                {portfolioContent.differentiators.map(item => (
                  <div key={item} className="home-page__manifest-bullet">
                    <Icon name={IconName.Spark} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="home-page__contact-card">
              <p className="home-page__card-eyebrow">Direct links</p>
              <div className="home-page__contact-list">
                {portfolioContent.contacts.map(contact => (
                  <a key={contact.label} className="home-page__contact-link" href={contact.href} rel="noreferrer" target={contact.kind === "email" ? undefined : "_blank"}>
                    <span className="home-page__contact-icon"><Icon name={contactIconMap[contact.kind]} /></span>
                    <span>
                      <strong>{contact.label}</strong>
                      <small>{contact.value}</small>
                    </span>
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="home-page__metrics">
          {portfolioContent.metrics.map(metric => (
            <MetricBadge key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </section>

        <Section
          description="The strongest positioning here is not only frontend implementation. It is senior TypeScript and React engineering with architecture depth, delivery discipline, and a real interest in tools that make the rest of the team faster."
          eyebrow="Bio"
          id="bio"
          title="Product-minded engineering with platform instincts"
        >
          <div className="home-page__bio-grid">
            <article className="home-page__bio-card">
              <p>{portfolioContent.profile.summary}</p>
              <p>{portfolioContent.profile.supporting}</p>
            </article>
            <article className="home-page__principles-card">
              <p className="home-page__card-eyebrow">What usually stands out</p>
              <div className="home-page__principles-list">
                <div>
                  <Icon name={IconName.Code} />
                  <strong>UI craft with technical rigor</strong>
                  <p>Interfaces are treated as systems, not screenshots. Precision and maintainability both matter.</p>
                </div>
                <div>
                  <Icon name={IconName.Layers} />
                  <strong>Architecture without excess abstraction</strong>
                  <p>Reusable structures are valuable only when they keep teams faster and products easier to change.</p>
                </div>
                <div>
                  <Icon name={IconName.Bolt} />
                  <strong>Fast feedback loops</strong>
                  <p>Build speed, tooling ergonomics, and system clarity are treated as part of product throughput.</p>
                </div>
              </div>
            </article>
          </div>
        </Section>

        <Section
          description="Broad frontend and product coverage, backed by platform thinking and selective full-stack depth."
          eyebrow="Skills"
          id="skills"
          title="A stack shaped around delivery, libraries, and maintainable systems"
        >
          <div className="home-page__skills-grid">
            {portfolioContent.skillClusters.map(cluster => (
              <article key={cluster.title} className="home-page__skill-card">
                <h3>{cluster.title}</h3>
                <div className="home-page__skill-tags">
                  {cluster.items.map(item => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          description="Recent years combine framework and library research, client and internal product delivery, audits, backend integrations, and mentoring."
          eyebrow="Experience"
          id="experience"
          title="Senior roles with ownership across code, systems, and delivery"
        >
          <div className="home-page__experience-list">
            {portfolioContent.experience.map(entry => (
              <article key={`${entry.company}-${entry.period}`} className="home-page__experience-card">
                <div className="home-page__experience-topline">
                  <span>{entry.company}</span>
                  <span>{entry.period}</span>
                </div>
                <h3>{entry.role}</h3>
                <p className="home-page__experience-location">{entry.location}</p>
                <p className="home-page__experience-summary">{entry.summary}</p>
                <ul className="home-page__experience-bullets">
                  {entry.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="home-page__experience-stack">
                  {entry.stack.map(item => (
                    <Chip key={item} tone="accent">{item}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          description="Grouped by role so the overview is easier to scan: major portfolio items, smaller self-directed work, and reusable libraries each get their own space under one Projects highlight."
          eyebrow="Projects"
          id="projects"
          title="A cleaner overview of shipped work, side projects, and libraries"
        >
          <div className="home-page__project-sections">
            {portfolioContent.projectGroups.map(group => (
              <section key={group.title} className="home-page__project-section">
                <header className="home-page__project-section-header">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </header>
                <div className="home-page__project-section-grid">
                  {group.projects.map(project => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>

        <Section
          description="Selected cases where the work changed team speed, stability, or clarity in a way that mattered beyond just shipping one feature."
          eyebrow="Impact"
          id="impact"
          title="Interesting impact, kept practical"
        >
          <div className="home-page__impact-grid">
            {portfolioContent.impacts.map(impact => (
              <ImpactCard key={impact.title} {...impact} />
            ))}
          </div>
        </Section>

        <Section
          description="Longer-running directions that describe how I like to build, not only what I have already shipped."
          eyebrow="Initiatives"
          id="initiatives"
          title="Independent directions with a clear point of view"
        >
          <div className="home-page__initiative-grid">
            {portfolioContent.initiatives.map(initiative => (
              <article key={initiative.title} className="home-page__initiative-card">
                <div className="home-page__initiative-topline">
                  <span>{initiative.title}</span>
                  <Chip tone="warm">{initiative.status}</Chip>
                </div>
                <h3>{initiative.headline}</h3>
                <p>{initiative.summary}</p>
                <div className="home-page__initiative-tags">
                  {initiative.tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          description="The current fit is strongest where architecture and product delivery are both first-class concerns."
          eyebrow="Open For Opportunities"
          id="opportunities"
          title="Available for teams that want depth, not frontend theater"
        >
          <article className="home-page__opportunity-card">
            <div className="home-page__opportunity-copy">
              <p>{portfolioContent.opportunity.statement}</p>
              <div className="home-page__opportunity-actions">
                <Button href={portfolioContent.profile.email} iconRight={IconName.ArrowUpRight}>Discuss a role</Button>
                <Button href={portfolioContent.profile.linkedin} target="_blank" variant="ghost">View LinkedIn</Button>
              </div>
            </div>
            <div className="home-page__opportunity-lists">
              <div>
                <p className="home-page__card-eyebrow">Best role shape</p>
                <ul>
                  {portfolioContent.opportunity.collaboration.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="home-page__card-eyebrow">Preferred problem space</p>
                <ul>
                  {portfolioContent.opportunity.focus.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Section>

        <Section
          description="Nine markdown-backed notes are surfaced here in a strict 3 by 3 grid. The article routes are generated separately for static hosting."
          eyebrow="Blog"
          id="blog"
          title="Writing about frontend systems, tooling, and product engineering"
        >
          <div className="home-page__blog-grid">
            {articles.map(article => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </Section>

        <footer className="home-page__footer">
          <p>Valery FrameMuse Zinchenko</p>
          <div className="home-page__footer-links">
            {portfolioContent.contacts.map(contact => (
              <a key={contact.label} href={contact.href} rel="noreferrer" target={contact.kind === "email" ? undefined : "_blank"}>{contact.label}</a>
            ))}
          </div>
        </footer>
      </main>
    </>
  )
}

export default HomePage
