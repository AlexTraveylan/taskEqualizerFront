"use client"

import { useState } from "react"
import { LoginForm } from "./login-card"

import { useScopedI18n } from "@/locales/client"
import { RegisterManager } from "./register-manager"

export const AuthCard = () => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)
  const scopedT = useScopedI18n("auth-page")

  if (isLoginCardVisible) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="py-5">{scopedT("title")}</h1>
        <LoginForm setIsLoginCardVisible={setIsLoginCardVisible} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="py-5">{scopedT("register_title")}</h1>
      <RegisterManager setIsLoginCardVisible={setIsLoginCardVisible} />
    </div>
  )
}
