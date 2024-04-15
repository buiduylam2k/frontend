import type { Metadata } from "next"
import BlogDetail from "./page-content"
import { BlogResponse } from "@/services/api/services/blogs"
import wrapperFetchJsonResponse from "@/services/api/wrapper-fetch-json-response"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"

type Props = {
  params: { language: string; slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data, status } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/blogs/${params.slug}`,
    {
      method: "GET",
    }
  ).then(wrapperFetchJsonResponse<BlogResponse>)

  let title = ""

  if (status === HTTP_CODES_ENUM.OK) title = data.title

  return {
    title,
  }
}

export default BlogDetail
