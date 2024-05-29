"use client"

import { useMemo } from "react"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import { Button } from "@/components/ui/button"
import { usePostListQuery } from "./queries/posts-queries"
import { Post } from "@/services/api/types/post"
import PostCard from "@/components/post-card"
import { useSearchParams } from "next/navigation"
import { TagEnum } from "@/services/api/types/tags"
import TagList from "@/components/tag-list"

export default function Posts() {
  const queryParams = useSearchParams()

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePostListQuery({
      filters: {
        tag: queryParams.get("tag-id") as string,
      },
    })

  const result = useMemo(() => {
    const result =
      (data?.pages?.flatMap((page) => page?.data) as Post[]) ?? ([] as Post[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  return (
    <div className="default-layout my-10 flex-col px-5">
      <TagList
        type={queryParams.get("type") as TagEnum}
        tagId={queryParams.get("tag-id") as string}
      />

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
