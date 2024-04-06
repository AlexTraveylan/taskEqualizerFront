"use client"
import { useState } from "react"
import { LoginForm } from "./login-card"
import { RegisterForm } from "./register-card"

export const AuthCard = ({ lng }: { lng: string }) => {
  const [isLoginCardVisible, setIsLoginCardVisible] = useState(true)

  if (isLoginCardVisible) {
    return <LoginForm setIsLoginCardVisible={setIsLoginCardVisible} lng={lng} />
  }

  return <RegisterForm setIsLoginCardVisible={setIsLoginCardVisible} lng={lng} />
}
