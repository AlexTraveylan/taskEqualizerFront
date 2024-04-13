"use client"

import { useEffect, useState } from "react"

// un Hook personnalisé pour la gestion des traductions
export function useTranslation(lng: string, file: string) {
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    // Chargement asynchrone du fichier JSON de traduction
    async function loadTranslations() {
      try {
        const response = await fetch(`i18n/locales/${lng}/${file}.json`)
        if (!response.ok) {
          throw new Error(`Le fichier ${file} pour la langue ${lng} n'a pas pu être chargé`)
        }
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error("Erreur lors du chargement des traductions:", error)
      }
    }

    loadTranslations()
  }, [lng, file]) // Exécuter l'effet quand lng ou file change

  // la fonction 't' pour obtenir la traduction d'une clef
  const t = (key: string) => {
    return translations[key as keyof typeof translations] || key // retourne la traduction si existante, sinon clef initiale
  }

  return t
}
