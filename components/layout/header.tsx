"use client"

import Link from "next/link"

import { useTranslation } from "@/app/i18n/client"
import { LangageSelection } from "@/components/layout/langage-selection"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { logoutUrl } from "@/lib/api-setting"
import { navigation } from "@/lib/navigation"
import { redirect } from "next/navigation"
import { Button } from "../ui/button"

export function NavBar({ lng, path }: { lng: string; path?: string }) {
  const { t } = useTranslation(lng, "nav-bar")

  const handleLogout = async () => {
    const response = await fetch(logoutUrl, { credentials: "include" })
    if (response.ok) {
      console.log("logout success")
      redirect(`/${lng}`)
    } else {
      console.log("logout failed")
    }
  }

  return (
    <div className="flex gap-2 py-2 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {navigation.map((item, index) => {
            const ariaLabel = item.ariaLabel.get(lng)
            const label = item.label.get(lng)

            if (!ariaLabel || !label) {
              return null
            }

            const toTitlelabel = label.charAt(0).toUpperCase() + label.slice(1)

            return (
              <NavigationMenuItem key={`navBarItem${index}`}>
                <Link href={`/${lng}${item.href}`} aria-label={ariaLabel} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{toTitlelabel}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <Button onClick={handleLogout} aria-label={t("logoutButtonAriaLabel")}>
        {t("logoutButtonLabel")}
      </Button>
      <LangageSelection lng={lng} path={path} />
    </div>
  )
}
