import { Footer } from "@/components/layout/footer"
import { NavBar } from "@/components/layout/header"
import { useTranslation } from "../i18n"

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)

  return (
    <>
      <NavBar lng={lng} path="/" />
      <div>
        <h1>{t("title")}</h1>
      </div>
      <Footer lng={lng} />
    </>
  )
}
