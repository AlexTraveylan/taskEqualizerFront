import { NavigationItem } from "@/lib/app-types"

export const navigation: NavigationItem[] = [
  {
    label: new Map([
      ["en", "home"],
      ["fr", "accueil"],
      ["de", "heim"],
    ]),
    href: "/",
    ariaLabel: new Map([
      ["en", "Go to Home page"],
      ["fr", "Aller à la page d'accueil"],
      ["de", "Gehe zur Startseite"],
    ]),
  },
  {
    label: new Map([
      ["en", "about"],
      ["fr", "à propos"],
      ["de", "über"],
    ]),
    href: "/account",
    ariaLabel: new Map([
      ["en", "Go to Account page"],
      ["fr", "Aller à la page de compte"],
      ["de", "Gehe zur Kontoseite"],
    ]),
  },
  {
    label: new Map([
      ["en", "settings"],
      ["fr", "paramètres"],
      ["de", "einstellungen"],
    ]),
    href: "/settings",
    ariaLabel: new Map([
      ["en", "Go to Settings page"],
      ["fr", "Aller à la page des paramètres"],
      ["de", "Gehe zur Einstellungsseite"],
    ]),
  },
  // {
  //   label: new Map([
  //     ["en", "logout"],
  //     ["fr", "déconnexion"],
  //     ["de", "ausloggen"],
  //   ]),
  //   href: "/logout",
  //   ariaLabel: new Map([
  //     ["en", "Go to Logout page"],
  //     ["fr", "Aller à la page de déconnexion"],
  //     ["de", "Gehe zur Abmeldeseite"],
  //   ]),
  // },
]
