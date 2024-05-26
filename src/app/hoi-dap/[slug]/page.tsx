import type { Metadata, ResolvingMetadata } from "next"
import PostDetail from "./page-content"
import wrapperFetchJsonResponse from "@/services/api/wrapper-fetch-json-response"
import { PostResponse } from "@/services/api/services/post"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import getImagePath from "@/services/helpers/get-image-path"
import { siteConfig } from "@/conf/site"

type Props = {
  params: { language: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/posts/${params.slug}`,
    {
      method: "GET",
    }
  ).then(wrapperFetchJsonResponse<PostResponse>)

  const previousImages = (await parent).openGraph?.images || []

  let title = "Chi tiết hỏi đáp"
  const images = [siteConfig.ogImage, ...previousImages]

  if (status === HTTP_CODES_ENUM.OK && data?.title) {
    title = data.title
    images.push(getImagePath(data.banner))
  }

  return {
    title,
    description:
      "Các bài viết học tập hữu ích cho các bạn học sinh, sinh viên!",
    openGraph: {
      images,
    },
  }
}

export default PostDetail
