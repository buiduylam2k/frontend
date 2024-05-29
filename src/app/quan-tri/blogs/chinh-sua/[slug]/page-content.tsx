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

import { useEffect, useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import {
  useGetBlogService,
  usePatchBlogService,
} from "@/services/api/services/blog"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import EdiableJs from "@/components/editable-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TagEnum } from "@/services/api/types/tags"
import getTagTypeName from "@/services/helpers/get-tag-type-name"
import { useQuery } from "@tanstack/react-query"
import { useGetTagByTypeService } from "@/services/api/services/tag"

const FormSchema = z.object({
  title: z.string().min(10, "Tiêu đề phải tối thiểu 10 ký tự!"),
  content: z.string().min(6, "Nội dung phải tối thiểu 6 ký tự!"),
  banner: z.optional(z.string()),
  tag: z.string(),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  title: "",
  content: "",
  banner: "",
  tag: TagEnum.Class,
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Cập nhật
    </Button>
  )
}

function EditBlog() {
  const fetchFileUpload = useFileUploadService()
  const fetchUpdateBlog = usePatchBlogService()
  const fetchBlog = useGetBlogService()
  const fetchTagByType = useGetTagByTypeService()

  const [file, setFile] = useState<File | undefined>()
  const [type, setType] = useState<TagEnum>(TagEnum.Class)

  const params = useParams<{ slug: string }>()
  const queryParams = useSearchParams()

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

  const { handleSubmit, setValue } = form

  const onSubmit = async (formData: TFormSchema) => {
    const cloneFormData = { ...formData }
    if (file) {
      const { status: statusUpload, data: dataUpload } =
        await fetchFileUpload(file)
      if (statusUpload === HTTP_CODES_ENUM.CREATED) {
        cloneFormData.banner = dataUpload.file.path
      }
    }

    const { status } = await fetchUpdateBlog({
      slug: params.slug,
      data: cloneFormData,
    })

    if (status !== HTTP_CODES_ENUM.OK) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
      // nếu lỗi cần xoá ảnh đi
    } else {
      toast.success("Thành công", {
        description: "Cập nhật blog thành công!",
      })

      router.replace("/quan-tri/blogs")
    }
  }

  useEffect(() => {
    fetchBlog({
      slug: params.slug,
    }).then(({ data, status }) => {
      if (status === HTTP_CODES_ENUM.OK) {
        setValue("title", data.title)
        setValue("content", data.content)
      }
    })
  }, [params.slug, fetchBlog, setValue])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="px-4 sm:px-10 m-auto space-y-4 py-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Chỉnh sửa {queryParams.get("title")}
            </h1>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder={"Tiêu đề blog"} {...field} />
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
                    placeholder={"Hình ảnh blog"}
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
                  {field.value !== "" && (
                    <EdiableJs
                      initialValue={field.value}
                      onChange={field.onChange}
                    />
                  )}
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

export default withPageRequiredAuth(EditBlog, {
  roles: [RoleEnum.ADMIN],
})
