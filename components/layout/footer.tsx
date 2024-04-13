"use client"

import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"

export const Footer = () => {
  const { lng } = useLngState()
  const t = useTranslation(lng, "footer")
  return <footer>Footer</footer>
}
