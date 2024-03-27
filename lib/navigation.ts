export type NavigationItem = {
  label: string
  href: string
  ariaLabel: string
}

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "Go to Home page",
  },
  {
    label: "account",
    href: "/account",
    ariaLabel: "Go to Account page",
  },
  {
    label: "settings",
    href: "/settings",
    ariaLabel: "Go to Settings page",
  },
  {
    label: "logout",
    href: "/logout",
    ariaLabel: "Go to Logout page",
  },
]
