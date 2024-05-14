"use client"

import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"

export default function SettingsPage() {
  const query = useQuery({ queryKey: ["family"], queryFn: familyService.getFamily })

  return (
    <>
      {query.data && (
        <h2 className="text-3xl p-3">
          Dashboad de <span className="font-semibold">{query.data.family_name}</span>
        </h2>
      )}
      <h1>Commencer !</h1>
    </>
  )
}
