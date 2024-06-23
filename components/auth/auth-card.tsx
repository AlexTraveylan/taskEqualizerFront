"use client"

import { useState } from "react"
import { LoginForm } from "./login-card"

import { RegisterManager } from "./register-manager"

export const AuthCard = () => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)

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
