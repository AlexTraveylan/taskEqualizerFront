"use client"

import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { useState } from "react"
import { LoginForm } from "./login-card"

import { RegisterManager } from "./register-manager"

export const AuthCard = () => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)
  const { lng } = useLngState()
  const t = useTranslation(lng, "auth-page")

  if (isLoginCardVisible) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="py-5">{t("title")}</h1>
        <LoginForm setIsLoginCardVisible={setIsLoginCardVisible} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="py-5">{t("register_title")}</h1>
      <RegisterManager setIsLoginCardVisible={setIsLoginCardVisible} />
    </div>
  )
}
