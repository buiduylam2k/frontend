import type { Metadata } from "next"
import PostDetail from "./page-content"

type Props = {
  params: { language: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rest = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/posts/${params.slug}/seo`,
    {
      method: "GET",
    }
  )
  const title = await rest.text()

  return {
    title: title ?? "Chi tiết bài viết",
  }
}

export default PostDetail
