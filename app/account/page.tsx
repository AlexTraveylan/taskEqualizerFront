"use client"

import { useLngState } from "@/lib/lng-store"

export default function AccountPage() {
  const { lng } = useLngState()

  return (
    <>
      <div>
        <h1>Account page de la langue {lng}</h1>
      </div>
    </>
  )
}
