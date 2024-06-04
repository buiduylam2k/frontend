"use client"

import { useMemo } from "react"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import { Button } from "@/components/ui/button"
import { usePostListQuery } from "./queries/posts-queries"
import { Post } from "@/services/api/types/post"
import PostCard from "@/components/post-card"

export default function Posts() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePostListQuery()

  const result = useMemo(() => {
    const result =
      (data?.pages?.flatMap((page) => page?.data) as Post[]) ?? ([] as Post[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  return (
    <div className="default-layout mb-10 flex-col px-5">
      <ul className="space-y-10 w-full mt-10">
        {result.map((item) => (
          <li key={item.id}>
            <PostCard {...item} />
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
