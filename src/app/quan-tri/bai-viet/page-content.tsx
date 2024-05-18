"use client"

import { RoleEnum } from "@/services/api/types/role"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"
import { useMemo, useState } from "react"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/my-data-table/data-table-pagination"
import { DataTableViewOptions } from "@/components/my-data-table/data-table-view-options"
import { Plus } from "lucide-react"
import Link from "@/components/link"
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
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import formatDate from "@/services/helpers/format-date"
import { getUserFullname } from "@/services/helpers/get-user-fullname"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PostFilterType } from "./post-filter-types"
import { useDeletePostService } from "@/services/api/services/post"
import { Post } from "@/services/api/types/post"
import { usePostListQuery } from "../../bai-viet/queries/posts-queries"
import getPostUrl from "@/services/helpers/get-post-url"
import EdiableJs from "@/components/editable-js"

const getColumnName = (key: string) => {
  const map: Record<string, string> = {
    title: "Tiêu đề",
    content: "Nội dung",
    views: "Lượt xem",
    author: "Người tạo",
    createdAt: "Ngày tạo",
    id: "",
    banner: "",
    updatedAt: "",
    isDeleted: "",
    tags: "",
    slug: "",
  }
  return map[key]
}

function Posts() {
  const searchParams = useSearchParams()
  const fetchDeletePost = useDeletePostService()
  const router = useRouter()

  const [sorting, setSorting] = useState<SortingState>([])

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter")

    return searchParamsFilter
      ? (JSON.parse(searchParamsFilter) as PostFilterType)
      : undefined
  }, [searchParams])

  // FIXME: fix 10000, not call to server with sort and filter
  const { data, refetch } = usePostListQuery({ filter, limit: 100000 })

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Post[]) ?? ([] as Post[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Post>[] = [
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
        <div className="line-clamp-2">
          <EdiableJs initialValue={row.getValue("content")} preview />
        </div>
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
        <div className="capitalize">
          {formatDate(row.getValue("createdAt"))}
        </div>
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
        const post = row.original

        const deleteAction = async () => {
          const { status } = await fetchDeletePost({
            id: post.id,
          })
          if (status !== HTTP_CODES_ENUM.NO_CONTENT) {
            toast.error("Thất bại", {
              description: "Đã có lỗi sảy ra, vui lòng thử lại sau!",
            })
          } else {
            toast.success("Xoá thành công!")
            refetch()
          }
        }

        const goToEdit = () =>
          router.push(
            `/quan-tri/bai-viet/chinh-sua/${post.slug}?title=${post.title}`
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
                    .writeText(getPostUrl(post.slug))
                    .then(() => {
                      toast.success("Copy thành công!")
                    })
                }}
              >
                Sao chép đường dẫn
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={goToEdit}>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuItem onClick={deleteAction}>
                Xoá post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: result,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="container mx-auto py-10">
      <h2 className="pb-4 text-3xl font-semibold tracking-tight">
        Danh sách bài viết
      </h2>

      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Tìm kiếm tiêu đề"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} mapperName={getColumnName} />

        <Link href={"/quan-tri/bai-viet/them-moi"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có bài viết nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

export default withPageRequiredAuth(Posts, { roles: [RoleEnum.ADMIN] })
