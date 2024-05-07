"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
import { useLngState } from "@/lib/lng-store"
import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"

export default function SettingsPage() {
  const { lng } = useLngState()

  const query = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })
  const query2 = useQuery({ queryKey: ["familyMembers"], queryFn: familyService.getFamilyMembers })
  const query3 = useQuery({ queryKey: ["familyPossibleTasks"], queryFn: familyService.getFamilyPossibleTasks })

  return (
    <>
      <div>
        <h1>Account page de la langue {lng}</h1>
        {query.data && <h2>Nom de la famille : {query.data.family_name}</h2>}
        {query2.data?.map((member) => (
          <li key={member.id}>{member.member_name}</li>
        ))}
        <PossibleTaskForm />
        {query3.data?.map((possibleTask) => (
          <li key={possibleTask.id}>{possibleTask.possible_task_name}</li>
        ))}
      </div>
    </>
  )
}
