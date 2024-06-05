"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  email: z
    .string()
    .email("Email không đúng định dạng!")
    .min(1, "Email không được để trống!"),
  title: z.string().min(1, "Tiêu đề không được để trống!"),
  content: z.string().min(1, "Nội dung không được để trống!"),
})

type TFormData = z.infer<typeof FormSchema>

const defaultValues: TFormData = {
  email: "",
  title: "",
  content: "",
}

function FormActions() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      Gửi thông tin
    </Button>
  )
}

export default function Contact() {
  const form = useForm<TFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormData) => {
    console.log("formData", formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md space-y-4">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Liên hệ với chúng tôi
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Nếu có bất kỳ vấn đề gì liên quan tới bản quyền hoặc các vấn đề về
              vi phạm, hãy liên hệ với chúng tôi!
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={"Địa chỉ email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder={"Tiêu đề"} {...field} />
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
                  <Textarea rows={6} placeholder="Nội dung..." {...field} />
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
