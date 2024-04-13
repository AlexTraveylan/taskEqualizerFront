"use client"

import { AuthCard } from "@/components/auth/auth-card"
import { useLngState } from "@/lib/lng-store"

export default function AuthPage() {
  const { lng } = useLngState()

  return (
    <>
      <div>
        <h1>Account {lng}</h1>
        <AuthCard />
      </div>
    </>
  )
}
