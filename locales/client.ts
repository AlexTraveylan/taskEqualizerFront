// locales/client.ts
"use client"
import { LanguagePossibles } from "@/lib/app-types"
import { createI18nClient } from "next-international/client"

export const languages: LanguagePossibles[] = ["en", "fr", "de"]

export const { useChangeLocale, useCurrentLocale, useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import("./en"),
  fr: () => import("./fr"),
  de: () => import("./de"),
})
