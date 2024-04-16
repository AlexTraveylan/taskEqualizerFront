"use client"

import { Button } from "@/components/ui/button"
import { logoutUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const AuthButton = () => {
  const { lng } = useLngState()
  const t = useTranslation(lng, "auth-button")
  const { isAuth, authState } = useIsAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch(logoutUrl, { credentials: "include" })
    if (response.ok) {
      console.log("logout success")
      authState(false)
      router.push("/")
    } else {
      console.log("logout failed")
    }
  }

  if (isAuth) {
    return (
      <Button onClick={handleLogout} aria-label={t("logoutButtonAriaLabel")}>
        {t("logoutButtonLabel")}
      </Button>
    )
  }

  return (
    <Link href="/auth-page" passHref>
      <Button aria-label={t("loginButtonAriaLabel")}>{t("loginButtonLabel")}</Button>
    </Link>
  )
}
