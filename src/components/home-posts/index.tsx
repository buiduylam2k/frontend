"use client"
import { useMemo } from "react"
import PostCard from "../post-card"
import { usePostListQuery } from "@/app/bai-viet/queries/posts-queries"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import { Post } from "@/services/api/types/post"

export default function HomePosts() {
  const { data } = usePostListQuery()

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Post[]) ?? ([] as Post[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  return (
    <div className="mt-10">
      <ul className="flex flex-col gap-10">
        {result?.map((item) => (
          <li key={item.id}>
            <PostCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
