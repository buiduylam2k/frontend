import type { Metadata } from "next"
import EditBlog from "./page-content"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `Chỉnh sửa ${searchParams?.title}`,
  }
}

export default EditBlog
