import type { Metadata } from "next"
import CommonTemplate from "@/components/common-template"
import HomePosts from "@/components/home-posts"
import NewBlogs from "@/components/new-blogs"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trang chủ",
  }
}

export default async function Home() {
  return (
    <CommonTemplate rightSide={<NewBlogs />}>
      <HomePosts />
    </CommonTemplate>
  )
}
