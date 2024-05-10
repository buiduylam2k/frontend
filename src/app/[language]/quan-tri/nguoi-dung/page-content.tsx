"use client"

import { RoleEnum } from "@/services/api/types/role"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"
import { useMemo, useState } from "react"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"
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
import { toast } from "sonner"
import { useUserListQuery } from "./queries/users-queries"
import { User } from "@/services/api/types/user"
import getRoleName from "@/services/helpers/get-role-name"
import { useDeleteUsersService } from "@/services/api/services/users"
import useAuth from "@/services/auth/use-auth"

const getColumnName = (key: string) => {
  const map: Record<string, string> = {
    email: "Email",
    fullName: "Họ và tên",
    provider: "Loại",
    createdAt: "Ngày tạo",
    role: "Vai trò",
  }
  return map[key]
}

function Users() {
  const { user: authUser } = useAuth()

  const [sorting, setSorting] = useState<SortingState>([])

  const { data, refetch } = useUserListQuery()

  const fetchUserDelete = useDeleteUsersService()

  const result = useMemo(() => {
    const result =
      (data?.pages?.flatMap((page) => page?.data) as User[]) ?? ([] as User[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "fullName",
      header: "Tên",
      cell: ({ row }) => <div>{getUserFullname(row.original)}</div>,
    },
    {
      accessorKey: "provider",
      header: "Loại",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("provider")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Vai trò",
      cell: ({ row }) => {
        return (
          <div className="capitalize">
            {getRoleName(row.original?.role?.id)}
          </div>
        )
      },
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
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const user = row.original
    //     const canDelete = user.id !== authUser?.id

    //     const deleteAction = async () => {
    //       const { status } = await fetchUserDelete({
    //         id: user.id,
    //       })
    //       if (status !== HTTP_CODES_ENUM.NO_CONTENT) {
    //         toast.error("Thất bại", {
    //           description: "Đã có lỗi sảy ra, vui lòng thử lại sau!",
    //         })
    //       } else {
    //         toast.success("Xoá thành công!")
    //         refetch()
    //       }
    //     }

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Hành động</DropdownMenuLabel>

    //           <DropdownMenuSeparator />
    //           {canDelete && (
    //             <DropdownMenuItem onClick={deleteAction}>
    //               Xoá người dùng
    //             </DropdownMenuItem>
    //           )}
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
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
        Danh sách người dùng
      </h2>

      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Tìm kiếm email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} mapperName={getColumnName} />

        <Link href={"/quan-tri/nguoi-dung/them-moi"}>
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
                  Không có người dùng nào.
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

export default withPageRequiredAuth(Users, { roles: [RoleEnum.ADMIN] })
