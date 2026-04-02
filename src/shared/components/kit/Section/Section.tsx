import "./Section.scss"

import type { ReactNode } from "react"


interface SectionProps {
  children: ReactNode
  description?: string
  eyebrow: string
  id?: string
  title: string
}

function Section({ children, description, eyebrow, id, title }: SectionProps) {
  return (
    <section className="section" id={id}>
      <header className="section__header">
        <p className="section__eyebrow">{eyebrow}</p>
        <h2 className="section__title">{title}</h2>
        {description ? <p className="section__description">{description}</p> : null}
      </header>
      {children}
    </section>
  )
}

export default Section
