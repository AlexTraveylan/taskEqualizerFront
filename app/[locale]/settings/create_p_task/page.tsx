"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
import { DisplayPossibleTasks } from "@/components/settings/display-p-tasks"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5 my-5">
      <DisplayPossibleTasks />
      <PossibleTaskForm />
    </div>
  )
}
