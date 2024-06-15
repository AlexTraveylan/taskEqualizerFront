"use client"

import { Combobox } from "@/components/settings/combo-box"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { settings_navigation } from "@/lib/navigation"
import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { lng } = useLngState()
  const t = useTranslation(lng, "settings-page")

  const query2 = useQuery({ queryKey: ["familyMembers"], queryFn: familyService.getFamilyMembers })
  const query4 = useQuery({ queryKey: ["myName"], queryFn: memberService.whoIam })

  return (
    <Card className="w-full m-5">
      <CardHeader className="flex-row items-center flex-wrap">
        {query2.data && (
          <Combobox
            items={query2.data.map((member) => {
              const name = member.member_name
              const item = { value: name, label: name }
              if (query4.data?.name === name) {
                item.label = item.label + " 👑"
              }
              return item
            })}
          />
        )}
        <NavigationMenu className="px-4 pb-3">
          <NavigationMenuList>
            <NavigationMenuItem>
              {settings_navigation.map((navItem, index) => {
                return (
                  <Link
                    key={`${index}_${navItem.i18nKey}`}
                    href={`/settings${navItem.href}`}
                    aria-label={t(navItem.i18nAriaKey)}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t(navItem.i18nKey)}</NavigationMenuLink>
                  </Link>
                )
              })}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </CardHeader>
      <Separator></Separator>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
