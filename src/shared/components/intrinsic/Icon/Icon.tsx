import "./Icon.scss"

import type { SVGAttributes } from "react"

import { withBaseUrl } from "@/shared/utils/baseUrl"
import { classNames } from "@/shared/utils/classNames"


export enum IconName {
  ArrowUpRight = "arrow-up-right",
  Bolt = "bolt",
  Book = "book",
  Briefcase = "briefcase",
  ChevronDown = "chevron-down",
  Code = "code",
  Github = "github",
  Globe = "globe",
  Layers = "layers",
  LinkedIn = "linkedin",
  Mail = "mail",
  MapPin = "map-pin",
  Spark = "spark"
}

interface IconProps extends SVGAttributes<SVGSVGElement> {
  label?: string
  name: IconName
}

function Icon({ className, label, name, ...props }: IconProps) {
  return (
    <svg
      {...props}
      className={classNames("icon", className)}
      aria-hidden={label == null}
      role={label ? "img" : undefined}
    >
      {label ? <title>{label}</title> : null}
      <use href={`${withBaseUrl("icons.svg")}#${name}`} />
    </svg>
  )
}

export default Icon
