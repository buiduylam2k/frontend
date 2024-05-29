"use client"
import { useGetTagByTypeService } from "@/services/api/services/tag"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { Tag } from "@/services/api/types/tags"
import { useQuery } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { usePathname, useRouter } from "next/navigation"

interface TagListProps {
  type: Tag["type"]
  tagId: Tag["id"]
}

function TagList(props: TagListProps) {
  const { type, tagId } = props
  const router = useRouter()
  const pathname = usePathname()

  const fetch = useGetTagByTypeService()

  const { data } = useQuery({
    queryKey: [type],
    queryFn: async ({ signal }) => {
      const { data, status } = await fetch(
        {
          type,
        },
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return data
      }
    },
  })

  if (!data?.length) {
    return null
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.map((t) => (
        <Button
          onClick={() => router.push(`${pathname}?type=${type}&tag-id=${t.id}`)}
          key={t.id}
          variant={t.id === tagId ? "default" : "secondary"}
        >
          {t.name}
        </Button>
      ))}
    </div>
  )
}

export default TagList
