"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUrl } from "@/lib/api-setting"
import { useIsAuth } from "@/lib/auth-store"
import { useScopedI18n } from "@/locales/client"
import { useRouter } from "next/navigation"

export function LoginForm({ setIsLoginCardVisible }: { setIsLoginCardVisible: (value: boolean) => void }) {
  const { authState } = useIsAuth()
  const router = useRouter()
  const scopedT = useScopedI18n("login-card")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = form.get("username")
    const password = form.get("password")

    if (!username || !password) {
      return
    }

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    })

    if (response.ok) {
      console.log("User logged in")
      authState(true)
      router.push("/account")
    } else if (response.status === 400) {
      console.log("Invalid credentials")
    } else {
      console.log("error")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">{scopedT("usernameField")}</Label>
              <Input id="username" name="username" type="text" placeholder="Alex006" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{scopedT("passwordField")}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {scopedT("buttonLabel")}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {scopedT("footerCard")}
          <Button variant={"ghost"} className="underline" onClick={() => setIsLoginCardVisible(false)}>
            {scopedT("footerLink")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
