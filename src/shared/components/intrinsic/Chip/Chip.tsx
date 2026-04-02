import "./Chip.scss"

import type { ReactNode } from "react"

import { classNames } from "@/shared/utils/classNames"


interface ChipProps {
  children: ReactNode
  className?: string
  tone?: "neutral" | "accent" | "warm" | "dark"
}

function Chip({ children, className, tone = "neutral" }: ChipProps) {
  return <span className={classNames("chip", tone !== "neutral" && `chip--${tone}`, className)}>{children}</span>
}

export default Chip