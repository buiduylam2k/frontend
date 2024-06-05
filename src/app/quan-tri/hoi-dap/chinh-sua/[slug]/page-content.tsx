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

import { useEffect, useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import EdiableJs from "@/components/editable-js"
import {
  useGetPostService,
  usePatchPostService,
} from "@/services/api/services/post"
import { Post } from "@/services/api/types/post"
import { siteConfig } from "@/conf/site"

const FormSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống!"),
  content: z.string().min(1, "Nội dung không được để trống!"),
  banner: z.string(),
  answer: z.string().min(1, "Nội dung không được để trống!"),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  title: "",
  content: "",
  banner: siteConfig.ogImage,
  answer: "",
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Cập nhật
    </Button>
  )
}

function EditPost() {
  const fetchFileUpload = useFileUploadService()
  const fetchUpdatePost = usePatchPostService()
  const fetchPost = useGetPostService()

  const [file, setFile] = useState<File | undefined>()
  const [cachePost, setCachePost] = useState<Post | null>(null)

  const params = useParams<{ slug: string }>()
  const queryParams = useSearchParams()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit, setValue } = form

  const onSubmit = async ({ title, content, answer }: TFormSchema) => {
    const cloneFormData = { content, answer } as TFormSchema

    if (title !== cachePost?.title) {
      cloneFormData.title = title
    }

    if (file) {
      const { status: statusUpload, data: dataUpload } =
        await fetchFileUpload(file)
      if (statusUpload === HTTP_CODES_ENUM.CREATED) {
        cloneFormData.banner = dataUpload.file.path
      }
    }

    const { status } = await fetchUpdatePost({
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
        description: "Cập nhật bài viết thành công!",
      })

      router.replace("/quan-tri/hoi-dap")
    }
  }

  useEffect(() => {
    fetchPost({
      slug: params.slug,
    }).then(({ data, status }) => {
      if (status === HTTP_CODES_ENUM.OK) {
        setValue("title", data.title)
        setValue("content", data.content)
        setValue("answer", data.answer)
        setCachePost(data)
      }
    })
  }, [params.slug, fetchPost, setValue, setCachePost])

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
                  <Input placeholder={"Tiêu đề bài viết"} {...field} />
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
                    placeholder={"Hình ảnh bài viết"}
                    type="file"
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

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lời giải</FormLabel>
                <FormControl>
                  {field.value !== "" && (
                    <EdiableJs
                      initialValue={field.value}
                      onChange={field.onChange}
                      placeholder="Lời giải hỏi đáp"
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

export default withPageRequiredAuth(EditPost, {
  roles: [RoleEnum.ADMIN],
})
