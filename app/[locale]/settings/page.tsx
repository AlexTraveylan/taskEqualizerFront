"use client"

import { CurrentTaskForm } from "@/components/settings/current-task"
import { PossibleTaskCardForm } from "@/components/settings/possible-task-card-form"
import { Input } from "@/components/ui/input"
import { familyService } from "@/lib/services/family"
import { taskService } from "@/lib/services/task"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function SettingsPage() {
  const query = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const query3 = useQuery({ queryKey: ["currentTask"], queryFn: taskService.getCurrentTask })
  const [filterKey, setFilterKey] = useState<string>("")
  const scopedT = useScopedI18n("settings-page")

  if (!query.data || !query2.data) {
    return <></>
  }

  if (query3.data) {
    return (
      <>
        <CurrentTaskForm currentTask={query3.data} />
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-5 flex-wrap">
        <h2 className="text-3xl p-3">{scopedT("title_begin_task")}</h2>
        <Input
          placeholder={scopedT("search_label")}
          onChange={(e) => {
            e.preventDefault()
            setFilterKey(e.currentTarget.value)
          }}
          value={filterKey}
          className="w-[280px]"
        />
      </div>
      <div className="flex flex-wrap gap-3 py-5">
        {query2.data
          .filter((possibleTask) => possibleTask.possible_task_name.toLowerCase().includes(filterKey.toLowerCase()))
          .map((possibleTask, index) => (
            <PossibleTaskCardForm key={`${possibleTask.id}pTaskCard${index}`} possibleTask={possibleTask} />
          ))}
      </div>
    </>
  )
}
