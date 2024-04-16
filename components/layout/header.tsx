"use client"

import Link from "next/link"

import { AuthButton } from "@/components/auth/auth-button"
import { LangageSelection } from "@/components/layout/langage-selection"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { familyUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"
import { useLngState } from "@/lib/lng-store"
import { navigation } from "@/lib/navigation"
import { useEffect } from "react"

export function NavBar() {
  const { lng } = useLngState()
  const { isAuth, authState } = useIsAuth()

  const fetchFamily = async () => {
    const response = await fetch(familyUrl, {
      method: "GET",
      credentials: "include",
    })

    authState(response.ok)
  }

  useEffect(() => {
    fetchFamily()
  }, [])

  return (
    <div className="flex gap-2 py-2 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {navigation
            .filter((item) => {
              if (!isAuth) {
                return !item.authRequired
              }
              return true
            })
            .map((item, index) => {
              const ariaLabel = item.ariaLabel.get(lng)
              const label = item.label.get(lng)

              if (!ariaLabel || !label) {
                return null
              }

              const toTitlelabel = label.charAt(0).toUpperCase() + label.slice(1)

              return (
                <NavigationMenuItem key={`navBarItem${index}`}>
                  <Link href={item.href} aria-label={ariaLabel} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{toTitlelabel}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
        </NavigationMenuList>
      </NavigationMenu>
      <AuthButton />
      <LangageSelection />
    </div>
  )
}
