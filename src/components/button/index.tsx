import { Button as NextUIButton } from "@nextui-org/react"
import type React from "react"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  className: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
}

export const Button = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}: Props) => {
  return (
    <NextUIButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextUIButton>
  )
}
