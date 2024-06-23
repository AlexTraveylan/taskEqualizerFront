// locales/client.ts
"use client"
import { createI18nClient } from "next-international/client"

export const { useChangeLocale, useCurrentLocale, useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import("./en"),
  fr: () => import("./fr"),
})

// locales/server.ts
import { createI18nServer } from "next-international/server"

export const { getCurrentLocale, getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import("./en"),
  fr: () => import("./fr"),
})
