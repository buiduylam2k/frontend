"use client"

import { useMemo } from "react"
import { useBlogListQuery } from "./queries/blogs-queries"
import { Blog } from "@/services/api/types/blog"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import TagList from "@/components/tag-list"
import { useSearchParams } from "next/navigation"
import { TagEnum } from "@/services/api/types/tags"

export default function Blogs() {
  const queryParams = useSearchParams()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBlogListQuery({
      filters: {
        tag: queryParams.get("tag-id") as string,
      },
    })

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Blog[]) ?? ([] as Blog[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  return (
    <div className="default-layout mt-10 flex-col px-5">
      <TagList
        type={queryParams.get("type") as TagEnum}
        tagId={queryParams.get("tag-id") as string}
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4 w-full">
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
