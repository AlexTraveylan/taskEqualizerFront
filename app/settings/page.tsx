"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
import { familyMembersUrl, familyPossibleTasksUrl, familyUrl } from "@/lib/api-setting"
import { useLngState } from "@/lib/lng-store"
import { familySchema } from "@/lib/schema/family"
import { memberSchema } from "@/lib/schema/member"
import { possibleTaskSchema } from "@/lib/schema/possible-task"
import { useQuery } from "@tanstack/react-query"

const fetchFamily = async () => {
  const response = await fetch(familyUrl, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    console.error("Failed to fetch family")
    return
  }

  const data = await response.json()
  try {
    const parsedData = familySchema.parse(data)
    return parsedData
  } catch (error) {
    console.error("Failed to parse family")
  }
}

const fetchFamilyMembers = async () => {
  const response = await fetch(familyMembersUrl, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    console.error("Failed to fetch family members")
    return
  }

  const data = await response.json()
  try {
    const parsedData = memberSchema.array().parse(data)
    return parsedData
  } catch (error) {
    console.error("Failed to parse family members")
  }
}

const fetchFamilyPossibleTasks = async () => {
  const response = await fetch(familyPossibleTasksUrl, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    console.error("Failed to fetch family possible tasks")
    return
  }

  const data = await response.json()
  try {
    const parsedData = possibleTaskSchema.array().parse(data)
    return parsedData
  } catch (error) {
    console.error("Failed to parse family possible tasks")
  }
}

export default function SettingsPage() {
  const { lng } = useLngState()

  const query = useQuery({ queryKey: ["family"], queryFn: fetchFamily })
  const query2 = useQuery({ queryKey: ["familyMembers"], queryFn: fetchFamilyMembers })
  const query3 = useQuery({ queryKey: ["familyPossibleTasks"], queryFn: fetchFamilyPossibleTasks })

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
