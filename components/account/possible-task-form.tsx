"use client"

import { possibleTaskUrl } from "@/lib/api-setting"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export const PossibleTaskForm = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const possible_task_name = form.get("possible_task_name")
    const description = form.get("description")

    const response = await fetch(possibleTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ possible_task_name, description }),
      credentials: "include",
    })

    if (response.ok) {
      console.log("Possible task created")
      router.refresh()
    } else {
      console.log("error")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">cree task</CardTitle>
        <CardDescription>description creer task</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="possible_task_name">nom de la tache</Label>
              <Input id="possible_task_name" name="possible_task_name" type="text" placeholder="cuisine" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">description</Label>
              <Input id="description" name="description" type="text" required />
            </div>
            <Button type="submit" className="w-full">
              creer task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
