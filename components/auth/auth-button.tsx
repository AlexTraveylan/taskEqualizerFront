import { useTranslation } from "@/app/i18n/client"
import { Button } from "@/components/ui/button"
import { logoutUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"
import Link from "next/link"

export const AuthButton = ({ lng, path }: { lng: string; path?: string }) => {
  const { t } = useTranslation(lng, "auth-button")
  const { isAuth, authState } = useIsAuth()

  const handleLogout = async () => {
    const response = await fetch(logoutUrl, { credentials: "include" })
    if (response.ok) {
      console.log("logout success")
      authState(false)
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
    <Link href={`/${lng}/auth-page`} passHref>
      <Button aria-label={t("loginButtonAriaLabel")}>{t("loginButtonLabel")}</Button>
    </Link>
  )
}
