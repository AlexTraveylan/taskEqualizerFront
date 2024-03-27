"use client"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigation } from "@/lib/navigation"

export function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map((item, index) => (
          <NavigationMenuItem key={`navBarItem${index}`}>
            <Link href={item.href} aria-label={item.ariaLabel} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.label}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
