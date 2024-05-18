"use client"

import { useMemo } from "react"
import { useBlogListQuery } from "./queries/blogs-queries"
import { Blog } from "@/services/api/types/blog"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"

export default function Blogs() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBlogListQuery()

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Blog[]) ?? ([] as Blog[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

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
