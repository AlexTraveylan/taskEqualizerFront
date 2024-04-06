"use client"
import { useTranslation } from "@/app/i18n/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ setIsLoginCardVisible, lng }: { setIsLoginCardVisible: (value: boolean) => void; lng: string }) {
  const { i18n } = useTranslation(lng, "login-card")
  const t = i18n.getFixedT(lng, "login-card")

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userName">{t("usernameField")}</Label>
            <Input id="userName" type="text" placeholder="Alex006" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("passwordField")}</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {t("buttonLabel")}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t("footerCard")}
          <Button variant={"ghost"} className="underline" onClick={() => setIsLoginCardVisible(false)}>
            {t("footerLink")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
