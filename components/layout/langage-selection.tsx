"use client"

import { ImageType, LanguagePossibles } from "@/lib/app-types"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

import { languages, useChangeLocale, useCurrentLocale } from "@/locales/client"
import Image from "next/image"

export const flagsImg: Map<LanguagePossibles, ImageType> = new Map([
  [
    "de",
    {
      src: "/images/flags/germany_141_80.jpg",
      alt: "German flag",
      width: 141,
      height: 80,
    },
  ],
  [
    "en",
    {
      src: "/images/flags/england_139_81.jpg",
      alt: "English flag",
      width: 139,
      height: 81,
    },
  ],
  [
    "fr",
    {
      src: "/images/flags/france_141_80.jpg",
      alt: "French flag",
      width: 141,
      height: 80,
    },
  ],
])

export const LangageSelection = () => {
  const lng = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const currentFlag = flagsImg.get(lng)

  if (!currentFlag) {
    console.error(`No flag found for language ${lng}`)
    return null
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="flex gap-3">
          <Image src={currentFlag.src} alt={currentFlag.alt} height={15} width={30} />
          <span>{lng.toLocaleUpperCase()}</span>
        </MenubarTrigger>
        <MenubarContent>
          {languages
            .filter((l) => lng !== l)
            .map((l, index) => {
              const flag = flagsImg.get(l)

              if (!flag) {
                console.error(`No flag found for language ${l}`)
                return null
              }

              return (
                <MenubarItem key={`lng_${index}_${l}`}>
                  <button onClick={() => changeLocale(l)} className="flex gap-3">
                    <Image src={flag.src} alt={flag.alt} height={15} width={30} />
                    <span>{l.toLocaleUpperCase()}</span>
                  </button>
                </MenubarItem>
              )
            })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
