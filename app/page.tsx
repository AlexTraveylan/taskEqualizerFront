"use client"

import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"

export default function Home() {
  const { lng } = useLngState()
  const t = useTranslation(lng, "translation")

  return (
    <>
      <div>
        <h1>{t("title")}</h1>
      </div>
    </>
  )
}
