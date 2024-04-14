"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"

export function RegisterWithCodeForm({ setIsLoginCardVisible }: { setIsLoginCardVisible: (value: boolean) => void }) {
  const { lng } = useLngState()
  const t = useTranslation(lng, "register-card")
  const { authState } = useIsAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = form.get("username")
    const invitationCode = form.get("invitationCode")
    const password = form.get("password")

    if (!username || !invitationCode || !password) {
      return
    }

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        invitation_code: invitationCode,
        password: password,
      }),
      credentials: "include",
    })

    if (response.ok) {
      console.log("User registered")
      authState(true)
    } else if (response.status === 400) {
      console.log("User already exists")
    } else {
      console.log("error")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">{t("usernameField")}</Label>
              <Input id="username" name="username" type="text" placeholder="Alex006" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invitationCode">{t("invitationCodeField")}</Label>
              <Input id="invitationCode" name="invitationCode" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t("passwordField")}</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {t("buttonLabel")}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {t("footerCard")}
          <Button variant={"ghost"} className="underline" onClick={() => setIsLoginCardVisible(true)}>
            {t("footerLink")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
