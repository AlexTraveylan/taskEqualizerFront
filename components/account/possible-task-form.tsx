"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const PossibleTaskForm = () => {
  const queryClient = useQueryClient()
  const { lng } = useLngState()
  const t = useTranslation(lng, "create-task")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const possible_task_name = form.get("possible_task_name") as string
    const description = form.get("description") as string

    if (!possible_task_name || !description) {
      return
    }
    mutation.mutate({ possible_task_name, description })
  }

  const mutation = useMutation({
    mutationFn: possibleTaskService.createPossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["familyPossibleTasks"] })
    },
  })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="possible_task_name">{t("task_name_field")}</Label>
              <Input id="possible_task_name" name="possible_task_name" type="text" placeholder={t("placeholder_name")} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t("description_field")}</Label>
              <Input id="description" name="description" type="text" required />
            </div>
            <Button type="submit" className="w-full">
              {t("button_label")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
