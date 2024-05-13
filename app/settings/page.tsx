"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
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
import { useLngState } from "@/lib/lng-store"
import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function SettingsPage() {
  const { lng } = useLngState()

  const query = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["familyMembers"], queryFn: familyService.getFamilyMembers })
  const query3 = useQuery({ queryKey: ["familyPossibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query4 = useQuery({ queryKey: ["myName"], queryFn: memberService.whoIam })

  return (
    <Card className="w-full m-5">
      <CardHeader className="flex-row items-center">
        {query2.data && (
          <Combobox
            items={query2.data.map((member) => {
              const name = member.member_name
              const item = { value: name, label: name }
              return item
            })}
          />
        )}
        <NavigationMenu className="px-4 pb-3">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={"/settings"} aria-label={"link1"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{"create possible task"}</NavigationMenuLink>
              </Link>
              <Link href={"/settings"} aria-label={"link2"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{"begin work"}</NavigationMenuLink>
              </Link>
              <Link href={"/settings"} aria-label={"link3"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{"resume"}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </CardHeader>
      <Separator></Separator>
      <CardContent>
        {query.data && (
          <h2 className="text-3xl p-3">
            Dashboad de <span className="font-semibold">{query.data.family_name}</span>
          </h2>
        )}
        <div>
          <PossibleTaskForm />
        </div>
      </CardContent>
    </Card>
  )
}
