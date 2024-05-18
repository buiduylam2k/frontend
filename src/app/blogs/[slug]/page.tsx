import type { Metadata, ResolvingMetadata } from "next"
import BlogDetail from "./page-content"
import { BlogResponse } from "@/services/api/services/blog"
import wrapperFetchJsonResponse from "@/services/api/wrapper-fetch-json-response"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { openGraphImage } from "@/app/shared-metadata"
import getImagePath from "@/services/helpers/get-image-path"

type Props = {
  params: { language: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/blogs/${params.slug}/seo`,
    {
      method: "GET",
    }
  ).then(wrapperFetchJsonResponse<BlogResponse>)

  const previousImages = (await parent).openGraph?.images || []

  let title = "Cos Sin"
  const images = ["/logo.png", ...previousImages]

  if (status === HTTP_CODES_ENUM.OK) {
    title = `${title} | ${data.title}`
    images.push(getImagePath(data.banner))
  }

  return {
    title,
    description:
      "Các bài viết blogs học tập hữu ích cho các bạn học sinh, sinh viên!",
    openGraph: {
      images,
    },
  }
}

export default BlogDetail
