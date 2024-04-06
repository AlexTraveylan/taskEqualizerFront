"use client"

import Link from "next/link"

import { LangageSelection } from "@/components/layout/langage-selection"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigation } from "@/lib/navigation"

export function NavBar({ lng, path }: { lng: string; path?: string }) {
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
                <Link href={item.href} aria-label={ariaLabel} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{toTitlelabel}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <LangageSelection lng={lng} path={path} />
    </div>
  )
}
