import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/services/api/types/user"
import { EllipsisIcon, MessageSquareMoreIcon } from "lucide-react"
import Image from "next/image"

interface CommentItemProps {
  user?: User
  message?: unknown
}

export default function CommentItem(props: CommentItemProps) {
  console.log(props)

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <Image
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
              width={24}
              height={24}
            />
            Michael Gough
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>Feb. 8, 2022</time>
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Sửa</DropdownMenuItem>
            <DropdownMenuItem>Xoá</DropdownMenuItem>
            <DropdownMenuItem>Báo cáo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>

      <p className="text-gray-500 dark:text-gray-400">
        Very straight-to-point article. Really worth time reading. Thank you!
        But tools are just the instruments for the UX designers. The knowledge
        of the design tools are as important as the creation of the design
        strategy.
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <Button variant={"ghost"}>
          <MessageSquareMoreIcon className="mr-2 h-4 w-4" /> Trả lời
        </Button>
      </div>
    </article>
  )
}
