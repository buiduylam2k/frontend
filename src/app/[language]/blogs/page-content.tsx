"use client"

// import { BLOGS_URL } from "@/services/api/config"
// import useFetch from "@/services/api/use-fetch"
// import wrapperFetchJsonResponse from "@/services/api/wrapper-fetch-json-response"
// import dynamic from "next/dynamic"
import { useMemo } from "react"
import { useBlogListQuery } from "./queries/blogs-queries"
import { Blog } from "@/services/api/types/blog"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"

// const CustomEditor = dynamic(
//   () => {
//     return import("@/components/ck-editor/editor")
//   },
//   { ssr: false }
// )

export default function Blogs() {
  // const [content, setContent] = useState(
  //   "<h1>Hello from CKEditor in Next.js!</h1>"
  // )

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBlogListQuery()

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Blog[]) ?? ([] as Blog[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  // const fetchClient = useFetch()

  // const handleContentChange = (data: string) => {
  //   console.log("data", data)

  //   setContent(data)
  // }

  // const handleCreateBlog = async () => {
  //   const { data, status } = await fetchClient(BLOGS_URL, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: `Demo create blog  ${Math.floor(Math.random() * 1000)}`,
  //       content,
  //       tags: [],
  //     }),
  //   }).then(wrapperFetchJsonResponse)
  // }

  return (
    <div className="default-layout mt-10 flex-col px-5">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {result.map((item) => (
          <li key={item.id}>
            <BlogCard {...item} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-10 w-[120px] mx-auto"
        >
          Xem thêm
        </Button>
      )}
    </div>
  )
}
