"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { DialogProps } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { FileIcon } from "lucide-react"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { useGlobalSearchListQuery } from "./global-search-queries"
import useDebounce from "@/lib/use-debounce"
import { GlobalSearch } from "@/services/api/types/global-search"
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects"

export type CMDMenuRef = {
  open: () => void
}

export default forwardRef<CMDMenuRef>(function CommandMenu(
  { ...props }: DialogProps,
  ref
) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearchQuery = useDebounce(search, 600)

  const { data } = useGlobalSearchListQuery({
    filters: { name: debouncedSearchQuery.trim() },
  })

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as GlobalSearch[]) ??
      ([] as GlobalSearch[])

    return removeDuplicatesFromArrayObjects(result, "id")
  }, [data])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setOpen(true)
        },
      }
    },
    [setOpen]
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 hidden md:flex lg:w-96"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">
          Tìm kiếm hỏi đáp, blogs....
        </span>
        <span className="inline-flex lg:hidden">Tìm kiếm...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Hãy nhập gì đó..."
        />
        <CommandList>
          <CommandEmpty>Không có kết quả nào được tìm thấy.</CommandEmpty>
          {result.map((gs) => (
            <CommandItem
              key={gs.id}
              value={gs.name}
              className="cursor-pointer"
              onSelect={() => {
                runCommand(() => {
                  const path =
                    gs.type === "class" || gs.type === "blog"
                      ? "blogs"
                      : "hoi-dap"

                  router.push(`/${path}/${gs.slug}`)
                })
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              {gs.name}
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
})
