import React from "react"
import { type Control, useController } from "react-hook-form"
import { Input as NextUIInput } from "@nextui-org/react"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
}: Props) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })
  return (
    <NextUIInput
      id={name}
      label={label}
      placeholder={placeholder}
      type={type}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  )
}
