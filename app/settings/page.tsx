"use client"

import { PossibleTaskCardForm } from "@/components/settings/possible-task-card-form"
import { Input } from "@/components/ui/input"
import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function SettingsPage() {
  const query = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const [filterKey, setFilterKey] = useState<string>("")

  if (!query.data || !query2.data) {
    return <></>
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl p-3">
          Dashboad de <span className="font-semibold">{query.data.family_name}</span>
        </h2>
        <Input
          placeholder="Search ..."
          onChange={(e) => {
            e.preventDefault()
            setFilterKey(e.currentTarget.value)
          }}
          value={filterKey}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {query2.data
          .filter((possibleTask) => possibleTask.possible_task_name.toLowerCase().includes(filterKey.toLowerCase()))
          .map((possibleTask, index) => (
            <PossibleTaskCardForm key={`${possibleTask.id}pTaskCard${index}`} possibleTask={possibleTask} />
          ))}
      </div>
    </>
  )
}
