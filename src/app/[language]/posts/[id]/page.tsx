import type { Metadata } from "next"
import PostDetail from "./page-content"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import wrapperFetchTextResponse from "@/services/api/wrapper-fetch-text-response"

type Props = {
  params: { language: string; id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: title, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/posts/${params.id}/slug`,
    {
      method: "GET",
    }
  ).then(wrapperFetchTextResponse)

  if (status === HTTP_CODES_ENUM.OK) return { title }

  return {
    title: "Chi tiết bài viết",
  }
}

export default PostDetail
