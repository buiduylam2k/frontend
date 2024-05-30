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
import { useFileUploadService } from "@/services/api/services/files"

import { useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCreatePostService } from "@/services/api/services/post"
import EdiableJs from "@/components/editable-js"
import { TagEnum } from "@/services/api/types/tags"
import { useGetTagByTypeService } from "@/services/api/services/tag"
import { useQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import getTagTypeName from "@/services/helpers/get-tag-type-name"

const FormSchema = z.object({
  title: z.string().min(10, "Tiêu đề phải tối thiểu 10 ký tự!"),
  content: z.string().min(6, "Nội dung phải tối thiểu 6 ký tự!"),
  banner: z.string().min(1, "Hình ảnh không được để trống!"),
  tag: z.string(),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  title: "",
  content: "",
  banner: "",
  tag: "",
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Thêm mới
    </Button>
  )
}

function CreateBlog() {
  const fetchFileUpload = useFileUploadService()
  const fetchCreatePost = useCreatePostService()
  const fetchTagByType = useGetTagByTypeService()

  const [file, setFile] = useState<File | undefined>()
  const [type, setType] = useState<TagEnum>(TagEnum.Class)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { data } = useQuery({
    queryKey: [type],
    queryFn: async ({ signal }) => {
      const { data, status } = await fetchTagByType(
        { type },
        {
          signal,
        }
      )

      if (status === HTTP_CODES_ENUM.OK) {
        return data
      }
    },
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormSchema) => {
    if (!file) {
      return
    }
    const cloneFormData = { ...formData }
    const { status: statusUpload, data: dataUpload } =
      await fetchFileUpload(file)
    if (statusUpload === HTTP_CODES_ENUM.CREATED) {
      cloneFormData.banner = dataUpload.file.path
    }

    const { status } = await fetchCreatePost(cloneFormData)

    if (status !== HTTP_CODES_ENUM.CREATED) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
      // nếu lỗi cần xoá ảnh đi
    } else {
      toast.success("Thành công", {
        description: "Tạo hỏi đáp thành công!",
      })

      router.replace("/quan-tri/hoi-dap")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="px-4 sm:px-10 m-auto space-y-4 py-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Thêm mới bài hỏi đáp
            </h1>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder={"Tiêu đề hỏi đáp"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Loại</FormLabel>
            <Select
              onValueChange={(val) => setType(val as TagEnum)}
              value={type}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn 1 trong các loại (lớp, blog, hỏi đáp)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(TagEnum).map(([k, v]) => (
                  <SelectItem key={k} value={v}>
                    {getTagTypeName(v)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thẻ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn 1 thẻ cho bài blog" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((t) => (
                      <SelectItem key={t.id} value={t.id.toString()}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Chọn 1 loại thẻ để gắn vào các loại thẻ tương ứng
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Hình ảnh hỏi đáp"}
                    type="file"
                    accept=".png"
                    {...field}
                    onChange={(e) => {
                      setFile(e.target.files?.[0])
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <EdiableJs
                    initialValue={field.value}
                    onChange={field.onChange}
                    placeholder="Nội dung hỏi đáp"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormActions />
        </div>
      </form>
    </Form>
  )
}

export default withPageRequiredAuth(CreateBlog, {
  roles: [RoleEnum.ADMIN],
})
