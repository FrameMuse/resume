import "./Expander.scss"

import type { ReactNode } from "react"

import { classNames } from "@/shared/utils/classNames"


interface ExpanderProps {
  children: ReactNode
  className?: string
  expanded: boolean
}

function Expander({ children, className, expanded }: ExpanderProps) {
  return (
    <div className={classNames("expander", expanded && "expander--expanded", className)}>
      <div className="expander__inner">{children}</div>
    </div>
  )
}

export default Expander
