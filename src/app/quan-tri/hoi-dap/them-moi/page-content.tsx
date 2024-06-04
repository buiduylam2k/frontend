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

import { useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCreatePostService } from "@/services/api/services/post"
import EdiableJs from "@/components/editable-js"

const FormSchema = z.object({
  title: z.string().min(10, "Tiêu đề phải tối thiểu 10 ký tự!"),
  content: z.string().min(6, "Nội dung phải tối thiểu 6 ký tự!"),
  banner: z.string().min(1, "Hình ảnh không được để trống!"),
  answer: z.string().min(6, "Nội dung phải tối thiểu 6 ký tự!"),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  title: "",
  content: "",
  banner: "https://cossin.vn/api/v1/files/logo.png",
  answer: "",
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

  const [file, setFile] = useState<File | undefined>()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormSchema) => {
    const cloneFormData = { ...formData }

    if (file) {
      const { status: statusUpload, data: dataUpload } =
        await fetchFileUpload(file)
      if (statusUpload === HTTP_CODES_ENUM.CREATED) {
        cloneFormData.banner = dataUpload.file.path
      }
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

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lời giải</FormLabel>
                <FormControl>
                  <EdiableJs
                    initialValue={field.value}
                    onChange={field.onChange}
                    placeholder="Lời giải hỏi đáp"
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
