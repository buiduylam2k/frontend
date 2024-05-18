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

import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePostAffLinkService } from "@/services/api/services/aff-link"

const FormSchema = z.object({
  link: z.string().url({ message: "Link không đúng định dạng." }),
  time: z.number().min(30, "Thời gian phải tối thiểu 30 giây!"),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  link: "",
  time: 30,
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Thêm mới
    </Button>
  )
}

function CreateAffLink() {
  const fetchCreateAffLink = usePostAffLinkService()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormSchema) => {
    const { status } = await fetchCreateAffLink(formData)

    if (status !== HTTP_CODES_ENUM.CREATED) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
    } else {
      toast.success("Thành công", {
        description: "Tạo aff link thành công!",
      })

      router.replace("/quan-tri/aff-link")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="px-4 sm:px-10 m-auto space-y-4 py-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tigsht">
              Thêm mới aff link
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

          <FormActions />
        </div>
      </form>
    </Form>
  )
}

export default withPageRequiredAuth(CreateAffLink, {
  roles: [RoleEnum.ADMIN],
})
