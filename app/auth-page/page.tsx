"use client"

import { AuthCard } from "@/components/auth/auth-card"
import { useIsAuth } from "@/lib/auth-store"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const { isAuth } = useIsAuth()
  const router = useRouter()

  if (isAuth) {
    router.push("/account")
  }

  return (
    <div className="w-full">
      <AuthCard />
    </div>
  )
}
