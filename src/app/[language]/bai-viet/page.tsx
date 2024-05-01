import type { Metadata } from "next"
import Posts from "./page-content"
import { getServerTranslation } from "@/services/i18n"

type Props = {
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "common")

  return {
    title: t("navigation.posts"),
  }
}

export default Posts
