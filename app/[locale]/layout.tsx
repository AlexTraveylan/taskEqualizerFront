"use client"
import { Footer } from "@/components/layout/footer"
import { NavBar } from "@/components/layout/header"
import { cn } from "@/lib/utils"
import { I18nProviderClient, useCurrentLocale } from "@/locales/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Inter } from "next/font/google"
import { ReactElement } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const queryClient = new QueryClient()

export default function RootLayout({ params: { locale }, children }: { params: { locale: string }; children: ReactElement }) {
  const lng = useCurrentLocale()
  return (
    <I18nProviderClient locale={locale}>
      <html lang={lng}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={"Generated by create next app"} />
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={cn(inter.className)}>
          <QueryClientProvider client={queryClient}>
            <main className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex flex-grow">{children}</div>
              <Footer />
            </main>
          </QueryClientProvider>
        </body>
      </html>
    </I18nProviderClient>
  )
}
