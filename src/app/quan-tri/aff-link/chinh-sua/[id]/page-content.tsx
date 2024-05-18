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

import {
  useGetAffLinkService,
  usePatchAffLinkService,
} from "@/services/api/services/aff-link"
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z.object({
  link: z.string().url({ message: "Link không đúng định dạng." }),
  time: z.number().min(30, "Thời gian phải tối thiểu 30 giây!"),
  isActive: z.boolean(),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  isActive: false,
  link: "",
  time: 30,
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Cập nhật
    </Button>
  )
}

function EditAffLink() {
  const fetchFileUpload = useFileUploadService()
  const fetchUpdateAffLink = usePatchAffLinkService()
  const fetchAffLink = useGetAffLinkService()

  const [file, setFile] = useState<File | undefined>()

  const params = useParams<{ id: string }>()
  const queryParams = useSearchParams()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit, setValue } = form

  const onSubmit = async (formData: TFormSchema) => {
    const { status } = await fetchUpdateAffLink({
      id: params.id,
      data: formData,
    })

    if (status !== HTTP_CODES_ENUM.OK) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
    } else {
      toast.success("Thành công", {
        description: "Cập nhật thành công!",
      })

      router.replace("/quan-tri/aff-link")
    }
  }

  useEffect(() => {
    fetchAffLink({
      id: params.id,
    }).then(({ data, status }) => {
      if (status === HTTP_CODES_ENUM.OK) {
        setValue("link", data.link)
        setValue("time", data.time)
        setValue("isActive", data.isActive)
      }
    })
  }, [params.id])

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
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aff link</FormLabel>
                <FormControl>
                  <Input placeholder={"Aff link"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Hình ảnh blog"}
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
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Bật tắt trạng thái cho đường dẫn</FormLabel>
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

export default withPageRequiredAuth(EditAffLink, {
  roles: [RoleEnum.ADMIN],
})
