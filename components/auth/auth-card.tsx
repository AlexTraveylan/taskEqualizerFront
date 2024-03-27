"use client"
import { useState } from "react"
import { LoginForm } from "./login-card"
import { RegisterForm } from "./register-card"

export const AuthCard = () => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)

  if (isLoginCardVisible) {
    return <LoginForm setIsLoginCardVisible={setIsLoginCardVisible} />
  }

  return <RegisterForm setIsLoginCardVisible={setIsLoginCardVisible} />
}
