import { AuthCard } from "@/components/auth/auth-card"
import { Footer } from "@/components/layout/footer"
import { NavBar } from "@/components/layout/header"

export default function AuthPage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <>
      <NavBar lng={lng} path="/auth-page" />
      <div>
        <h1>Account {lng}</h1>
        <AuthCard lng={lng} />
      </div>
      <Footer lng={lng} />
    </>
  )
}
