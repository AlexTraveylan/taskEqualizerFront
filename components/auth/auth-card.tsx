"use client"

import { useState } from "react"
import { LoginForm } from "./login-card"
import { RegisterForm } from "./register-card"
import { RegisterWithCodeForm } from "./register-with-code"

export const AuthCard = () => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)

  if (isLoginCardVisible) {
    return <LoginForm setIsLoginCardVisible={setIsLoginCardVisible} />
  }

  return (
    <div className="flex gap-5">
      <RegisterForm setIsLoginCardVisible={setIsLoginCardVisible} />
      <RegisterWithCodeForm setIsLoginCardVisible={setIsLoginCardVisible} />
    </div>
  )
}
