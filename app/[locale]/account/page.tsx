"use client"

import { useCurrentLocale } from "@/locales/client"

export default function AccountPage() {
  const lng = useCurrentLocale()
  return (
    <>
      <div>
        <h1>Account page de la langue {lng}</h1>
      </div>
    </>
  )
}
