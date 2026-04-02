import "./ImpactCard.scss"

import { useState } from "react"

import Expander from "@/shared/components/extrinsic/Expander/Expander"
import Chip from "@/shared/components/intrinsic/Chip/Chip"
import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"


interface ImpactCardProps {
  details: string[]
  indicators: string[]
  summary: string
  tags: string[]
  title: string
}

function ImpactCard({ details, indicators, summary, tags, title }: ImpactCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="impact-card">
      <header className="impact-card__header">
        <div className="impact-card__title-row">
          <h3 className="impact-card__title">{title}</h3>
          <button className="impact-card__toggle" type="button" onClick={() => setExpanded(current => !current)}>
            <span>{expanded ? "Hide case" : "Open case"}</span>
            <Icon className={expanded ? "impact-card__toggle-icon impact-card__toggle-icon--expanded" : "impact-card__toggle-icon"} name={IconName.ChevronDown} />
          </button>
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
      <Expander expanded={expanded}>
        <div className="impact-card__details">
          <ul className="impact-card__detail-list">
            {details.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </Expander>
    </article>
  )
}

export default ImpactCard
