import { AuthCard } from "@/components/auth/auth-card"

export default async function Account({ params: { lng } }: { params: { lng: string } }) {
  return (
    <div>
      <h1>Account {lng}</h1>
      <AuthCard lng={lng} />
    </div>
  )
}
