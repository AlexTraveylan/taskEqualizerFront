"use client"

import { AuthCard } from "@/components/auth/auth-card"
import { useIsAuth } from "@/lib/auth-store"
import { useLngState } from "@/lib/lng-store"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const { lng } = useLngState()
  const { isAuth } = useIsAuth()
  const router = useRouter()

  if (isAuth) {
    router.push("/account")
  }

  return (
    <>
      <div>
        <h1>Account {lng}</h1>
        <AuthCard />
      </div>
    </>
  )
}
