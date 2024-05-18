import EdiableJs from "@/components/editable-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Comment } from "@/services/api/types/comment"
import formatDateRelativeToNow from "@/services/helpers/format-date-relative-to-now"
import { EllipsisIcon } from "lucide-react"

interface CommentItemProps extends Comment {
  isHaveActions?: boolean
  onDelete?: () => void
  onEdit?: () => void
}

export default function CommentItem(props: CommentItemProps) {
  const { author, content, createdAt, isHaveActions, onDelete } = props

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 gap-2 text-sm text-gray-900 dark:text-white font-semibold">
            <Avatar>
              <AvatarImage src={author?.photo?.path} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {(author?.firstName || "") + (author?.lastName || "")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>{formatDateRelativeToNow(createdAt)}</time>
          </p>
        </div>
        {isHaveActions && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem>Sửa</DropdownMenuItem> */}
              <DropdownMenuItem onClick={onDelete}>Xoá</DropdownMenuItem>
              {/* <DropdownMenuItem>Báo cáo</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </footer>

      <EdiableJs preview initialValue={content ?? ""} />
    </article>
  )
}
