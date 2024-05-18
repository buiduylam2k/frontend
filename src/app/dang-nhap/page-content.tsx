"use client"
import withPageRequiredGuest from "@/services/auth/with-page-required-guest"
import { useForm, useFormState } from "react-hook-form"
import { useAuthLoginService } from "@/services/api/services/auth"
import useAuthActions from "@/services/auth/use-auth-actions"
import useAuthTokens from "@/services/auth/use-auth-tokens"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"

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
import { useToast } from "@/components/ui/use-toast"
import Link from "@/components/link"

const FormSchema = z.object({
  email: z
    .string()
    .email("Email không đúng định dạng!")
    .min(1, "Email không được để trống!"),
  password: z.string().min(6, "Password phải ít nhất 6 ký tự"),
})

function FormActions() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <div className="flex flex-col gap-3">
      <Link href={"/quen-mat-khau"}>
        <p className="text-sm border border-transparent hover:underline text-muted-foreground">
          Quên mật khẩu?
        </p>
      </Link>
      <div className="flex gap-5">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Đăng nhập
        </Button>
        <Button variant={"secondary"} type="button">
          <Link href={"/dang-ky"}>Tạo tài khoản mới</Link>
        </Button>
      </div>
    </div>
  )
}

function SignIn() {
  const { setUser } = useAuthActions()
  const { setTokensInfo } = useAuthTokens()
  const fetchAuthLogin = useAuthLoginService()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { data, status } = await fetchAuthLogin(formData)

    if (status !== HTTP_CODES_ENUM.OK) {
      toast({
        variant: "destructive",
        title: "Đã có lỗi sảy ra",
        description: "Vui lòng kiểm tra lại email hoặc mật khẩu!",
      })
    } else {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      })
      setUser(data.user)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm px-4 sm:px-0 m-auto space-y-4 mt-10 md:mt-28">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Đăng nhập My App
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder={"Mật khẩu"} {...field} />
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

export default withPageRequiredGuest(() => <SignIn />)
