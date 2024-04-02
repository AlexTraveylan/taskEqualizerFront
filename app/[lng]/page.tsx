import { useTranslation } from "../i18n"

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await useTranslation(lng)

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  )
}
