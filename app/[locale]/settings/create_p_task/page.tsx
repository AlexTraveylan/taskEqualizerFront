"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
import { DisplayPossibleTasks } from "@/components/settings/display-p-tasks"
import { InviteCodeForm } from "@/components/settings/invite-code-form"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-5 my-5">
      <DisplayPossibleTasks />
      <div className="flex gap-5 items-center justify-center">
        <InviteCodeForm />
        <PossibleTaskForm />
      </div>
    </div>
  )
}
