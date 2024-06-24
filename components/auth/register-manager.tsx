"use client"

import { useScopedI18n } from "@/locales/client"
import { useState } from "react"
import { Button } from "../ui/button"
import { RegisterForm } from "./register-card"
import { RegisterWithCodeForm } from "./register-with-code"

type RegisterState = "pending" | "new" | "invitation"

export function RegisterManager({ setIsLoginCardVisible }: { setIsLoginCardVisible: (value: boolean) => void }) {
  const [state, setState] = useState<RegisterState>("pending")
  const scopedT = useScopedI18n("auth-page")

  if (state === "pending") {
    return (
      <div className="flex flex-wrap gap-5">
        <Button onClick={() => setState("new")}>{scopedT("new_button")}</Button>
        <Button onClick={() => setState("invitation")}>{scopedT("invitation_button")}</Button>
      </div>
    )
  }

  if (state === "new") {
    return <RegisterForm setIsLoginCardVisible={setIsLoginCardVisible} />
  }

  if (state === "invitation") {
    return <RegisterWithCodeForm setIsLoginCardVisible={setIsLoginCardVisible} />
  }
}
