"use client"

import { useScopedI18n } from "@/locales/client"

export default function Home() {
  const scopedT = useScopedI18n("app")

  return (
    <>
      <div>
        <h1>{scopedT("title")}</h1>
      </div>
    </>
  )
}
