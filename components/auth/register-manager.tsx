"use client"

import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { useState } from "react"
import { Button } from "../ui/button"
import { RegisterForm } from "./register-card"
import { RegisterWithCodeForm } from "./register-with-code"

type RegisterState = "pending" | "new" | "invitation"

export function RegisterManager({ setIsLoginCardVisible }: { setIsLoginCardVisible: (value: boolean) => void }) {
  const [state, setState] = useState<RegisterState>("pending")
  const { lng } = useLngState()
  const t = useTranslation(lng, "auth-page")

  if (state === "pending") {
    return (
      <div className="flex flex-wrap gap-5">
        <Button onClick={() => setState("new")}>{t("new_button")}</Button>
        <Button onClick={() => setState("invitation")}>{t("invitation_button")}</Button>
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
