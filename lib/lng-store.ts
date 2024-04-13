import { create } from "zustand"

type languagePossible = "fr" | "en" | "de"

export const languages: languagePossible[] = ["fr", "en", "de"]

type LngState = {
  lng: languagePossible
  changeLng: (state: languagePossible) => void
}

export const useLngState = create<LngState>((set) => ({
  lng: "fr",
  changeLng: (state) => set({ lng: state }),
}))
