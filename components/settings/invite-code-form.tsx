"use client"

import { invitationService } from "@/lib/services/invitation"
import { useScopedI18n } from "@/locales/client"
import { Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

export const InviteCodeForm = () => {
  const [code, setCode] = useState<string>("")
  const scopedT = useScopedI18n("invite-code-form")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const response = await invitationService.createInvitation()
    if (response) {
      setCode(response.code)
    } else {
      console.error("Failed to fetch invitation")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle>{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Input key="code_input" id="code_input" type="text" value={code} disabled />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCopy}>
            <Copy size={23} strokeWidth={1.3} />
          </span>
        </div>
      </CardContent>
      {!code && (
        <CardFooter>
          <Button onClick={handleSubmit}>{scopedT("btn-label")}</Button>
        </CardFooter>
      )}
    </Card>
  )
}
