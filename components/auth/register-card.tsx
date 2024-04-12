import { useTranslation } from "@/app/i18n/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"

export function RegisterForm({ setIsLoginCardVisible, lng }: { setIsLoginCardVisible: (value: boolean) => void; lng: string }) {
  const { i18n } = useTranslation(lng, "register-card")
  const t = i18n.getFixedT(lng, "register-card")
  const { authState } = useIsAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = form.get("username")
    const familyName = form.get("familyName")
    const password = form.get("password")

    if (!username || !familyName || !password) {
      return
    }

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        family_name: familyName,
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
              <Label htmlFor="familyName">{t("familyNameField")}</Label>
              <Input id="familyName" name="familyName" type="text" required />
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
