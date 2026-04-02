import "./ImpactCard.scss"

import Chip from "@/shared/components/intrinsic/Chip/Chip"
import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"


interface ImpactCardProps {
  details: string[]
  indicators: string[]
  summary: string
  tags: string[]
  title: string
}

function toImpactId(title: string) {
  return `impact-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
}

function ImpactCard({ details, indicators, summary, tags, title }: ImpactCardProps) {
  const toggleId = toImpactId(title)

  return (
    <article className="impact-card">
      <input className="impact-card__toggle-input" id={toggleId} type="checkbox" />
      <header className="impact-card__header">
        <div className="impact-card__title-row">
          <h3 className="impact-card__title">{title}</h3>
          <label className="impact-card__toggle" htmlFor={toggleId}>
            <span className="impact-card__toggle-open">Open case</span>
            <span className="impact-card__toggle-close">Hide case</span>
            <Icon className="impact-card__toggle-icon" name={IconName.ChevronDown} />
          </label>
        </div>
        <p className="impact-card__summary">{summary}</p>
        <div className="impact-card__chips">
          {indicators.map(indicator => (
            <Chip key={indicator} tone="warm">{indicator}</Chip>
          ))}
        </div>
        <div className="impact-card__tags">
          {tags.map(tag => (
            <Chip key={tag} tone="accent">{tag}</Chip>
          ))}
        </div>
      </header>
      <div className="impact-card__details-shell">
        <div className="impact-card__details">
          <ul className="impact-card__detail-list">
            {details.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default ImpactCard
