"use client"
import { useForm, useFormState } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
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

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import {
  useGetBlogService,
  usePatchBlogService,
} from "@/services/api/services/blog"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import EdiableJs from "@/components/editable-js"

const CkEditor = dynamic(() => import("@/components/ck-editor/editor"), {
  ssr: false,
})

const FormSchema = z.object({
  title: z.string().min(10, "Tiêu đề phải tối thiểu 10 ký tự!"),
  content: z.string().min(6, "Nội dung phải tối thiểu 6 ký tự!"),
  banner: z.optional(z.string()),
  tags: z.array(z.string()),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  title: "",
  content: "",
  banner: "",
  tags: [],
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

  const [file, setFile] = useState<File | undefined>()

  const params = useParams<{ slug: string }>()
  const queryParams = useSearchParams()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
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
  }, [params.slug])

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
