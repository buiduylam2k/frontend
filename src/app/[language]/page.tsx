import type { Metadata } from "next"
import { getServerTranslation } from "@/services/i18n"
import CommonTemplate from "@/components/common-template"
import HomePosts from "@/components/home-posts"
import NewBlogs from "@/components/new-blogs"

type Props = {
  params: { language: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home")

  return {
    title: t("title"),
  }
}

export default async function Home() {
  return (
    <CommonTemplate rightSide={<NewBlogs />}>
      <HomePosts />
    </CommonTemplate>
  )
}
