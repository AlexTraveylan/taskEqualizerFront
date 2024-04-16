"use client"

import { PossibleTaskForm } from "@/components/account/possible-task-form"
import { familyMembersUrl, familyPossibleTasksUrl, familyUrl } from "@/lib/api-setting"
import { useLngState } from "@/lib/lng-store"
import { Family, familySchema } from "@/lib/schema/family"
import { Member, memberSchema } from "@/lib/schema/member"
import { PossibleTask, possibleTaskSchema } from "@/lib/schema/possible-task"
import { useEffect, useState } from "react"

export default function Settings() {
  const { lng } = useLngState()
  const [family, setFamily] = useState<Family | null>(null)
  const [familyMembers, setFamilyMembers] = useState<Member[] | null>(null)
  const [familyPossibleTasks, setFamilyPossibleTasks] = useState<PossibleTask[] | null>(null)

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
      setFamily(parsedData)
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
      setFamilyMembers([...parsedData])
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
      setFamilyPossibleTasks([...parsedData])
    } catch (error) {
      console.error("Failed to parse family possible tasks")
    }
  }

  useEffect(() => {
    fetchFamily()
    fetchFamilyMembers()
    fetchFamilyPossibleTasks()
  }, [])

  return (
    <>
      <div>
        <h1>Account page de la langue {lng}</h1>
        {family && <h2>Nom de la famille : {family.family_name}</h2>}
        {familyMembers && (
          <>
            <h2>Liste des membres : </h2>
            <ul>
              {familyMembers.map((member) => (
                <li key={member.id}>{member.member_name}</li>
              ))}
            </ul>
          </>
        )}
        <PossibleTaskForm />
        {familyPossibleTasks && (
          <>
            <h2>Liste des taches possible : </h2>
            <ul>
              {familyPossibleTasks.map((possibleTask) => (
                <li key={possibleTask.id}>{possibleTask.possible_task_name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
