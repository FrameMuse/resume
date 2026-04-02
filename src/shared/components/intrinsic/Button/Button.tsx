import "./Button.scss"

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

import Icon, { IconName } from "@/shared/components/intrinsic/Icon/Icon"
import { classNames } from "@/shared/utils/classNames"


type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "normal" | "compact"

interface ButtonCommonProps {
  children: ReactNode
  className?: string
  iconLeft?: IconName
  iconRight?: IconName
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonProps =
  | (ButtonCommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (ButtonCommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })

function isLinkButton(props: ButtonProps): props is ButtonCommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string } {
  return typeof props.href === "string"
}

function ButtonIcon({ name }: { name?: IconName }) {
  if (name == null) return null
  return <Icon className="button__icon" name={name} />
}

function Button(props: ButtonProps) {
  const variant = props.variant || "primary"
  const size = props.size || "normal"
  const classes = classNames("button", `button--${variant}`, size === "compact" && "button--compact", props.className)

  if (isLinkButton(props)) {
    const { children, className: _className, href, iconLeft, iconRight, rel, size: _size, target, variant: _variant, ...anchorProps } = props
    return (
      <a {...anchorProps} className={classes} href={href} rel={target === "_blank" ? rel || "noreferrer" : rel} target={target}>
        <ButtonIcon name={iconLeft} />
        <span>{children}</span>
        <ButtonIcon name={iconRight} />
      </a>
    )
  }

  const { children, className: _className, iconLeft, iconRight, size: _size, type, variant: _variant, ...buttonProps } = props
  const resolvedType = type === "submit" || type === "reset" ? type : "button"

  return (
    <button {...buttonProps} className={classes} type={resolvedType}>
      <ButtonIcon name={iconLeft} />
      <span>{children}</span>
      <ButtonIcon name={iconRight} />
    </button>
  )
}

export default Button
