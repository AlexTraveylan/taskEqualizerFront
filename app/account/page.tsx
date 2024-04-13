"use client"

import { useLngState } from "@/lib/lng-store"

export default function Account() {
  const { lng } = useLngState()

  return (
    <>
      <div>
        <h1>Account {lng}</h1>
      </div>
    </>
  )
}
