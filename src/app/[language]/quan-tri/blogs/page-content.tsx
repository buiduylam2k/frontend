"use client"

import { RoleEnum } from "@/services/api/types/role"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"
import { useMemo, useState } from "react"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
import { useSearchParams } from "next/navigation"
import { columns } from "./columns"
import { Blog } from "@/services/api/types/blog"
import { useBlogListQuery } from "../../blogs/queries/blogs-queries"
import { BlogFilterType } from "./blog-filter-types"
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
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "@/components/link"

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

function Blogs() {
  const searchParams = useSearchParams()

  const [sorting, setSorting] = useState<SortingState>([])

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter")

    return searchParamsFilter
      ? (JSON.parse(searchParamsFilter) as BlogFilterType)
      : undefined
  }, [searchParams])

  // FIXME: fix 10000, not call to server with sort and filter
  const { data, refetch } = useBlogListQuery({ filter, limit: 100000 })

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Blog[]) ?? ([] as Blog[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
        Danh sách blogs
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

        <Link href={"/quan-tri/blogs/them-moi"}>
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
                  Không có bài blog nào.
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

export default withPageRequiredAuth(Blogs, { roles: [RoleEnum.ADMIN] })
