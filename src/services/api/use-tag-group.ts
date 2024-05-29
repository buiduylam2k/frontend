import { useQuery } from "@tanstack/react-query"
import { useGetGroupTagService } from "./services/tag"
import HTTP_CODES_ENUM from "./types/http-codes"

export function useTagGroup() {
  const fetchGroupTags = useGetGroupTagService()

  return useQuery({
    queryKey: ["group-tags-menu"],
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchGroupTags({
        signal,
      })

      if (status === HTTP_CODES_ENUM.OK) {
        return data
      }
    },
  })
}
