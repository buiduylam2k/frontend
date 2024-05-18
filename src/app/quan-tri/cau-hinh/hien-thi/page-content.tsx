"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

const displayFormSchema = z.object({
  appName: z
    .string()
    .min(4, {
      message: "Tên website phải tối thiểu 4 ký tự.",
    })
    .max(30, {
      message: "Tên website tối đa 30 ký tự.",
    }),

  timeRedirect: z.number().min(30, {
    message: "Thời gian điều hướng ít nhất là 30s.",
  }),

  link: z.string().url({ message: "Link không đúng định dạng." }),
  isAffGlobal: z.boolean().default(true),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

const defaultValues: Partial<DisplayFormValues> = {
  appName: "Cos&Sin",
  timeRedirect: 30,
  link: "",
  isAffGlobal: true,
}

export default function DisplaySettings() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: DisplayFormValues) {
    toast.success("You submitted the following values:", {
      description: JSON.stringify(data, null, 2),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="appName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên website</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Tên của website sẽ được hiển thị ở trên thanh menu, dưới footer
                và các link liên kết, chú ý tên website có thể khác với domain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link aff mặc định</FormLabel>
              <FormDescription>
                Link này sẽ là link mặc định điều hướng khi các bài viết và bài
                blog được chia sẻ
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeRedirect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời gian điều hướng</FormLabel>
              <FormDescription>
                Thời gian khi người dùng truy cập vào trang web và sẽ tự điều
                hướng. Mặc định là 30 giây.
              </FormDescription>
              <FormControl>
                <Input
                  type="number"
                  min={30}
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAffGlobal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Đặt link aff global là mặc định</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  )
}
