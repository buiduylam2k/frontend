"use client"
import withPageRequiredGuest from "@/services/auth/with-page-required-guest"
import { useForm, useFormState } from "react-hook-form"
import {
  useAuthLoginService,
  useAuthSignUpService,
} from "@/services/api/services/auth"
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
  firstName: z.string().min(1, "Họ không được để trống"),
  lastName: z.string().min(1, "Tên không được để trống"),
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
      <Link href={"/dang-nhap"}>
        <p className="text-sm border border-transparent hover:underline text-muted-foreground">
          Bạn đã có tài khoản? Đăng nhập ngay
        </p>
      </Link>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        Đăng ký
      </Button>
    </div>
  )
}

function SignUp() {
  const { setUser } = useAuthActions()
  const { setTokensInfo } = useAuthTokens()
  const fetchAuthLogin = useAuthLoginService()
  const fetchAuthSignUp = useAuthSignUpService()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { status: statusSignUp } = await fetchAuthSignUp(formData)

    if (statusSignUp === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      toast({
        variant: "destructive",
        title: "Đã có lỗi sảy ra",
        description: "Vui lòng kiểm tra lại email hoặc mật khẩu!",
      })

      return
    }

    const { data: dataSignIn, status: statusSignIn } = await fetchAuthLogin({
      email: formData.email,
      password: formData.password,
    })

    if (statusSignIn === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: dataSignIn.token,
        refreshToken: dataSignIn.refreshToken,
        tokenExpires: dataSignIn.tokenExpires,
      })
      setUser(dataSignIn.user)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm px-4 sm:px-0 m-auto space-y-4 mt-10 md:mt-28">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Đăng ký tài khoản mới
            </h1>
          </div>

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder={"Họ của bạn"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder={"Tên của bạn"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default withPageRequiredGuest(() => <SignUp />)
