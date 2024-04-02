"use client"

import { AuthCard } from "@/components/auth/auth-card"
import { useState } from "react"

export default function Account() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div>
      <h1>Account</h1>
      <AuthCard />
    </div>
  )
}
