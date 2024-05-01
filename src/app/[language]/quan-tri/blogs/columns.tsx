"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteBlogService } from "@/services/api/services/blogs"
import { Blog } from "@/services/api/types/blog"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import formatDate from "@/services/helpers/format-date"
import getBlogUrl from "@/services/helpers/get-blog-url"
import { getUserFullname } from "@/services/helpers/get-user-fullname"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const columns: ColumnDef<Blog>[] = [
  // delete many
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => (
      <div className="line-clamp-2">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    cell: ({ row }) => (
      <div
        className="ck-content line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: row.getValue("content"),
        }}
      />
    ),
  },
  {
    accessorKey: "views",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("views")} lượt xem</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lượt xem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "author",
    header: "Người tạo",
    cell: ({ row }) => (
      <div className="capitalize">
        {getUserFullname(row.getValue("author"))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const blog = row.original
      const fetchDeleteBlog = useDeleteBlogService()
      const router = useRouter()

      const deleteAction = async () => {
        const { status } = await fetchDeleteBlog({
          id: blog.id,
        })

        if (status !== HTTP_CODES_ENUM.NO_CONTENT) {
          toast.error("Thất bại", {
            description: "Đã có lỗi sảy ra, vui lòng thử lại sau!",
          })
        } else {
          toast.success("Xoá thành công!")
          // trick update list
          router.replace("/quan-tri/blogs")
        }
      }

      const goToEdit = () =>
        router.push(
          `/quan-tri/blogs/chinh-sua/${blog.slug}?title=${blog.title}`
        )

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard
                  .writeText(getBlogUrl(blog.slug))
                  .then(() => {
                    toast.success("Copy thành công!")
                  })
              }}
            >
              Sao chép đường dẫn
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={goToEdit}>Chỉnh sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={deleteAction}>Xoá blog</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
