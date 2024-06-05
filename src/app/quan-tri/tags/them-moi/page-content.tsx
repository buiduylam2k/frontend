"use client"
import { useForm, useFormState } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
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
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"
import { RoleEnum } from "@/services/api/types/role"

import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePostTagService } from "@/services/api/services/tag"
import { TagEnum } from "@/services/api/types/tags"
import { getValues } from "@/lib/enum"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống!" }),
  type: z.enum(getValues(TagEnum), {
    errorMap: () => ({
      message: "Vui lòng chọn 1 loại.",
    }),
  }),
  isActiveNav: z.boolean(),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  name: "",
  type: "class",
  isActiveNav: false,
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Thêm mới
    </Button>
  )
}

function CreateTag() {
  const fetchCreateTag = usePostTagService()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormSchema) => {
    const { status } = await fetchCreateTag(formData)

    if (status !== HTTP_CODES_ENUM.CREATED) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
    } else {
      toast.success("Thành công", {
        description: "Tạo thẻ thành công!",
      })

      router.replace("/quan-tri/tags")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="px-4 sm:px-10 m-auto space-y-4 py-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tigsht">
              Thêm mới thẻ
            </h1>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên thẻ</FormLabel>
                <FormControl>
                  <Input placeholder={"Tên thẻ"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn 1 trong các loại (lớp, blog, hỏi đáp)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TagEnum.Class}>Lớp</SelectItem>
                    <SelectItem value={TagEnum.Blog}>Đề thi thử</SelectItem>
                    {/* <SelectItem value={TagEnum.Home}>Trang chủ</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActiveNav"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active menu</FormLabel>
                  <FormDescription>
                    Trường này để cho phép thẻ hiển thị trên thanh menu theo
                    từng loại
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormActions />
        </div>
      </form>
    </Form>
  )
}

export default withPageRequiredAuth(CreateTag, {
  roles: [RoleEnum.ADMIN],
})
