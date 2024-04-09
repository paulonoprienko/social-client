import React, { useState } from "react"
import { Input } from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

type RegisterType = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        label="email"
        type="email"
        control={control}
        required="Required field"
      />
      <Input
        name="name"
        label="name"
        type="text"
        control={control}
        required="Required field"
      />
      <Input
        name="password"
        label="password"
        type="password"
        control={control}
        required="Required field"
      />

      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Already have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Sign In
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
      </div>
    </form>
  )
}
