import "./ProjectCard.scss"

import Chip from "@/shared/components/intrinsic/Chip/Chip"
import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"


interface ProjectCardProps {
  href: string
  indicator: string
  kind: string
  summary: string
  tags: string[]
  title: string
}

function ProjectCard({ href, indicator, kind, summary, tags, title }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__meta">
        <span>{kind}</span>
        <span>{indicator}</span>
      </div>
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__summary">{summary}</p>
      <div className="project-card__tags">
        {tags.map(tag => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <a className="project-card__link" href={href} rel="noreferrer" target="_blank">
        <span>View project</span>
        <Icon name={IconName.ArrowUpRight} />
      </a>
    </article>
  )
}

export default ProjectCard