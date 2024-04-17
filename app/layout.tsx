"use client"

import { Footer } from "@/components/layout/footer"
import { NavBar } from "@/components/layout/header"
import { useLngState } from "@/lib/lng-store"
import { cn } from "@/lib/utils"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { lng } = useLngState()
  return (
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
  )
}
