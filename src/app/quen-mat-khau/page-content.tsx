"use client"
import withPageRequiredGuest from "@/services/auth/with-page-required-guest"
import { useForm, useFormState } from "react-hook-form"
import { useAuthForgotPasswordService } from "@/services/api/services/auth"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  email: z
    .string()
    .email("Email không đúng định dạng!")
    .min(1, "Email không được để trống!"),
})

function FormActions() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      Gửi link reset mật khẩu
    </Button>
  )
}

function ForgotPassword() {
  const fetchAuthForgotPassword = useAuthForgotPasswordService()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { status } = await fetchAuthForgotPassword(formData)

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      toast({
        variant: "destructive",
        title: "Đã có lỗi sảy ra",
        description: "Vui lòng kiểm tra lại email hoặc mật khẩu!",
      })

      return
    }

    if (status === HTTP_CODES_ENUM.OK) {
      toast({
        title: "Reset thành công",
        description: "Vui lòng kiểm tra email!",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm px-4 sm:px-0 m-auto space-y-4 mt-10 md:mt-28">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Quên mật khẩu
            </h1>
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

          <FormActions />
        </div>
      </form>
    </Form>
  )
}

export default withPageRequiredGuest(() => <ForgotPassword />)
